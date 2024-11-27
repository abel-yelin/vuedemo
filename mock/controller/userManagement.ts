import type { MockMethod } from 'vite-plugin-mock'

const List = [
  {
    id: '@id',
    username: 'admin',
    password: 'admin',
    email: '@email',
    roles: ['admin'],
    datetime: '@datetime',
  },
  {
    id: '@id',
    username: 'editor',
    password: 'editor',
    email: '@email',
    roles: ['editor'],
    datetime: '@datetime',
  },
  {
    id: '@id',
    username: 'test',
    password: 'test',
    email: '@email',
    roles: ['admin', 'editor'],
    datetime: '@datetime',
  },
]

export default [
  {
    url: '/userManagement/getList',
    method: 'get',
    response({ query }: any) {
      const { username, pageNo = 1, pageSize = 20 } = query
      const mockList = List.filter((item) => !(username && !item.username.includes(username)))
      const list = mockList.filter((item, index) => index < pageSize * pageNo && index >= pageSize * (pageNo - 1))
      return {
        code: 200,
        msg: 'success',
        data: { list, total: mockList.length },
      }
    },
  },
  {
    url: '/userManagement/doEdit',
    method: 'post',
    response() {
      return {
        code: 200,
        msg: '模拟保存成功',
      }
    },
  },
  {
    url: '/userManagement/doDelete',
    method: 'post',
    response() {
      return {
        code: 200,
        msg: '模拟删除成功',
      }
    },
  },
] as MockMethod[]
