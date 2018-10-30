import axios from 'axios/index'
import { removeToken } from '@/utils/auth'
import Vue from 'vue'
const config = require('../../config')
axios.defaults.baseURL = process.env.NODE_ENV === 'production' ? config.build.host : `http://${config.dev.host}:${config.dev.port}`
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
  if (!response.data.flag) {
    // 未登陆
    if (response.data.code === '401') {
      removeToken()
      setTimeout(() => {
        location.href = '/#/login'
      }, 3 * 1000 + 1)
    }
    // 未授权
    if (response.data.code === '403') {
      setTimeout(() => {
        location.href = '/#/home'
      }, 3 * 1000 + 1)
    }
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
