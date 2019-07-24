import remote from '../utils/remote'

export function goThirdParty() {
  return remote({
    url: '/platform/frontend/third-party/search/entry',
    method: 'get'
  })
}
