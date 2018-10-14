import Vue from 'vue'
import Router from 'vue-router'

import Login from '@/views/login'
import Layout from '@/views/layout/layout'
import HomePage from '@/views/homepage/homepage'
import Introduction from '@/views/introduction/index'
import ExportExcel from '@/views/excel/export-excel'
import UploadExcel from '@/views/excel/upload-excel'
import ClipBoard from '@/views/clipboard'

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
    path: '/login',
    name: '登录',
    hidden: true,
    component: Login
  },
  {
    path: '/',
    hidden: true,
    component: Layout,
    redirect: '/home',
    children: [
      { path: 'home', component: HomePage, name: '首页', meta: {tagName: '首页'} }
    ]
  }
]

export default new Router({
  routes: constantRouterMap
})

export const asyncRouterMap = [
  {
    path: '/sys-config',
    component: Layout,
    children: [
      { name: 'userManage', path: 'user-manage', component: () => import('../views/authorization/userManage.vue'), meta: {tagName: '用户管理'} },
      { name: 'roleManage', path: 'role-manage', component: () => import('../views/authorization/roleManage.vue'), meta: {tagName: '角色管理'} },
      { name: 'resourceManage', path: 'resource-manage', component: () => import('../views/authorization/resourceManage.vue'), meta: {tagName: '资源管理'} },
      { name: 'organizationManage', path: 'organization-manage', component: () => import('../views/authorization/organizationManage.vue'), meta: {tagName: '组织管理'} },
      { name: 'authorizationManage', path: 'authorization-manage', component: () => import('../views/authorization/authorizationManage.vue'), meta: {tagName: '授权管理'} }
    ]
  }
]
