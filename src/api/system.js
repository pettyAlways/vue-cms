import remote from '../utils/remote'

export function sysParams() {
  return remote({
    url: '/cms_web/system/sysParams.do',
    method: 'get'
  })
}
