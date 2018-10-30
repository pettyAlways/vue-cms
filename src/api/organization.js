import remote from '../utils/remote'
export function loadOrgTree() {
  return remote({
    url: '/cms_web/organization/listTree.do',
    method: 'get'
  })
}
export function list(data) {
  return remote({
    url: '/cms_web/organization/list.do',
    method: 'get',
    params: data
  })
}
export function save(data) {
  return remote({
    url: '/cms_web/organization/save.do',
    method: 'post',
    data: data
  })
}

export function edit(data) {
  return remote({
    url: '/cms_web/organization/edit.do',
    method: 'put',
    data: data
  })
}

export function deleteAll(data) {
  return remote({
    url: '/cms_web/organization/delete.do',
    method: 'delete',
    data: data
  })
}
