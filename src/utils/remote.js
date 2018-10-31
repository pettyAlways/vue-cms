import axios from 'axios/index'
import { removeToken } from '@/utils/auth'
import Vue from 'vue'
function remote(params) {
  let instance = axios(params).catch(error => {
    // 出异常则关闭遮罩层
    Vue.prototype.$loadingHelper.stopLoading()
    // 日志记录
    Vue.prototype.$logHelper.error(error, 'dev')
  })
  return instance
}

// 参考：http://www.php.cn/js-tutorial-390447.html
axios.interceptors.request.use(function (config) {
  return config
}, function (error) {
  return Promise.reject(error)
})

axios.interceptors.response.use(function (response) {
  // 重定向登录页面
  if (response.data === 401) {
    removeToken()
    setTimeout(() => {
      location.href = '/#/login'
    }, 3 * 1000 + 1)
    Vue.prototype.$message({
      message: '请先登录再访问资源',
      type: 'error'
    })
    return { flag: false }
  }
  // 重定向主页
  if (response.data === 403) {
    setTimeout(() => {
      location.href = '/#/home'
    }, 3 * 1000 + 1)
    Vue.prototype.$message({
      message: '没有权限访问',
      type: 'error'
    })
    return { flag: false }
  }
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
  return Promise.reject(error)
})

export default remote
