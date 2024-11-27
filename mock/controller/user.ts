import type { MockMethod } from 'vite-plugin-mock'
import { Random } from '~/mock/utils'

const tokens: { [key: string]: string } = {
  admin: `admin-token-${Random.guid()}-${Date.now()}`,
  editor: `editor-token-${Random.guid()}-${Date.now()}`,
  test: `test-token-${Random.guid()}-${Date.now()}`,
}
const username2role: { [key: string]: string[] } = {
  admin: ['Admin'],
  editor: ['Editor'],
  test: ['Admin', 'Editor'],
}
const role2permission: { [key: string]: string[] } = {
  Admin: ['read:system', 'write:system', 'delete:system'],
  Editor: ['read:system', 'write:system'],
  Test: ['read:system'],
}

export default [
  // 功能繁琐，如无保密需求，不推荐使用RSA加密
  {
    url: '/publicKey',
    method: 'get',
    response() {
      return {
        code: 200,
        msg: 'success',
        data: {
          mockServer: true,
          publicKey:
            'MIGfMA0GCSqGSIb3DQEBAQUAA4GNADCBiQKBgQDBT2vr+dhZElF73FJ6xiP181txKWUSNLPQQlid6DUJhGAOZblluafIdLmnUyKE8mMHhT3R+Ib3ssZcJku6Hn72yHYj/qPkCGFv0eFo7G+GJfDIUeDyalBN0QsuiE/XzPHJBuJDfRArOiWvH0BXOv5kpeXSXM8yTt5Na1jAYSiQ/wIDAQAB',
        },
      }
    },
  },
  {
    url: '/login',
    method: 'post',
    response({ body }: any) {
      const { username } = body
      const token = tokens[username]
      if (!token)
        return {
          code: 500,
          msg: '帐户或密码不正确',
        }
      return {
        code: 200,
        msg: 'success',
        data: { token },
      }
    },
  },
  {
    url: '/register',
    method: 'post',
    response() {
      return {
        code: 200,
        msg: '模拟注册成功',
        data: { token: tokens['admin'] },
      }
    },
  },
  {
    url: '/password',
    method: 'post',
    response() {
      return {
        code: 200,
        msg: '模拟修改密码成功',
        data: { token: tokens['admin'] },
      }
    },
  },
  {
    url: '/userInfo',
    method: 'get',
    response(request: any) {
      const authorization = request.headers.authorization || request.headers.Authorization
      if (!authorization.startsWith('Bearer '))
        return {
          code: 401,
          msg: '令牌无效',
        }

      const username = authorization.replace('Bearer ', '').split('-token-')[0]
      const roles = username2role[username] || []
      const permissions = [...new Set(roles.flatMap((role) => role2permission[role]))]

      return {
        code: 200,
        msg: 'success',
        data: {
          username,
          roles,
          permissions,
          avatar: './static/svg/avatar.svg',
        },
      }
    },
  },
  {
    url: '/logout',
    method: 'get',
    response() {
      return {
        code: 200,
        msg: 'success',
      }
    },
  },
  {
    url: '/lock',
    method: 'get',
    response() {
      return {
        code: 205,
      }
    },
  },
] as MockMethod[]
