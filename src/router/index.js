import Vue from 'vue'
import Router from 'vue-router'

import Login from '@/views/login'
import Index from '@/views/index'
import Layout from '@/views/layout/layout'
import HomePage from '@/views/homepage/homepage'

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
    component: Index
  },
  {
    path: '/login',
    name: '登录',
    component: Login
  },
  {
    path: '/home',
    component: Layout,
    children: [
      { path: 'homePage', component: HomePage, name: '首页', meta: {tagName: '首页'} }
    ]
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
export const asyncRouterMap = [
  {
    path: '/sys-config',
    component: Layout,
    children: [
      { name: 'userManage', path: 'user-manage', component: () => import('../views/authorization/userManage.vue'), meta: {tagName: '用户管理'} },
      { name: 'roleManage', path: 'role-manage', component: () => import('../views/authorization/roleManage.vue'), meta: {tagName: '角色管理'} },
      { name: 'resourceManage', path: 'resource-manage', component: () => import('../views/authorization/resourceManage.vue'), meta: {tagName: '资源管理'} },
      { name: 'organizationManage', path: 'organization-manage', component: () => import('../views/authorization/organizationManage.vue'), meta: {tagName: '组织管理'} },
      { name: 'authorizationManage', path: 'authorization-manage', component: () => import('../views/authorization/authorizationManage.vue'), meta: {tagName: '授权管理'} },
      { name: 'configurationManage', path: 'conf-manage', component: () => import('../views/authorization/dic/confManagement.vue'), meta: {tagName: '配置管理'} },
      { name: 'onLineUserManage', path: 'online-manage', component: () => import('../views/authorization/onLineUserManage.vue'), meta: {tagName: '在线管理'} }
    ]
  },
  {
    path: '/service-config',
    component: Layout,
    children: [
      { name: 'helloService', path: 'hello-service', component: () => import('../views/service/helloService.vue'), meta: {tagName: '简单例子'} }
    ]
  }
]
