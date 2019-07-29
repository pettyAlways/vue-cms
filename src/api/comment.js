import remote, { remoteWithToken } from '../utils/remote'

export function postComment(data) {
  return remoteWithToken({
    url: '/platform/frontend/comment/add',
    method: 'post',
    data
  })
}

export function postReply(data) {
  return remoteWithToken({
    url: '/platform/frontend/reply/add',
    method: 'post',
    data
  })
}

export function deleteReply(params) {
  return remoteWithToken({
    url: '/platform/frontend/reply/delete',
    method: 'delete',
    params
  })
}

export function deleteComment(params) {
  return remoteWithToken({
    url: '/platform/frontend/comment/delete',
    method: 'delete',
    params
  })
}

export function listComment(params) {
  return remote({
    url: '/platform/frontend/comment/search/list',
    method: 'get',
    params
  })
}
