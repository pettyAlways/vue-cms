import remote from '../utils/remote'

export function login(data) {
  return remote({
    url: '/platform/login',
    method: 'post',
    data
  })
}

export function userInfo() {
  return remote({
    url: '/platform/blog/user/userInfo.do',
    method: 'get'
  })
}

export function logout() {
  return remote({
    url: '/cms_web/login/logout.do',
    method: 'post'
  })
}

export function messageCount() {
  return remote({
    url: '/platform/blog/user/message',
    method: 'get'
  })
}

export function retrieveMessages() {
  return remote({
    url: '/platform/blog/user/messages',
    method: 'get'
  })
}
