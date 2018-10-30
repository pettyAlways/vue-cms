import remote from '../utils/remote'

export function login(data) {
  return remote({
    url: '/cms_web/login/login.do',
    method: 'post',
    data
  })
}

export function userInfo() {
  return remote({
    url: '/cms_web/user/userInfo.do',
    method: 'get'
  })
}

export function logout() {
  return remote({
    url: '/cms_web/login/logout.do',
    method: 'post'
  })
}
