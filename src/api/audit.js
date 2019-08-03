import remote from '../utils/remote'

export function authorAuditList(params) {
  return remote({
    url: '/platform/blog/audit/author/list',
    method: 'get',
    params
  })
}

export function joinKnowledgeList(params) {
  return remote({
    url: '/platform/blog/audit/join-knowledge/list',
    method: 'get',
    params
  })
}

export function joinKnowledgePass(params) {
  return remote({
    url: '/platform/blog/audit/join-knowledge/pass',
    method: 'put',
    params
  })
}

export function joinKnowledgeNoPass(params) {
  return remote({
    url: '/platform/blog/audit/join-knowledge/no-pass',
    method: 'put',
    params
  })
}

export function authorAuditPass(params) {
  return remote({
    url: '/platform/blog/audit/author/pass',
    method: 'put',
    params
  })
}

export function authorAuditNoPass(params) {
  return remote({
    url: '/platform/blog/audit/author/no-pass',
    method: 'put',
    params
  })
}
