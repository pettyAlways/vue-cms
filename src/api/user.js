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

export function deleteAll(data) {
  return remote({
    url: '/user/delete.do',
    method: 'delete',
    data: data
  })
}