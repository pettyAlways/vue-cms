import remote from '../utils/remote'

export function recentPost() {
  return remote({
    url: '/platform/blog/recent/post',
    method: 'get'
  })
}

export function recentArticle() {
  return remote({
    url: '/platform/blog/recent/article/edit',
    method: 'get'
  })
}

export function recentKnowledge() {
  return remote({
    url: '/platform/blog/recent/knowledge/edit',
    method: 'get'
  })
}
