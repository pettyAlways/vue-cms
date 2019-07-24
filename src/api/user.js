import remote, { remoteWithToken } from '../utils/remote'

export function retrieveUserInfo() {
  return remoteWithToken({
    url: '/platform/frontend/user/search/info',
    method: 'get'
  })
}

export function retrieveUserProfile(params) {
  return remote({
    url: '/platform/frontend/user/search/profile',
    method: 'get',
    params
  })
}

export function login(data) {
  return remote({
    url: '/platform/login',
    method: 'post',
    data
  })
}
