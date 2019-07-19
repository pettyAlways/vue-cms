import router from '../router'
import axios from 'axios/index'
import { removeToken } from '@/utils/auth'
import Vue from 'vue'
function remote(params) {
  // catch当HttpStatus状态码不是200时会进入
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
    goLogin()
    return { flag: false }
  }
  // 重定向主页
  if (error.response.status === 403) {
    goHome()
    return { flag: false }
  }
  return Promise.reject(error)
})

// 移除token则使用reload的时候在permission文件中跳转到login
function goLogin() {
  removeToken()
  setTimeout(() => {
    location.reload()
  }, 3 * 1000 + 1)
  Vue.prototype.$message({
    message: '请先登录',
    type: 'error'
  })
}

// 403返回主页面
function goHome() {
  setTimeout(() => {
    router.replace('/home/homePage')
  }, 3 * 1000 + 1)
  Vue.prototype.$message({
    message: '没有权限访问,返回主页',
    type: 'error'
  })
}

export default remote
