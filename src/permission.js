/*
 * 全局权限检测
 * 包括1、路由的全局守卫
 */

import router from './router'
import store from './store'
import NProgress from 'nprogress'
import { getToken } from '@/common/auth'

NProgress.configure({ showSpinner: false })

// 路由全局前置守卫
const whiteList = ['/login']  // 白名单
router.beforeEach((to, from, next) => {
  if (getToken()) {
    // 有token访问login页面，就跳到首页
    if (to.path === '/login') {
      next('/')
      NProgress.done()
    } else {
      // 有token，没有permissions
      if (store.getters.permissions.length === 0) {
        store.dispatch('pullUserInfo').then(permissions => {
          // 每个导航栏菜单下的左菜单栏都有一个默认打开的页面，这个页面可以在系统配置的功能树页面配置
          store.dispatch('resolveDefaultPage', { permissions: permissions, alias: store.getters.curConfigure })
          store.dispatch('GenerateRoutes', { permissions }).then(() => {
            // 动态添加可访问路由表
            router.addRoutes(store.getters.addRouters)
            if (store.getters.curConfigure === 'HomePage') {
              // 页面刷新回到首页
              next('/home')
            } else {
              // addRouters可能还没完成就执行next导致出错，这里使用next(to) 终端当前路由并重定向指定地址（这里重新再来一遍~），replace：true 重定向地址代替当前中断的路由的历史记录
              next({ ...to, replace: true })
            }
          })
        }).catch(() => {
          store.dispatch('logout').then(() => {
            next('/login')
          })
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
  if (to.path === '/home') {
    store.dispatch('switchConfigureMenu', 'HomePage')
  }
})
