import remote from '../utils/remote'

export function retrieveRecommend() {
  return remote({
    url: '/platform/frontend/knowledge/search/recommend',
    method: 'get'
  })
}
