import request from '/@/utils/request'

export function getList(params: any) {
  return request({
    url: '/goodsManagement/getList',
    method: 'get',
    params,
  })
}

export const doEdit = (data: any) => {
  return request({
    url: '/table/doEdit',
    method: 'post',
    data,
  })
}

export const doDelete = (data: any) => {
  return request({
    url: '/table/doDelete',
    method: 'post',
    data,
  })
}
