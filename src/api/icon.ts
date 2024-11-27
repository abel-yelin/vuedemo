import request from '/@/utils/request'

interface QueryFormType {
  pageNo: number
  pageSize: number
  title?: string
  colorful?: boolean
  num?: number
}

export const getIconList = (params?: QueryFormType) => {
  return request({
    url: '/icon/getList',
    method: 'get',
    params,
  })
}
