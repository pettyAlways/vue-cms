import remote from '../utils/remote'
export function loadOrgTree() {
  return remote({
    url: '/organization/listTree.do',
    method: 'get'
  })
}
