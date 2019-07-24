import Cookies from 'js-cookie'

// shiro返回的cookie带HttpOnly防止跨域，所以无法通过document.cookie等方式获取，前端需要存一个新cookie进行判断
const TokenKey = 'login-token'

function getToken() {
  return Cookies.get(TokenKey)
}

export function setToken(token) {
  return Cookies.set(TokenKey, token)
}

function removeToken() {
  return Cookies.remove(TokenKey)
}

export { getToken, removeToken }
