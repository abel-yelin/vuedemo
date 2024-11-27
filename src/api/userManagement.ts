import request from '/@/utils/request'

export function getList(params?: any) {
  return request({
    url: '/userManagement/getList',
    method: 'get',
    params,
  })
}

export const doEdit = (data: any) => {
  return request({
    url: '/userManagement/doEdit',
    method: 'post',
    data,
  })
}

export const doDelete = (data: any) => {
  return request({
    url: '/userManagement/doDelete',
    method: 'post',
    data,
  })
}
