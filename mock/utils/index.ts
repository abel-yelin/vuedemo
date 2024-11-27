import mockjs from 'mockjs'

export const { mock, Random } = mockjs

/**
 * @description 随机生成图片url。
 * @returns {string}
 */
export const handleRandomImage = () => {
  return `https://gcore.jsdelivr.net/gh/zxwk1998/image/table/vab-image-${Random.integer(1, 38)}.jpg`
}
