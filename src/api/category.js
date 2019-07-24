import remote from '../utils/remote'

export function retrieveAllCategory() {
  return remote({
    url: '/platform/frontend/category/search/all',
    method: 'get'
  })
}
