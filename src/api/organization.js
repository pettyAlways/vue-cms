import remote from '../utils/remote'
export function loadOrgTree() {
  return remote({
    url: '/organization/listTree.do',
    method: 'get'
  })
}
export function list(data) {
  return remote({
    url: '/organization/list.do',
    method: 'get',
    params: data
  })
}
