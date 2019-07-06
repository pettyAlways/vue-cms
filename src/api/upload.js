import remote from '../utils/remote'

export function fileUpload(data) {
  return remote({
    headers: { 'Content-Type': 'multipart/form-data' },
    url: '/platform/blog/upload/common',
    method: 'post',
    data
  })
}
