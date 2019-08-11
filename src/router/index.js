import Vue from 'vue'
import Router from 'vue-router'

import MainNav from '@/views/main'
import Login from '@/views/login'
import beAuthor from '@/views/be-author'
import Index from '@/views/index'
import Knowledge from '@/views/knowledge'
import KnowledgeMain from '@/views/knowledge/components/main'
import KnowledgeDetail from '@/views/knowledge/components/detail'
import KnowledgeArticle from '@/views/knowledge/components/article'
import Brand from '@/views/brand'
import Custom from '@/views/custom'
import News from '@/views/news'
import Relative from '@/views/relative'
import Contact from '@/views/contact'
import Profile from '@/views/profile'
import editProfile from '@/views/profile/components/edit-profile'

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
    path: '/login',
    name: 'login',
    component: Login
  },
  {
    path: '/author/:userId',
    name: 'beAuthor',
    component: beAuthor
  },
  {
    path: '/index',
    component: Index,
    children: [
      {
        path: '',
        name: '首页',
        component: MainNav
      },
      {
        path: '/knowledge',
        component: Knowledge,
        children: [
          {
            path: '',
            name: 'knowledgePage',
            component: KnowledgeMain
          },
          {
            path: 'detail/:knowledgeId',
            name: 'knowledgeDetail',
            component: KnowledgeDetail
          },
          {
            path: '/article-show/:articleId',
            name: 'articleShow',
            component: KnowledgeArticle
          }
        ]
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
      },
      {
        path: '/contact',
        name: 'contactPage',
        component: Contact
      },
      {
        path: '/profile/:userId',
        name: 'profile',
        component: Profile,
        children: [
          { path: '/profile-edit/:userId', name: 'editProfile', component: editProfile }
        ]
      }
    ]
  }
]

export default new Router({
  routes: constantRouterMap,
  scrollBehavior (to, from, savedPosition) {
    if (savedPosition) {
      return savedPosition
    } else {
      const position = { x: 0, y: 0 }
      if (to.hash && to.hash === '#category') {
        position.y = 840
      }
      return position
    }
  }
})
