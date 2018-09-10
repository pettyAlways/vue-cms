let _ = require('lodash')
// 通过导航栏的菜单进行切换aside功能界面
const SET_CURCONFIGURE = 'SET_CURCONFIGURE'
const SET_DEFAULTPAGE = 'SET_DEFAULTPAGE'
const SET_CONFIGUREITEM = 'SET_CONFIGUREITEM'

let firstIn = true
let firtLeafNode = ''
function findDefaultPage(menus) {
  let defaultPage = ''
  if (_.isEmpty(menus)) {
    return ''
  }
  for (let item of menus) {
    if (firstIn && item.type === 'leaf') {
      firtLeafNode = item.path
      firstIn = false
    }
    if (item.type === 'leaf' && item.defaultPage) {
      return item.path
    }
    if (item.type === 'menu') {
      defaultPage = findDefaultPage(item.children)
      if (defaultPage) {
        return defaultPage
      }
    }
  }
}

const menuswitch = {
  state: {
    curConfigure: 'HomePage',
    configureItem: [],
    defaultPage: {}
  },
  mutations: {
    [SET_CURCONFIGURE](state, curMenuName) {
      state.curConfigure = curMenuName
    },
    [SET_DEFAULTPAGE](state, defaultPage) {
      state.defaultPage = Object.assign({}, state.defaultPage, {
        [defaultPage.configure]: defaultPage.sidebarPage
      })
    },
    [SET_CONFIGUREITEM](state, configureItem) {
      state.configureItem = configureItem
    }
  },
  actions: {
    // 添加一个新的tabsView
    switchConfigureMenu({ commit }, curMenuName) {
      commit(SET_CURCONFIGURE, curMenuName)
    },
    // F5刷新vuex状态丢失需要路由全局守卫调用该Action进行重新设置默认页面,也可以在切换导航菜单时调用
    resolveDefaultPage({ commit }, {permissions, alias}) {
      let sidebarPage = alias === 'HomePage' ? '/home' : (findDefaultPage(permissions) || firtLeafNode)
      commit(SET_DEFAULTPAGE, {configure: alias, sidebarPage: sidebarPage})
    }
  },
  getters: {
    curConfigure: state => state.curConfigure,
    defaultPage: state => state.defaultPage
  }
}

export default menuswitch
