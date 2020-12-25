import request from '@/utils/request'

export function api_driverall(page,itemsPerPage,tm_id) {
  return request({
    url: '/cabinet/driverall',
    method: 'get',
    params: { page,itemsPerPage,tm_id }
  })
}
