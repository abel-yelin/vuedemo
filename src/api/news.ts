import request from '/@/utils/request'

export const getList = () => {
  return request({
    url: '/news/getList',
    method: 'get',
  })
}
