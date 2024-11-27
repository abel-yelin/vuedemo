import request from '/@/utils/request'

export const getList = () => {
  return request({
    url: '/area/getList',
    method: 'get',
  })
}

export const doEdit = (data: any) => {
  return request({
    url: '/area/doEdit',
    method: 'post',
    data,
  })
}

export const doDelete = (data: any) => {
  return request({
    url: '/area/doDelete',
    method: 'post',
    data,
  })
}
