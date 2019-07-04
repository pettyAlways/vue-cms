import remote from '../utils/remote'

export function searchCategory() {
  return remote({
    url: '/platform/blog/category/search',
    method: 'get'
  })
}

export function deleteCategory(params) {
  return remote({
    url: '/platform/blog/category/delete',
    method: 'delete',
    params
  })
}

export function editCategory(data) {
  return remote({
    url: '/platform/blog/category/update',
    method: 'put',
    data
  })
}

export function saveCategory(data) {
  return remote({
    url: '/platform/blog/category/add',
    method: 'post',
    data
  })
}
