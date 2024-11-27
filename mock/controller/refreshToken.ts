import type { MockMethod } from 'vite-plugin-mock'
import { Random } from '~/mock/utils'

export default [
  {
    url: '/expireToken',
    method: 'get',
    response(request) {
      const authorization = request.headers.authorization || request.headers.Authorization
      const arr = authorization.split('-')
      const tokenTime = Number.parseInt(arr.at(-1))

      if (Date.now() - tokenTime > 5000)
        return {
          code: 402,
          msg: '令牌已过期',
        }
      else
        return {
          code: 200,
          msg: '令牌未过期',
        }
    },
  },
  {
    url: '/refreshToken',
    method: 'get',
    response(request) {
      const authorization = request.headers.authorization || request.headers.Authorization
      let token = ''
      if (authorization.includes('admin-token')) token = `admin-token-${Random.guid()}-${Date.now()}`
      if (authorization.includes('editor-token')) token = `editor-token-${Random.guid()}-${Date.now()}`
      if (authorization.includes('test-token')) token = `test-token-${Random.guid()}-${Date.now()}`

      return {
        code: 200,
        msg: '刷新Token成功',
        data: { token },
      }
    },
  },
] as MockMethod[]
