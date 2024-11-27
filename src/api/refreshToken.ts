import request from '/@/utils/request'

export const expireToken = () => {
  return request({
    url: '/expireToken',
    method: 'get',
  })
}

export const refreshToken = () => {
  return request({
    url: '/refreshToken',
    method: 'get',
  })
}
