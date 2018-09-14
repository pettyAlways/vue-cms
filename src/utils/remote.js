import axios from 'axios/index'
import { Message } from 'element-ui'
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
    Message.error(response.message)
  }
  return response
}, function (error) {
  return Promise.reject(error)
})

export default remote
