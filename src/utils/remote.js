import axios from 'axios/index'
import Vue from 'vue'
function remote(params) {
  return axios(params)
}

// 参考：http://www.php.cn/js-tutorial-390447.html
axios.interceptors.request.use(function (config) {
  return config
}, function (error) {
  return Promise.reject(error)
})

axios.interceptors.response.use(function (response) {
  // 预留一些错误不提示，如code为2018
  if (!response.data.flag && response.data.code !== '2018') {
    Vue.prototype.$message({
      message: response.data.message,
      type: 'error'
    })
  }
  return response
}, function (error) {
  return Promise.reject(error)
})

export default remote
