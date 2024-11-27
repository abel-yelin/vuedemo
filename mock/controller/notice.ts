import type { MockMethod } from 'vite-plugin-mock'

const List = [
  {
    email: '@email',
    image: 'https://i.gtimg.cn/club/item/face/img/8/15918_100.gif',
    notice: 'github开源地址：<a target="_blank" href="https://github.com/zxwk1998/vue-admin-better">点我</a>',
  },
  {
    email: '@email',
    image: 'https://i.gtimg.cn/club/item/face/img/0/15640_100.gif',
    notice: 'Admin Pro：<a target="_blank" href="https://vuejs-core.cn/admin-pro">点我</a>',
  },
  {
    email: '@email',
    image: 'https://i.gtimg.cn/club/item/face/img/9/15919_100.gif',
    notice: 'Admin Plus：<a target="_blank" href="https://vuejs-core.cn/admin-plus">点我</a>',
  },
  {
    email: '@email',
    image: 'https://i.gtimg.cn/club/item/face/img/8/15918_100.gif',
    notice: 'Shop Vite：<a target="_blank" href="https://vuejs-core.cn/shop-vite">点我</a>',
  },
]

export default [
  {
    url: '/notice/getList',
    method: 'get',
    response: () => {
      return {
        code: 200,
        msg: 'success',
        data: { list: List, total: List.length },
      }
    },
  },
] as MockMethod[]
