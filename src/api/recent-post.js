import remote from '../utils/remote'

export function recentPost() {
  return remote({
    url: '/platform/blog/recent/post',
    method: 'get'
  })
}

export function recentArticle(params) {
  return remote({
    url: '/platform/blog/recent/article/edit',
    method: 'get',
    params
  })
}

export function recentKnowledge(params) {
  return remote({
    url: '/platform/blog/recent/knowledge/edit',
    method: 'get',
    params
  })
}
