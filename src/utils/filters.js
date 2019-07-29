
export function toDate(str) {
  return format(new Date(str), 'yyyy-MM-dd')
}

export function format(datetime, format) {
  let date = {
    'M+': datetime.getMonth() + 1,
    'd+': datetime.getDate(),
    'h+': datetime.getHours(),
    'm+': datetime.getMinutes(),
    's+': datetime.getSeconds(),
    'q+': Math.floor((datetime.getMonth() + 3) / 3),
    'S+': datetime.getMilliseconds()
  }
  if (/(y+)/i.test(format)) {
    format = format.replace(RegExp.$1, (datetime.getFullYear() + '').substr(4 - RegExp.$1.length))
  }
  for (let k in date) {
    if (new RegExp('(' + k + ')').test(format)) {
      format = format.replace(RegExp.$1, RegExp.$1.length === 1
        ? date[k] : ('00' + date[k]).substr(('' + date[k]).length))
    }
  }
  return format
}

export function daysInMonth(year, month) {
  if (month === 1) {
    if (year % 4 === 0 && year % 100 !== 0) {
      return 29
    } else {
      return 28
    }
  } else if ((month <= 6 && month % 2 === 0) || (month = 6 && month % 2 === 1)) {
    return 31
  } else {
    return 30
  }
}

export function addMonth(addMonth) {
  let y = this.getFullYear()
  let m = this.getMonth()
  let nextY = y
  let nextM = m
  // 如果当前月+要加上的月>11 这里之所以用11是因为 js的月份从0开始
  if (m > 11) {
    nextY = y + 1
    nextM = parseInt(m + addMonth) - 11
  } else {
    nextM = this.getMonth() + addMonth
  }
  let daysInNextMonth = Date.daysInMonth(nextY, nextM)
  let day = this.getDate()
  if (day > daysInNextMonth) {
    day = daysInNextMonth
  }
  return new Date(nextY, nextM, day)
}

export function autoTransform(content) {
  return content || 'Ta很懒'
}

