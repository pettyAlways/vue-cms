import Cookies from 'js-cookie'

const TokenKey = 'JSESSIONID'

function getToken() {
  console.log(Cookies.get())
  console.log(Cookies)
  console.log(Cookies.get(TokenKey))
  return Cookies.get(TokenKey)
}

export function setToken(token) {
  return Cookies.set(TokenKey, token)
}

function removeToken() {
  return Cookies.remove(TokenKey)
}

export { getToken, removeToken }
