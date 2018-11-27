import remote from '../utils/remote'

export function list(data) {
  return remote({
    url: '/cms_web/online/list.do',
    method: 'get',
    params: data
  })
}

// 踢出用户
export function kickout(params) {
  return remote({
    url: '/cms_web/online/kickout.do',
    method: 'post',
    params
  })
}

// 禁用用户
export function invalidUser(params) {
  return remote({
    url: '/cms_web/online/invalidUser.do',
    method: 'post',
    params
  })
}
