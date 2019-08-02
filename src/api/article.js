import remote from '../utils/remote'

export function retrieveRecentArticle() {
  return remote({
    url: '/platform/frontend/article/search/recent',
    method: 'get'
  })
}

export function retrieveRecentArticleInKnowledge(params) {
  return remote({
    url: '/platform/frontend/article/search/recent/in-knowledge',
    method: 'get',
    params
  })
}

export function retrieveArticle(params) {
  return remote({
    url: '/platform/frontend/article/search/item',
    method: 'get',
    params
  })
}

export function retrieveKnowledgeCatalogue(params) {
  return remote({
    url: '/platform/frontend/article/search/catalogue',
    method: 'get',
    params
  })
}

export function recentArticleListInfo() {
  return remote({
    url: '/platform/frontend/article/search/recent/info',
    method: 'get'
  })
}

export function retrieveRecentPost(params) {
  return remote({
    url: '/platform/frontend/article/search/recent/post',
    method: 'get',
    params
  })
}

export function retrieveRecentEdit(params) {
  return remote({
    url: '/platform/frontend/article/search/recent/edit',
    method: 'get',
    params
  })
}

export function retrieveArticleConcise(params) {
  return remote({
    url: '/platform/frontend/article/search/concise',
    method: 'get',
    params
  })
}

export function retrieveUserRecentPost(params) {
  return remote({
    url: '/platform/frontend/article/search/user/post',
    method: 'get',
    params
  })
}
