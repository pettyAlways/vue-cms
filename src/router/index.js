import Vue from 'vue'
import Router from 'vue-router'

import MainNav from '@/views/main'
import Login from '@/views/login'
Vue.use(Router)

/**
 * alwaysShow: true           if set true, will always show the root menu, whatever its child routes length
 *                            if not set alwaysShow, only more than ont route under the children
 *                            it will becomes nested mode, otherwise not show the root menu
 * alwaysShow: true           如果设置为true,它将总是现在在根目录。如果不设置的话，当它只有1个子路由的时候，会把
 *                            它的唯一子路由放到跟目录上来，而不显示它自己本身。
 */

export const constantRouterMap = [
  {
    path: '/',
    // 使用redirect路由守卫最终监听到的是/login
    redirect: '/login'
  },
  {
    path: '/login',
    name: '登录',
    component: Login
  },
  {
    path: '/index',
    component: MainNav,
    children: [
      { path: '', component: () => import('@/views/main/components/workbench') }
    ]
  }

]

export default new Router({
  routes: constantRouterMap
})

/**
 * 注意点
 * 1.默认路由不需要配置，在Action:GenerateRoutes中根据默认页面或者授权页面第一张页面的组件默认路由组件（存在子路由情况）
 * 2.子路由路径如果开头带有/，则在Action:GenerateRoutes中会单独将子路由路径与用户授权的页面路径匹配，不会和父路由路径拼接
 */
export const asyncRouterMap = [
  {
    path: '/platform/blog',
    component: MainNav,
    children: [
      { path: 'workbench', component: () => import('@/views/main/components/workbench') },
      { path: 'category', component: () => import('@/views/main/components/category') },
      { path: 'knowledge', component: () => import('@/views/main/components/knowledge') },
      { path: 'new-knowledge', component: () => import('@/views/new-knowledge') }
    ]
  },
  {
    path: '/knowledge/new',
    component: () => import('@/views/new-knowledge')
  }
]
