import request from '/@/utils/request'

export const getList = (params?: any) => {
  return request({
    url: '/taskManagement/getList',
    method: 'get',
    params,
  })
}
