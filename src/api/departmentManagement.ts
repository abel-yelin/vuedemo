import request from '/@/utils/request'

export function getList(params?: any) {
  return request({
    url: '/departmentManagement/getList',
    method: 'get',
    params,
  })
}

export const doEdit = (data: any) => {
  return request({
    url: '/departmentManagement/doEdit',
    method: 'post',
    data,
  })
}

export const doDelete = (data: any) => {
  return request({
    url: '/departmentManagement/doDelete',
    method: 'post',
    data,
  })
}
