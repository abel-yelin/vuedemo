import request from '/@/utils/request'

export function getTree(params?: any) {
  return request({
    url: '/menuManagement/getTree',
    method: 'get',
    params,
  })
}

export const doEdit = (data: any) => {
  return request({
    url: '/menuManagement/doEdit',
    method: 'post',
    data,
  })
}

export const doDelete = (data: any) => {
  return request({
    url: '/menuManagement/doDelete',
    method: 'post',
    data,
  })
}
