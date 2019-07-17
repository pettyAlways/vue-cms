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
const whiteList = ['/login']
router.beforeEach((to, from, next) => {
  if (getToken()) {
    // 有token访问login页面，就跳到首页
    if (to.path === '/login') {
      next('/platform/blog')
      NProgress.done()
    } else {
      // 刷新操作token存在但是vuex内容被清空执行下面代码
      if (store.getters.permissions.length === 0) {
        store.dispatch('pullUserInfo').then(permissions => {
          // 只有导航栏的资源才拥有默认页面的功能
          store.dispatch('resolveDefaultPage', permissions['navigation'])
          // 动态添加路由
          store.dispatch('GenerateRoutes', permissions).then(() => {
            // 动态添加可访问路由表
            router.addRoutes(store.getters.addRouters)
            // addRouters可能还没完成就执行next导致出错，这里使用next(to) 终端当前路由并重定向指定地址（这里重新再来一遍~），replace：true 重定向地址代替当前中断的路由的历史记录
            next({ ...to, replace: true })
          })
        }).catch(reason => {
          // promise需要处理异常
          Vue.prototype.$message.error(reason.response.data)
        })
      } else {
        next()
      }
    }
  } else {
    if (whiteList.includes(to.path)) {
      next()
    } else {
      next('/login')
    }
  }
  if (to.path === '/home/homePage') {
    store.dispatch('switchConfigureMenu', 'HomePage')
  }
})
