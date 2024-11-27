import { stringify } from 'qs'
import { refreshToken } from '/@/api/refreshToken'
import { contentType, debounce, messageName, statusName, successCode, timeout } from '/@/config'
import router from '/@/router'
import { useSettingsStore } from '/@/store/modules/settings'
import { useUserStore } from '/@/store/modules/user'
import { isArray } from '/@/utils/validate'
import { addErrorLog, needErrorLog } from '/@vab/plugins/errorLog'
import { gp } from '/@vab/plugins/vab'

let loadingInstance: any

let refreshToking = false

let requests: any[] = []

// 操作正常Code数组
const codeVerificationArray = isArray(successCode) ? [...successCode] : [successCode]

const CODE_MESSAGE: any = {
  200: '服务器成功返回请求数据',
  201: '新建或修改数据成功',
  202: '一个请求已经进入后台排队(异步任务)',
  204: '删除数据成功',
  205: '后端code指令强制开启锁屏',
  400: '发出信息有误',
  401: '用户没有权限(令牌失效、用户名、密码错误、登录过期)',
  402: '令牌过期',
  403: '用户得到授权，但是访问是被禁止的',
  404: '访问资源不存在',
  406: '请求格式不可得',
  410: '请求资源被永久删除，且不会被看到',
  500: '服务器发生错误',
  502: '网关错误',
  503: '服务不可用，服务器暂时过载或维护',
  504: '网关超时',
}

/**
 * axios请求拦截器配置
 * @param config
 * @returns {any}
 */
const requestConfig = (config: any): any => {
  const userStore = useUserStore()
  const { token } = userStore
  // 不规范写法 可根据setting.config.js tokenName配置随意自定义headers
  // if (token) config.headers[tokenName] = token

  // 规范写法 不可随意自定义
  if (token) config.headers['Authorization'] = `Bearer ${token}`

  if (config.data && config.headers['Content-Type'] === 'application/x-www-form-urlencoded;charset=UTF-8')
    config.data = stringify(config.data)

  if (debounce.some((item: string) => config.url.includes(item))) loadingInstance = gp.$baseLoading()
  return config
}

/**
 * 刷新刷新令牌
 * @param config 过期请求配置
 * @returns {any} 返回结果
 */
const tryRefreshToken = async (config: any): Promise<any> => {
  if (refreshToking) {
    return new Promise((resolve) => {
      // 将resolve放进队列，用一个函数形式来保存，等token刷新后直接执行
      requests.push(() => {
        resolve(instance(requestConfig(config)))
      })
    })
  } else {
    refreshToking = true
    try {
      const {
        data: { token },
      } = await refreshToken()
      if (token) {
        const { setToken } = useUserStore()
        setToken(token)
        // 已经刷新了token，将所有队列中的请求进行重试
        requests.forEach((cb) => cb(token))
        requests = []
        return instance(requestConfig(config))
      }
    } catch (error) {
      console.error('refreshToken error =>', error)
      router.push({ path: '/login', replace: true }).then(() => {})
    } finally {
      refreshToking = false
    }
  }
}

/**
 * axios响应拦截器
 * @param config {any} 请求配置
 * @param data {any} response数据
 * @param status {any} HTTP status
 * @param statusText {any} HTTP status text
 * @returns {Promise<*|*>}
 */
const handleData = async ({ config, data, status, statusText }: any): Promise<any | any> => {
  const { resetAll } = useUserStore()
  if (loadingInstance) loadingInstance.close()
  // 若data.code存在，覆盖默认code
  let code = data && data[statusName] ? data[statusName] : status
  // 若code属于操作正常code，则status修改为200
  if (codeVerificationArray.indexOf(data[statusName]) + 1) code = 200
  switch (code) {
    case 200: {
      // 业务层级错误处理，以下是假定restful有一套统一输出格式(指不管成功与否都有相应的数据格式)情况下进行处理
      // 例如响应内容：
      // 错误内容：{ code: 1, msg: '非法参数' }
      // 正确内容：{ code: 200, data: {  }, msg: '操作正常' }
      // return data
      return data
    }
    case 205: {
      // 屏幕锁定
      const settingsStore = useSettingsStore()
      const { handleLock } = settingsStore
      handleLock()
      setTimeout(() => {
        gp.$baseMessage(CODE_MESSAGE[205], 'success', 'hey')
      }, 1000 * 1.5)
      break
    }
    case 401: {
      resetAll().then(() => {
        router.push({ path: '/login', replace: true }).then(() => {})
      })
      break
    }
    case 402: {
      return await tryRefreshToken(config)
    }
    case 403: {
      router.push({ path: '/403' }).then(() => {})
      break
    }
  }
  // 若code非操作正常code，且非205锁屏，则抛出错误
  if (code != 205) {
    // 异常处理
    // 若data.msg存在，覆盖默认提醒消息
    const errMsg = `${data && data[messageName] ? data[messageName] : CODE_MESSAGE[code] ? CODE_MESSAGE[code] : statusText}`
    // 是否显示高亮错误(与errorHandler钩子触发逻辑一致)
    gp.$baseMessage(errMsg, 'error', 'hey')
    if (needErrorLog()) addErrorLog({ message: errMsg, stack: data, isRequest: true })
    throw data
  }
}
/**
 * @description axios初始化
 */
const instance = axios.create({
  baseURL: `${import.meta.env.VITE_APP_BASE_URL}`,
  timeout,
  headers: {
    'Content-Type': contentType,
  },
})

/**
 * @description axios请求拦截器
 */
instance.interceptors.request.use(requestConfig, (error) => {
  return Promise.reject(error)
})

/**
 * @description axios响应拦截器
 */
instance.interceptors.response.use(
  (response) => handleData(response),
  (error) => {
    const { response } = error
    if (response === undefined) {
      if (loadingInstance) loadingInstance.close()
      gp.$baseMessage(
        '连接后台接口失败，可能由以下原因造成：后端不支持跨域CORS、接口地址不存在、请求超时等，请联系管理员排查后端接口问题 ',
        'error',
        'hey'
      )
      return {}
    } else return handleData(response)
  }
)

export default instance