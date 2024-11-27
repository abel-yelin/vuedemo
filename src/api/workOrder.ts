import request from '/@/utils/request'

export function getList(params: any) {
  return request({
    url: '/workOrder/getList',
    method: 'get',
    params,
  })
}

export const doEdit = (data: any) => {
  return request({
    url: '/workOrder/doEdit',
    method: 'post',
    data,
  })
}

export const doDelete = (data: any) => {
  return request({
    url: '/workOrder/doDelete',
    method: 'post',
    data,
  })
}
