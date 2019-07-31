import { remoteWithToken } from '../utils/remote'

export function retrieveMessageList() {
  return remoteWithToken({
    url: '/platform/frontend/message/message-list',
    method: 'get'
  })
}

export function messageRead(params) {
  return remoteWithToken({
    url: '/platform/frontend/message/readed',
    method: 'put',
    params
  })
}

export function messageAllRead() {
  return remoteWithToken({
    url: '/platform/frontend/message/all/readed',
    method: 'put'
  })
}
