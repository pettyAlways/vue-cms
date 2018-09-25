import Vue from 'vue'
import App from './App'
import router from './router'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
// 状态机
import store from './store'
// 国际化
import i18n from './lang'
// 全局权限检查
import './permission'
// 全局图标
import './icons'
// 全局 Mock 接口
import './mock'
// 全局日志
import log from './utils/logger'

import loading from './utils/loading'

var _ = require('lodash')
Vue.prototype._ = _

// 项目上线后不再提示警告
Vue.config.productionTip = false

Vue.use(ElementUI, {
  size: 'medium',
  i18n: (key, value) => i18n.t(key, value)
})
// 引入log工具
Vue.prototype.$logHelper = log
Vue.prototype.$logHelper.openLog = true
// 引入动画工具
Vue.prototype.$loadingHelper = loading

new Vue({
  router,
  store,
  i18n,
  render: h => h(App)
}).$mount('#app')
