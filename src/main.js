import Vue from 'vue'
import App from './App'
import router from './router'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import './style/index.scss'
// 状态机
import store from './store'
// 全局权限检查
import './permission'
import './icons'

import * as filters from './utils/filters'

// 图片剪裁工具
import VueCropper from 'vue-cropper'
Vue.use(VueCropper)

// 全局管道
Object.keys(filters).forEach(function(key) {
  Vue.filter(key, filters[key])
})

Vue.use(ElementUI)

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
