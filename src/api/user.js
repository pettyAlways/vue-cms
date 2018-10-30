import remote from '../utils/remote'

export function list(data) {
  return remote({
    url: '/cms_web/user/list.do',
    method: 'get',
    params: data
  })
}
export function save(data) {
  return remote({
    url: '/cms_web/user/save.do',
    method: 'post',
    data: data
  })
}

export function edit(data) {
  return remote({
    url: '/cms_web/user/edit.do',
    method: 'put',
    data: data
  })
}

export function authUser(data) {
  return remote({
    url: '/cms_web/user/authUser.do',
    method: 'post',
    data: data
  })
}

export function acquireRoles(params) {
  return remote({
    url: '/cms_web/user/acquireRoles.do',
    method: 'get',
    params
  })
}

export function deleteAll(data) {
  return remote({
    url: '/cms_web/user/authUser.do',
    method: 'post',
    data
  })
}
