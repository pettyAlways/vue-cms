import remote from '../utils/remote'

export function listKnowledge() {
  return remote({
    url: '/platform/blog/knowledge/list',
    method: 'get'
  })
}

export function cardKnowledge() {
  return remote({
    url: '/platform/blog/knowledge/card',
    method: 'get'
  })
}

export function knowledgeItem(params) {
  return remote({
    url: '/platform/blog/knowledge/item',
    method: 'get',
    params
  })
}

export function removeShareKnowledge(params) {
  return remote({
    url: '/platform/blog/knowledge/share/remove',
    method: 'delete',
    params
  })
}

export function removeKnowledge(params) {
  return remote({
    url: '/platform/blog/knowledge/remove',
    method: 'delete',
    params
  })
}

export function removeShareParticipant(params) {
  return remote({
    url: '/platform/blog/knowledge/share/removeParticipant',
    method: 'put',
    params
  })
}

export function removeParticipant(params) {
  return remote({
    url: '/platform/blog/knowledge/removeParticipant',
    method: 'put',
    params
  })
}

export function editKnowledge(data) {
  return remote({
    url: '/platform/blog/knowledge/update',
    method: 'put',
    data
  })
}

export function editShareKnowledge(data) {
  return remote({
    url: '/platform/blog/knowledge/share/update',
    method: 'put',
    data
  })
}

export function saveKnowledge(data) {
  return remote({
    url: '/platform/blog/knowledge/add',
    method: 'post',
    data
  })
}

export function retrieveKnowledge(params) {
  return remote({
    url: '/platform/blog/knowledge/belongs/mine',
    method: 'get',
    params
  })
}
