import Vue from 'vue'
import Router from 'vue-router'

import MainNav from '@/views/main'
import Category from '@/views/category'
import Brand from '@/views/brand'
import Custom from '@/views/custom'
import News from '@/views/news'
import Relative from '@/views/relative'

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
    redirect: '/index'
  },
  {
    path: '/index',
    name: '首页',
    component: MainNav
  },
  {
    path: '/category',
    name: 'categoryPage',
    component: Category
  },
  {
    path: '/brand',
    name: 'brandPage',
    component: Brand
  },
  {
    path: '/custom',
    name: 'customPage',
    component: Custom
  },
  {
    path: '/news',
    name: 'newsPage',
    component: News
  },
  {
    path: '/relative',
    name: 'relativePage',
    component: Relative
  }

]

export default new Router({
  routes: constantRouterMap
})

/**
 * 注意点
 * 1、需要配置tagName,它是tab的显示名称
 * 2、路由中的name必须要和vue页面export default对象的name一致才能页面缓存生效
 * 3、子组件的路由路径需要和资源配置的路径相同才能动态加入路由中
 */
export const asyncRouterMap = []
