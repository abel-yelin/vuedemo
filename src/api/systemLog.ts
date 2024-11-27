import request from '/@/utils/request'

export const getList = (params?: any) => {
  return request({
    url: '/systemLog/getList',
    method: 'get',
    params,
  })
}
