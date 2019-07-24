/*
 * 全局权限检测
 * 包括1、路由的全局守卫
 */
import Vue from 'vue'
import router from './router'
import store from './store'
import NProgress from 'nprogress'
import { getToken } from '@/utils/auth'

NProgress.configure({ showSpinner: false })

// 路由全局前置守卫
router.beforeEach((to, from, next) => {
  if (getToken()) {
    // 有token访问login页面，就跳到首页
    if (to.path === '/login') {
      next('/index')
      NProgress.done()
    } else {
      // 刷新操作token存在但是vuex内容被清空执行下面代码
      console.error(store.getters.userShow)
      if (!store.getters.userShow.userId) {
        store.dispatch('retrieveUserInfo').then(() => {
          next({ ...to, replace: true })
        }).catch(reason => {
          Vue.prototype.$message.error(reason)
        })
      } else {
        next()
      }
    }
  } else {
    next()
  }
})
