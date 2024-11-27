import request from '/@/utils/request'

export const getList = (params?: any) => {
  return request({
    url: '/iotManagement/getList',
    method: 'get',
    params,
  })
}
