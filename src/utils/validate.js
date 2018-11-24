
// 校验是否为空
export function isEmpty(any) {
  if (!any) {
    return true
  }
  // 空格字符串
  if (typeof any === 'string') {
    return !any.replace(/(^\s*)|(\s*$)/g, '')
  }
  // []字符串
  if (Object.prototype.toString.call(any) === '[object Array]') {
    return !any.length
  }
  // {}字符串
  if (Object.prototype.toString.call(any) === '[object Object]') {
    return !Object.keys(any).length
  }
}
export function isTel(value) {
  let reg = /(^[0-9]{3,4}-[0-9]{3,8}$)|(^[0-9]{3,8}$)|(^\([0-9]{3,4}\)[0-9]{3,8}$)|(^(400)-(\d{3})-(\d{4})(.)(\d{1,4})$)|(^(400)-(\d{3})-(\d{4})$)|(^(0|86|17951)?(13[0-9]|16[0-9]|15[012356789]|17[678]|18[0-9]|14[357])[0-9]{8}$)/
  return reg.test(value)
}
export function telValidate(rule, value, cback) {
  if (!isEmpty(value) && !isTel(value)) {
    cback('请输入正确的电话')
  }
}
