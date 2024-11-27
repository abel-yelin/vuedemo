import vue from '@vitejs/plugin-vue'
import vueJsx from '@vitejs/plugin-vue-jsx'
import chokidar from 'chokidar'
import dayjs from 'dayjs'
import pc from 'picocolors'
import type { Plugin } from 'vite'
import { createBanner } from './banner/'
import { createCompress } from './compress/'
import { createHttps } from './https'
import { createMock } from './mock/'
import { createProgress } from './progress/'
import { createPwa } from './pwa/'
import { createSvgIcons } from './svgSprite/'
import { createUnPlugin } from './unplugin/'
import { createVisualizer } from './visualizer/'
import { compress, https, localEnabled, port, prodEnabled, pwa, pwaDev, report } from '/@/config/'

const viteApp = 'VITE_' + 'APP_'
const viteUser = 'VITE_' + 'USER_'

export const createVitePlugin = (env: Record<string, string>) => {
  const vitePlugins: (Plugin | Plugin[])[] = [vue()]
  const userName = env[`${viteApp}GITHUB_USER_NAME`]
  const secretKey = env[`${viteApp}SECRET_KEY`]
  const nodeEnv = env[`${viteUser}NODE_ENV`]
  const isEmpty = (value: any) => {
    return value == undefined || value == '' || value == null
  }
  if (isEmpty(userName) || isEmpty(secretKey)) return
  if (nodeEnv !== 'development' && (isEmpty(userName) || isEmpty(secretKey))) return
  vitePlugins.push(
    vueJsx(),
    createProgress(env),
    createUnPlugin(env),
    createMock(localEnabled, prodEnabled),
    createSvgIcons(),
    createBanner()
  )
  if (compress) vitePlugins.push(createCompress(compress))
  if (pwa) vitePlugins.push(createPwa(nodeEnv, pwaDev))
  if (https) vitePlugins.push(createHttps())
  if (report) vitePlugins.push(createVisualizer())
  return vitePlugins
}

export const createWatch = (env: Record<string, string>) => {
  //为了防止新同事忘记配置授权码而造成项目无法打包，请保留以下提示
  const userName = env[`${viteApp}GITHUB_USER_NAME`]
  const secretKey = env[`${viteApp}SECRET_KEY`]
  const nodeEnv = env[`${viteUser}NODE_ENV`]

  if (nodeEnv === 'production' && (userName === 'test' || secretKey === 'preview')) {
    console.log(
      `${pc.red(
        '检测到您的用户名或key未配置，key在购买时通过邮件邀请函发放，如您已购买请仔细阅读文档并进行配置，配置完成后方可打包使用。购买地址：https://vuejs-core.cn/authorization/shop-vite.html'
      )}`
    )
    process.exit()
  }

  if (nodeEnv === 'development') {
    chokidar.watch('./src/views').on('change', (path) => {
      if (path.endsWith('vue')) {
        console.log(
          `\n${pc.gray(dayjs().format('HH:mm:ss'))} ${pc.cyan('[Vue Sh' + 'op Vite]')} ${pc.cyan(`http://localhost:${port}/`)} ${pc.green(
            'update success'
          )} `
        )
      }
    })
  }
}
