import request from '@/utils/request'

export function api_carsall( tm_id ) {
  return request({
    url: '/cabinet/carsall',
    method: 'get',
    params: { tm_id }
  })
}
export function api_marka( ) {
  return request({
    url: '/admin/marks',
    method: 'get',
  })
}
export function api_model( id) {
  return request({
    url: '/admin/model',
    method: 'get',
    params: { id }
  })
}
export function api_color() {
  return request({
    url: '/admin/carcolor',
    method: 'get',
  })
}
export function api_save_car(data) {
  return request({
    url: '/cabinet/carsave',
    method: 'post',
    data
  })
}
export function api_delete_car(delId) {
  return request({
    url: '/cabinet/carsdelete',
    method: 'get',
    params: { delId }
  })
}
