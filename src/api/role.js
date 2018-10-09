import remote from '../utils/remote'

export function list(data) {
  return remote({
    url: '/role/list.do',
    method: 'get',
    params: data
  })
}

export function listAll(data) {
  return remote({
    url: '/role/listAll.do',
    method: 'get',
    params: data
  })
}

export function save(data) {
  return remote({
    url: '/role/save.do',
    method: 'post',
    data: data
  })
}

export function edit(data) {
  return remote({
    url: '/role/edit.do',
    method: 'put',
    data: data
  })
}

export function deleteAll(params) {
  return remote({
    url: '/role/delete.do',
    method: 'delete',
    params
  })
}
