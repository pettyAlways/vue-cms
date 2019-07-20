export function transformDate(date) {
  date = new Date(date)
  let curDate = new Date()
  let show = ''
  if (date.getFullYear() !== curDate.getFullYear()) {
    show = date.getFullYear() ? date.getFullYear() : ''
    show += date.getMonth() ? '-' + fillZero(date.getMonth()) : ''
    show += date.getDate() ? '-' + fillZero(date.getDate()) : ''
    show += date.getHours() ? ' ' + fillZero(date.getHours()) : ''
    show += date.getMinutes() ? ':' + fillZero(date.getMinutes()) : ''
    show += date.getSeconds() ? ':' + fillZero(date.getSeconds()) : ''
    return show
  }
  if (date.getDate() !== curDate.getDate()) {
    show += date.getMonth() ? fillZero(date.getMonth()) : ''
    show += date.getDate() ? '-' + fillZero(date.getDate()) : ''
    show += date.getHours() ? ' ' + fillZero(date.getHours()) : ''
    show += date.getMinutes() ? ':' + fillZero(date.getMinutes()) : ''
    show += date.getSeconds() ? ':' + fillZero(date.getSeconds()) : ''
    return show
  }
  show += date.getHours() ? fillZero(date.getHours()) : ''
  show += date.getMinutes() ? ':' + fillZero(date.getMinutes()) : ''
  show += date.getSeconds() ? ':' + fillZero(date.getSeconds()) : ''

  return show
}

function fillZero(value) {
  if (value < 10) {
    return '0' + value
  }
  return value
}
