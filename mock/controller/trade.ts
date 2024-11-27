import { handleRandomImage } from '../utils/index.ts'
import type { MockMethod } from 'vite-plugin-mock'

const List: {
  uuid: string
  id: string
  title: string
  description: string
  'status|1': string[]
  author: string
  datetime: string
  count: string
  image: string
  switch: string
  percent: string
  'rate|1': number[]
  'type|1': number[]
  percentage: string
  transactionTime: string
  merchantOrderId: string
  wechatPaymentNo: string
  'paymentScene|1': string[]
  'transactionStatus|1': string[]
  orderAmount: string
}[] = []
const count = 50
for (let i = 0; i < count; i++) {
  List.push({
    uuid: '@uuid',
    id: '@id',
    title: '@ctitle(5, 10)',
    description: '@cparagraph',
    'status|1': ['published', 'draft', 'deleted'],
    author: '@cname',
    datetime: '@datetime',
    count: '@integer(300, 5000)',
    image: handleRandomImage(),
    switch: '@boolean',
    percent: '@integer(80,99)',
    'rate|1': [1, 2, 3, 4, 5],
    'type|1': [0, 1],
    percentage: '@integer(0,100)',
    transactionTime: '@datetime',
    merchantOrderId: '@uuid',
    wechatPaymentNo: '@uuid',
    'paymentScene|1': ['公众号支付', '线下支付', '京东支付', '淘宝支付'],
    'transactionStatus|1': ['已支付', '未支付', '已退款', '申请退款中'],
    orderAmount: '@integer(1000,9999)',
  })
}

export default [
  {
    url: '/trade/getList',
    method: 'get',
    response: ({ query }: any) => {
      const { title, pageNo = 1, pageSize = 20 } = query
      const mockList = List.filter((item: { title: string | any[] }) => !(title && !item.title.includes(title)))
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
    url: '/trade/doEdit',
    method: 'post',
    response: () => {
      return {
        code: 200,
        msg: '模拟保存成功',
      }
    },
  },
  {
    url: '/trade/doRefund',
    method: 'post',
    response: () => {
      return {
        code: 200,
        msg: '模拟退款成功',
      }
    },
  },
] as MockMethod[]
