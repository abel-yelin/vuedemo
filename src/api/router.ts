import request from '/@/utils/request'

export const getList = (params?: any) => {
  return request({
    url: '/router/getList',
    method: 'get',
    params,
  })
}
