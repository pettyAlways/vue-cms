
// 将本地图片转成base64格式的图片
export function getImageUrl(file, callback) {
  if (!window.FileReader) {
    console.error('当前浏览器版本不支持FileReader')
    return
  }
  let reader = new FileReader()
  reader.readAsDataURL(file.raw)
  reader.onloadend = function () {
    // 根据时间戳构建文件名，如果是同一个知识库重复上传封面则文件名相同
    let fileName = (new Date().getTime() + file.name.substring(file.name.lastIndexOf('.')))
    let imageUrl = this.result
    callback(fileName, imageUrl)
  }
}
