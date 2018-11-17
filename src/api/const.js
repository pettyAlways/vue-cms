import remote from '../utils/remote'

export function list(data) {
  return remote({
    url: '/cms_web/const/list.do',
    method: 'get',
    params: data
  })
}

export function save(data) {
  return remote({
    url: '/cms_web/const/save.do',
    method: 'post',
    data: data
  })
}

export function edit(data) {
  return remote({
    url: '/cms_web/const/edit.do',
    method: 'put',
    data: data
  })
}

export function deleteAll(params) {
  return remote({
    url: '/cms_web/const/delete.do',
    method: 'delete',
    params
  })
}
