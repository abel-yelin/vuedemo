import request from '/@/utils/request'

export const getList = () => {
  return request({
    // 正式项目请移除或更换为真实地址
    url: 'https://api.vuejs-core.cn/getShopDescription',
    method: 'get',
  })
}
