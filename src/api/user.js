import remote, { remoteWithToken } from '../utils/remote'

export function retrieveUserInfo() {
  return remoteWithToken({
    url: '/platform/frontend/user/search/info',
    method: 'get'
  })
}

export function retrieveUserProfile(params) {
  return remoteWithToken({
    url: '/platform/frontend/user/search/profile',
    method: 'get',
    params
  })
}

export function retrieveUserProfileExtra() {
  return remoteWithToken({
    url: '/platform/frontend/user/search/profile/extra',
    method: 'get'
  })
}

export function addUserSkill(data) {
  return remoteWithToken({
    url: '/platform/frontend/user/add/skill',
    method: 'post',
    data
  })
}

export function delUserSkill(params) {
  return remoteWithToken({
    url: '/platform/frontend/user/del/skill',
    method: 'delete',
    params
  })
}

export function saveUserInfo(data) {
  return remoteWithToken({
    url: '/platform/frontend/user/update/info',
    method: 'put',
    data
  })
}

export function bindUserAccount(data) {
  return remoteWithToken({
    url: '/platform/frontend/user/bind/account',
    method: 'put',
    data
  })
}

export function retrieveRecommendAuthor(params) {
  return remote({
    url: '/platform/frontend/user/search/recommend',
    method: 'get',
    params
  })
}

export function retrieveRecommendAuthorList(params) {
  return remote({
    url: '/platform/frontend/user/search/recommend/list',
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
