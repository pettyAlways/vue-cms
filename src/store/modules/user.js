import { login, userInfo, logout } from '@/api/login'
import { getToken, setToken, removeToken } from '@/utils/auth'
import store from '../index'

const SET_TOKEN = 'SET_TOKEN'
const SET_USER = 'SET_USER'
const SET_PERMISSIONS = 'SET_PERMISSIONS'
const SET_PAGEMENUS = 'SET_PAGEMENUS'
const SET_MODULELIST = 'SET_MODULELIST'
const SAVE_SVG_ICONS = 'SAVE_SVG_ICONS'

// 将该用户有权限的按钮放入列表并标记为true,方便后面页面控制按钮的隐藏和显示
function plainPageMenus(permissions) {
  let pageMenus = {}
  if (permissions) {
    permissions.forEach(item => {
      if (item.type === 'page') {
        let menus = item.children.length ? item.children.map(tItem => { return tItem.name }) : []
        let power = {}
        menus.forEach(cItem => {
          power = { ...power, [cItem]: true }
        })
        pageMenus = { ...pageMenus, ...{ [item.path]: power } }
      } else if (item.type === 'menu') {
        pageMenus = { ...pageMenus, ...plainPageMenus(item.children) }
      }
    })
  }
  return pageMenus
}

const user = {
  state: {
    token: getToken(),
    currentUser: {},
    permissions: '',
    pageMenus: {},
    moduleList: [],
    svgIconList: []
  },
  mutations: {
    [SET_TOKEN](state, token) {
      state.token = token
    },
    [SET_USER](state, user) {
      state.currentUser = user
    },
    [SET_PERMISSIONS](state, permissions) {
      state.permissions = permissions
    },
    [SET_MODULELIST](state, modules) {
      state.moduleList = modules
    },
    [SET_PAGEMENUS](state, permissions) {
      if (permissions) {
        for (let key in permissions) {
          let menus = plainPageMenus(permissions[key])
          state.pageMenus = Object.assign({}, state.pageMenus, {
            [key]: menus
          })
        }
      }
    },
    [SAVE_SVG_ICONS](state, svgList) {
      state.svgIconList = svgList
    }
  },
  actions: {
    // 用户登录
    login({ commit }, userInfo) {
      return new Promise((resolve, reject) => {
        login(userInfo).then(resp => {
          if (resp.flag) {
            setToken(resp.token)
            commit(SET_TOKEN, resp.token)
            return resolve()
          } else {
            reject(resp.message)
          }
        }).catch(err => {
          return reject(err)
        })
      })
    },
    // 拉取用户信息
    pullUserInfo({ commit }) {
      return new Promise((resolve, reject) => {
        userInfo().then(resp => {
          let data = resp.data
          // 更新中心信息缓存其实没什么必要
          commit(SET_USER, resp.currentUser)
          // 模块权限路由缓存
          let partition = {}
          data.resourceTree.children.forEach(item => {
            partition[item.alias] = item.children
          })
          let modules = data.resourceTree.children.map(item => {
            return { index: item.alias, icon: item.icon, name: item.name }
          })
          // 模块列表用于显示导航栏
          commit(SET_MODULELIST, modules)
          // 整个系统当前用户的权限路径
          commit(SET_PERMISSIONS, partition)
          // 缓存当前用户有权限的按钮
          commit(SET_PAGEMENUS, partition)
          return resolve(partition)
        })
      })
    },
    // 用户退出登录
    logout({ commit }) {
      return new Promise((resolve, reject) => {
        logout().then(resp => {
          removeToken()
          commit(SET_USER, {})
          return resolve()
        }).catch(err => {
          return reject(err)
        })
      })
    }
  },
  getters: {
    token: state => state.token,
    name: state => state.name,
    age: state => state.age,
    avatar: state => state.avatar,
    permissions: state => state.permissions,
    pageMenus: state => state.pageMenus[store.getters.curConfigure],
    moduleList: state => state.moduleList,
    svgIconList: state => state.svgIconList,
    currentUser: state => state.currentUser
  }
}

export default user
