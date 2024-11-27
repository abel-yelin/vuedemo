import { handleRandomImage } from '../utils/index.ts'
import type { MockMethod } from 'vite-plugin-mock'

const List = <any>[]
const count = 50
for (let i = 0; i < count; i++) {
  List.push({
    uuid: '@uuid',
    id: '@id',
    title: '@ctitle(5, 10)',
    description: '@ctitle(10, 20)',
    name: '@ctitle(3, 6)',
    'type|1': ['食品饮料', '家用电器', '其他'],
    price: '￥' + '@integer(0,100)',
    sales: '@integer(0,100)',
    stock: '@integer(0,100)',
    'status|1': ['已上架', '已下架', '待上架'],
    datetime: '@datetime',
    image: handleRandomImage(),
    link: 'https://www.baidu.com',
    'isRecommend|1': [1, 0],
  })
}

export default [
  {
    url: '/goodsManagement/getList',
    method: 'get',
    response({ query }: any) {
      const { name, pageNo = 1, pageSize = 20 } = query
      const mockList = List.filter((item: { name: string | any[] }) => !(name && !item.name.includes(name)))
      const list = mockList.filter((item: any, index: number) => index < pageSize * pageNo && index >= pageSize * (pageNo - 1))
      list.sort(() => Math.random() - 0.5)
      return {
        code: 200,
        msg: 'success',
        data: { list, total: mockList.length },
      }
    },
  },
  {
    url: '/goodsManagement/doEdit',
    method: 'post',
    response() {
      return {
        code: 200,
        msg: '模拟保存成功',
      }
    },
  },
  {
    url: '/goodsManagement/doDelete',
    method: 'post',
    response() {
      return {
        code: 200,
        msg: '模拟删除成功',
      }
    },
  },
] as MockMethod[]
