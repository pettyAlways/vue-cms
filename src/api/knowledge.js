import remote, { remoteWithToken } from '../utils/remote'

export function retrieveRecommend() {
  return remote({
    url: '/platform/frontend/knowledge/search/recommend',
    method: 'get'
  })
}

export function retrieveRecentKnowledge() {
  return remote({
    url: '/platform/frontend/knowledge/search/recent',
    method: 'get'
  })
}

export function retrieveRecentKnowledgeInfo() {
  return remote({
    url: '/platform/frontend/knowledge/search/recent/info',
    method: 'get'
  })
}

export function retrieveKnowledgeList(params) {
  return remote({
    url: '/platform/frontend/knowledge/search/list',
    method: 'get',
    params
  })
}

export function retrieveRelateKnowledgeList(params) {
  return remote({
    url: '/platform/frontend/knowledge/search/relate',
    method: 'get',
    params
  })
}

export function retrieveKnowledgeDetail(params) {
  return remote({
    url: '/platform/frontend/knowledge/search/detail',
    method: 'get',
    params
  })
}

export function retrieveUserKnowledge(params) {
  return remote({
    url: '/platform/frontend/knowledge/search/user/create',
    method: 'get',
    params
  })
}

export function retrieveUserParticipant(params) {
  return remote({
    url: '/platform/frontend/knowledge/search/user/participant',
    method: 'get',
    params
  })
}

export function retrieveKnowledgeCreator(params) {
  return remote({
    url: '/platform/frontend/knowledge/search/creator',
    method: 'get',
    params
  })
}

export function retrieveKnowledgeParticipant(params) {
  return remote({
    url: '/platform/frontend/knowledge/search/participant',
    method: 'get',
    params
  })
}

export function alreadyJoin(params) {
  return remoteWithToken({
    url: '/platform/frontend/knowledge/search/already-join',
    method: 'get',
    params
  })
}

export function joinKnowledge(params) {
  return remoteWithToken({
    url: '/platform/frontend/knowledge/join',
    method: 'post',
    params
  })
}

export function passwordVerify(params) {
  return remoteWithToken({
    url: '/platform/frontend/knowledge/password/verify',
    method: 'get',
    params
  })
}
