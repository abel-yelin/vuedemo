import type { MockMethod } from 'vite-plugin-mock'

const List: {
  uuid: string
  id: string
  taskName: string
  'status|1': number[]
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
    taskName: '@cTitle(1, 2)',
    'status|1': [0, 1],
    'account|1': ['admin', 'editor', 'test'],
    'executeResult|1': ['登录成功', '登录成功', '登录失败', '接口异常', 'dos攻击'],
    ip: '@ip',
    datetime: '@datetime',
  })
}

export default [
  {
    url: '/taskManagement/getList',
    method: 'get',
    response: ({ query }: any) => {
      const { taskName, pageNo = 1, pageSize = 20 } = query
      const mockList = List.filter((item: any) => !(taskName && !item.taskName.includes(taskName)))
      const list = mockList.filter((item: any, index: any) => index < pageSize * pageNo && index >= pageSize * (pageNo - 1))
      return {
        code: 200,
        msg: 'success',
        data: { list, total: mockList.length },
      }
    },
  },
] as MockMethod[]
