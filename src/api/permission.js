import remote from '../utils/remote'

export function getMenu() {
  return remote({
    url: '/cms_web/permission/listPower.do',
    method: 'get'
  })
}

export function subPower(params) {
  return remote({
    url: '/cms_web/permission/subPower.do',
    method: 'get',
    params
  })
}
export function deleteAll(params) {
  return remote({
    url: '/cms_web/permission/deletePower.do',
    method: 'delete',
    params
  })
}

export function editResource(data) {
  return remote({
    url: '/cms_web/permission/updatePower.do',
    method: 'put',
    data
  })
}

export function saveResource(data) {
  return remote({
    url: '/cms_web/permission/savePower.do',
    method: 'post',
    data
  })
}
