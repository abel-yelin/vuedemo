import type { MockMethod } from 'vite-plugin-mock'

const List = [
  {
    value: 'root',
    id: 'root',
    createTime: '@datetime',
    name: '根节点',
    label: '根节点',
    order: 0,
    children: [
      {
        value: '1',
        id: '1',
        parentId: 'root',
        parentName: '根节点',
        parentValue: 'root',
        parentLabel: '根节点',
        createTime: '@datetime',
        name: '桃花坞',
        label: '桃花坞',
        order: 0,
      },
      {
        value: '2',
        id: '2',
        parentId: 'root',
        parentName: '根节点',
        parentValue: 'root',
        parentLabel: '根节点',
        createTime: '@datetime',
        name: '少林寺',
        label: '少林寺',
        order: 1,
        children: [
          {
            value: '@uuid',
            id: '@uuid',
            parentId: '2',
            parentName: '少林寺',
            parentValue: '2',
            parentLabel: '少林寺',
            createTime: '@datetime',
            name: '达摩院',
            label: '达摩院',
            order: 0,
          },
          {
            value: '@uuid',
            id: '@uuid',
            parentId: '2',
            parentName: '少林寺',

            parentValue: '2',
            parentLabel: '少林寺',
            createTime: '@datetime',
            name: '戒律堂',
            label: '戒律堂',
            order: 1,
          },
        ],
      },
    ],
  },
]

export default [
  {
    url: '/departmentManagement/getList',
    method: 'get',
    response: ({ query }: any) => {
      const { label, pageNo = 1, pageSize = 20 } = query
      const mockList = List.filter((item) => !(label && !item.label.includes(label)))
      const list = mockList.filter((item, index) => index < pageSize * pageNo && index >= pageSize * (pageNo - 1))
      return {
        code: 200,
        msg: 'success',
        data: { list, total: mockList.length },
      }
    },
  },
  {
    url: '/departmentManagement/doEdit',
    method: 'post',
    response: () => {
      return {
        code: 200,
        msg: '模拟保存成功',
      }
    },
  },
  {
    url: '/departmentManagement/doDelete',
    method: 'post',
    response: () => {
      return {
        code: 200,
        msg: '模拟删除成功',
      }
    },
  },
] as MockMethod[]
