import request from '/@/utils/request'

export function getList(params: any) {
  return request({
    url: '/goodsComment/getList',
    method: 'get',
    params,
  })
}

export const doEdit = (data: any) => {
  return request({
    url: '/goodsComment/doEdit',
    method: 'post',
    data,
  })
}

export const doDelete = (data: any) => {
  return request({
    url: '/goodsComment/doDelete',
    method: 'post',
    data,
  })
}
