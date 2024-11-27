import request from '/@/utils/request'

export const getList = (params?: any) => {
  return request({
    url: '/trade/getList',
    method: 'get',
    params,
  })
}

export const doRefund = (data: any) => {
  return request({
    url: '/trade/doRefund',
    method: 'post',
    data,
  })
}
