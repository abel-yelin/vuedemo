import request from '/@/utils/request'

export const getPublicKey = () => {
  return request({
    url: '/publicKey',
    method: 'get',
  })
}
