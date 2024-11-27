import type { MockMethod } from 'vite-plugin-mock'

const List = [
  {
    id: '@id',
    role: 'admin',
    btnRolesCheckedList: ['read:system', 'write:system', 'delete:system'],
    menuCheckedList: ['/', '/vab', '/other', '/operate', '/template', '/noColumn', '/setting', '/goods', '/chat', '/portal'],
  },
  {
    id: '@id',
    role: 'editor',
    btnRolesCheckedList: ['read:system', 'write:system'],
    menuCheckedList: ['/', '/vab', '/other', '/noColumn', '/setting'],
  },
]

export default [
  {
    url: '/roleManagement/getList',
    method: 'get',
    response({ query }: any) {
      const { role, pageNo = 1, pageSize = 20 } = query
      const mockList = List.filter((item: any) => !(role && !item.role.includes(role)))
      const list = mockList.filter((item: any, index: any) => index < pageSize * pageNo && index >= pageSize * (pageNo - 1))
      return {
        code: 200,
        msg: 'success',
        data: { list, total: mockList.length },
      }
    },
  },
  {
    url: '/roleManagement/doEdit',
    method: 'post',
    response() {
      return {
        code: 200,
        msg: '模拟保存成功',
      }
    },
  },
  {
    url: '/roleManagement/doDelete',
    method: 'post',
    response() {
      return {
        code: 200,
        msg: '模拟删除成功',
      }
    },
  },
] as MockMethod[]
