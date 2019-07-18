import remote from '../utils/remote'

export function messageCount() {
  return remote({
    url: '/platform/blog/message/unRead/count',
    method: 'get'
  })
}

export function retrieveMessages(params) {
  return remote({
    url: '/platform/blog/message/list',
    method: 'get',
    params
  })
}

export function comfirmRead(params) {
  return remote({
    url: '/platform/blog/message/confirm/read',
    method: 'post',
    params
  })
}

export function allRead() {
  return remote({
    url: '/platform/blog/message/confirm/all',
    method: 'post'
  })
}

export function auditMessage(params) {
  return remote({
    url: '/platform/blog/message/audit',
    method: 'get',
    params
  })
}

export function deleteAllReadMessage() {
  return remote({
    url: '/platform/blog/message/deleteRead',
    method: 'delete'
  })
}
