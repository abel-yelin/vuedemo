import type { MockMethod } from 'vite-plugin-mock'

const List: {
  uuid: string
  id: string
  'type|1': string[]
  'account|1': string[]
  'executeResult|1': string[]
  ip: string
  datetime: string
}[] = []
const count = 50
for (let i = 0; i < count; i++) {
  List.push({
    uuid: '@uuid',
    id: '@id',
    'type|1': ['操作日志', '数据库日志', '系统日志'],
    'account|1': ['admin', 'editor', 'test'],
    'executeResult|1': ['登录成功', '登录成功', '登录失败', '接口异常', 'dos攻击'],
    ip: '@ip',
    datetime: '@datetime',
  })
}

export default [
  {
    url: '/systemLog/getList',
    method: 'get',
    response: ({ query }: any) => {
      const { account, pageNo = 1, pageSize = 20 } = query
      const mockList = List.filter((item: any) => !(account && !item.account.includes(account)))
      const list = mockList.filter((item: any, index: any) => index < pageSize * pageNo && index >= pageSize * (pageNo - 1))
      return {
        code: 200,
        msg: 'success',
        data: { list, total: mockList.length },
      }
    },
  },
] as MockMethod[]
