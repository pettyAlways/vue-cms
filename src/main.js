import Vue from 'vue'
import App from './App'
import router from './router'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
// import '@/style/theme_sky_sea.scss'
import './style/index.scss'
// 状态机
import store from './store'
// 国际化
import i18n from './lang'
// 全局权限检查
import './permission'
// 全局图标
import './icons'
import 'prismjs/themes/prism-tomorrow.css'
// 全局日志
import log from './utils/logger'
import loading from './utils/loading'
import * as filters from './utils/filters'
// 代码高亮
import Prism from 'prismjs'
// 图片剪裁工具
import VueCropper from 'vue-cropper'
Vue.use(VueCropper)
var _ = require('lodash')
Vue.prototype._ = _
// 异步获取代码不能直接在这里使用Prism.highlightAll，应该在显示代码的页面当代码内容加载以后在执行
// 参考：https://juejin.im/post/5c6826a65188256ec63ef901
Prism.highlightAll()
// 项目上线后不再提示警告
Vue.config.productionTip = false

// 全局管道
Object.keys(filters).forEach(function(key) {
  Vue.filter(key, filters[key])
})

Vue.use(ElementUI)
// 引入log工具
Vue.prototype.$logHelper = log
Vue.prototype.$logHelper.openLog = true
// 引入动画工具
Vue.prototype.$loadingHelper = loading
Vue.prototype.$Prism = Prism

new Vue({
  router,
  store,
  i18n,
  render: h => h(App)
}).$mount('#app')
