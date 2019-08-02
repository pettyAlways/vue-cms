import Vue from 'vue'
import App from './App'
import router from './router'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import './style/index.scss'
import 'prismjs/themes/prism-tomorrow.css'
// 代码高亮
import Prism from 'prismjs'
// 状态机
import store from './store'
// 全局权限检查
import './permission'
import './icons'

import * as filters from './utils/filters'

// 图片剪裁工具
import VueCropper from 'vue-cropper'
Vue.use(VueCropper)
// 异步获取代码不能直接在这里使用Prism.highlightAll，应该在显示代码的页面当代码内容加载以后在执行
// 参考：https://juejin.im/post/5c6826a65188256ec63ef901
Prism.highlightAll()
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
