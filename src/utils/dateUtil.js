export function formatDate(time, format = 'YY-MM-DD hh:mm:ss') {
  let date = new Date(time)
  let year = date.getFullYear()
  // 月份是从0开始的
  let month = date.getMonth() + 1
  let day = date.getDate()
  let hour = date.getHours()
  let min = date.getMinutes()
  let sec = date.getSeconds()
  // 开个长度为10的数组 格式为 00 01 02 03
  let preArr = Array.apply(null, Array(10)).map(function (elem, index) {
    return '0' + index
  })
  var newTime = format.replace(/YY/g, year)
    .replace(/MM/g, preArr[month] || month)
    .replace(/DD/g, preArr[day] || day)
    .replace(/hh/g, preArr[hour] || hour)
    .replace(/mm/g, preArr[min] || min)
    .replace(/ss/g, preArr[sec] || sec)

  return newTime
}
