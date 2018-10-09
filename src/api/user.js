import remote from '../utils/remote'

export function list(data) {
  return remote({
    url: '/user/list.do',
    method: 'get',
    params: data
  })
}
export function save(data) {
  return remote({
    url: '/user/save.do',
    method: 'post',
    data: data
  })
}

export function edit(data) {
  return remote({
    url: '/user/edit.do',
    method: 'put',
    data: data
  })
}

export function authUser(data) {
  return remote({
    url: '/user/authUser.do',
    method: 'post',
    data: data
  })
}

export function acquireRoles(params) {
  return remote({
    url: '/user/acquireRoles.do',
    method: 'get',
    params
  })
}

export function deleteAll(data) {
  return remote({
    url: '/user/authUser.do',
    method: 'post',
    data
  })
}
