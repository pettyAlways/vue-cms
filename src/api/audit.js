import { remoteWithToken } from '../utils/remote'

export function postAudit(data) {
  return remoteWithToken({
    url: '/platform/frontend/audit/be-author',
    method: 'post',
    data
  })
}
