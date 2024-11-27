import { handleRandomImage } from '../utils/index.ts'
import type { MockMethod } from 'vite-plugin-mock'

const list = [
  {
    span: 12,
    user: '@ctitle(5, 10)',
    title: '@ctitle(30, 35)',
    logo: handleRandomImage(),
    image: handleRandomImage(),
    fullImage: true,
    time: '@datetime',
    content: '@cparagraph(100, 200)',
  },
  {
    span: 6,
    user: '@ctitle(5, 10)',
    title: '@ctitle(30, 35)',
    logo: handleRandomImage(),
    image: handleRandomImage(),
    time: '@datetime',
    content: '@cparagraph(100, 200)',
  },
  {
    span: 6,
    user: '@ctitle(5, 10)',
    title: '@ctitle(30, 35)',
    logo: handleRandomImage(),
    image: handleRandomImage(),
    time: '@datetime',
    content: '@cparagraph(100, 200)',
  },
  {
    span: 6,
    user: '@ctitle(5, 10)',
    title: '@ctitle(30, 35)',
    logo: handleRandomImage(),
    image: handleRandomImage(),
    time: '@datetime',
    content: '@cparagraph(100, 200)',
  },
  {
    span: 6,
    user: '@ctitle(5, 10)',
    title: '@ctitle(30, 35)',
    logo: handleRandomImage(),
    image: handleRandomImage(),
    time: '@datetime',
    content: '@cparagraph(100, 200)',
  },
  {
    span: 6,
    user: '@ctitle(5, 10)',
    title: '@ctitle(30, 35)',
    logo: handleRandomImage(),
    image: handleRandomImage(),
    time: '@datetime',
    content: '@cparagraph(100, 200)',
  },
  {
    span: 6,
    user: '@ctitle(5, 10)',
    title: '@ctitle(30, 35)',
    logo: handleRandomImage(),
    image: handleRandomImage(),
    time: '@datetime',
    content: '@cparagraph(100, 200)',
  },
  {
    span: 6,
    user: '@ctitle(5, 10)',
    title: '@ctitle(30, 35)',
    logo: handleRandomImage(),
    image: handleRandomImage(),
    time: '@datetime',
    content: '@cparagraph(100, 200)',
  },
  {
    span: 6,
    user: '@ctitle(5, 10)',
    title: '@ctitle(30, 35)',
    logo: handleRandomImage(),
    image: handleRandomImage(),
    time: '@datetime',
    content: '@cparagraph(100, 200)',
  },
  {
    span: 12,
    user: '@ctitle(5, 10)',
    title: '@ctitle(30, 35)',
    logo: handleRandomImage(),
    image: handleRandomImage(),
    fullImage: true,
    time: '@datetime',
    content: '@cparagraph(100, 200)',
  },
  {
    span: 6,
    user: '@ctitle(5, 10)',
    title: '@ctitle(30, 35)',
    logo: handleRandomImage(),
    image: handleRandomImage(),
    time: '@datetime',
    content: '@cparagraph(100, 200)',
  },
  {
    span: 6,
    user: '@ctitle(5, 10)',
    title: '@ctitle(30, 35)',
    logo: handleRandomImage(),
    image: handleRandomImage(),
    time: '@datetime',
    content: '@cparagraph(100, 200)',
  },
  {
    span: 6,
    user: '@ctitle(5, 10)',
    title: '@ctitle(30, 35)',
    logo: handleRandomImage(),
    image: handleRandomImage(),
    time: '@datetime',
    content: '@cparagraph(100, 200)',
  },
  {
    span: 6,
    user: '@ctitle(5, 10)',
    title: '@ctitle(30, 35)',
    logo: handleRandomImage(),
    image: handleRandomImage(),
    time: '@datetime',
    content: '@cparagraph(100, 200)',
  },
]

export default [
  {
    url: '/news/getList',
    method: 'get',
    response: () => {
      list.map((item: any) => {
        item.logo = handleRandomImage()
        item.image = handleRandomImage()
      })
      return {
        code: 200,
        msg: 'success',
        data: { list },
      }
    },
  },
] as MockMethod[]
