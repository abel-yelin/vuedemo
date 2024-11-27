import request from '/@/utils/request'

export const getList = () => {
  return request({
    url: '/notice/getList',
    method: 'get',
  })
}
