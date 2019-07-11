import remote from '../utils/remote'

export function listKnowledge(params) {
  return remote({
    url: '/platform/blog/knowledge/list',
    method: 'get',
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

export function deleteKnowledge(params) {
  return remote({
    url: '/platform/blog/knowledge/delete',
    method: 'delete',
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

export function saveKnowledge(data) {
  return remote({
    url: '/platform/blog/knowledge/add',
    method: 'post',
    data
  })
}
