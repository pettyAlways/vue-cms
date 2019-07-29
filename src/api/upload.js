import { remoteWithToken } from '../utils/remote'

export function fileUpload(data) {
  return remoteWithToken({
    headers: { 'Content-Type': 'multipart/form-data' },
    url: '/platform/blog/upload/common',
    method: 'post',
    data
  })
}
