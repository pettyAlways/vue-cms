import remote from '../utils/remote'

export function getMenu() {
  return remote({
    url: '/permission/listPower.do',
    method: 'get'
  })
}

export function subPower(params) {
  return remote({
    url: '/permission/subPower.do',
    method: 'get',
    params
  })
}
export function deleteAll(params) {
  return remote({
    url: '/permission/deletePower.do',
    method: 'delete',
    params
  })
}

export function edit(data) {
  return remote({
    url: '/permission/updatePower.do',
    method: 'put',
    data
  })
}

export function save(data) {
  return remote({
    url: '/permission/savePower.do',
    method: 'post',
    data
  })
}
