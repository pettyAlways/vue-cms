import remote from '../utils/remote'

export function listArticle(params) {
  return remote({
    url: '/platform/blog/article/list',
    method: 'get',
    params
  })
}
export function getArticle(params) {
  return remote({
    url: '/platform/blog/article/get',
    method: 'get',
    params
  })
}

export function addArticle(data) {
  return remote({
    url: '/platform/blog/article/post',
    method: 'post',
    data
  })
}

export function editArticle(data) {
  return remote({
    url: '/platform/blog/article/edit',
    method: 'put',
    data
  })
}

export function editShareArticle(data) {
  return remote({
    url: '/platform/blog/article/share/edit',
    method: 'put',
    data
  })
}

export function deleteShareArticle(params) {
  return remote({
    url: '/platform/blog/article/share/delete',
    method: 'delete',
    params
  })
}

export function deleteArticle(params) {
  return remote({
    url: '/platform/blog/article/delete',
    method: 'delete',
    params
  })
}

export function copyArticle(params) {
  return remote({
    url: '/platform/blog/article/copy',
    method: 'post',
    params
  })
}
