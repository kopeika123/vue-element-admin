import Cookies from 'js-cookie'

const TokenKey = 'Admin-Token'
const tm_id = 'tm_id'

export function getToken() {
  return Cookies.get(TokenKey)
}

export function setToken(token) {
  return Cookies.set(TokenKey, token)
}

export function removeToken() {
  return Cookies.remove(TokenKey)
}
export function setTm_id(tmId) {
  return Cookies.set(tm_id, tmId)
}
export function removeTm_id() {
  return Cookies.remove(tm_id)
}
export function getTm_id() {
  return Cookies.get(tm_id)
}
