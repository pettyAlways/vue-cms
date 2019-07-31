import axios from 'axios/index'
import router from '../router'
import { removeToken, getToken } from '@/utils/auth'
import Vue from 'vue'
function remote(params) {
  // catch当HttpStatus状态码不是200时会进入
  let instance = axios(params)
  return instance
}

export function remoteWithToken(params) {
  // catch当HttpStatus状态码不是200时会进入
  if (getToken()) {
    params['headers'] = { 'Authorization': getToken() }
  }
  let instance = axios(params)
  return instance
}

axios.interceptors.request.use(function (config) {
  return config
}, function (error) {
  return Promise.reject(error)
})

// 请求码非200会进入到error函数处理等价于在上面axios(params)后面加个catch
axios.interceptors.response.use(function (response) {
  if (!response.data.flag) {
    // 预留一些错误不提示，如code为2018
    if (response.data.code !== '2018') {
      Vue.prototype.$message({
        message: response.data.message,
        type: 'error'
      })
    }
  }
  return response.data
}, function (error) {
  // 重定向登录页面
  if (error.response.status === 401) {
    goLogin('登录凭证失效请重新登录')
    return { flag: false }
  }
  if (error.response.status === 403) {
    goLogin('访问被拒绝请重新登录')
    return { flag: false }
  }
  return Promise.reject(error)
})

// 移除token则使用reload的时候在permission文件中跳转到login
function goLogin(message) {
  removeToken()
  setTimeout(() => {
    router.push({ path: '/login' })
  }, 3 * 1000 + 1)
  Vue.prototype.$message({
    message: message,
    type: 'error'
  })
}

export default remote
