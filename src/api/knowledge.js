import remote from '../utils/remote'

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

export function retrieveKnowledgeList(params) {
  return remote({
    url: '/platform/frontend/knowledge/search/list',
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
