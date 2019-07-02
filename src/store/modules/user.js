import { login, userInfo, logout } from '@/api/login'
import { getToken, setToken, removeToken } from '@/utils/auth'
import store from '../index'

const SET_TOKEN = 'SET_TOKEN'
const SET_USER = 'SET_USER'
const SET_PAGEMENUS = 'SET_PAGEMENUS'
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

function partitionByMenu(tree) {
  let partition = {}
  if (tree.type === 'module') {
    let menus = tree.children || []
    menus.forEach(menu => {
      partition[menu.alias] = menu.children
    })
  }
  return partition
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
    [SET_PAGEMENUS](state, permissions) {
      if (permissions) {
        for (let permission in permissions) {
          let menus = plainPageMenus(permission)
          state.pageMenus = Object.assign({}, state.pageMenus, menus)
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
            setToken(resp.authorization)
            commit(SET_TOKEN, resp.authorization)
            return resolve(resp)
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
          let permissions = data.resourceTree.children
          let partition = {}
          permissions.forEach(item => {
            let pageStorage = partitionByMenu(item)
            partition = { ...partition, ...pageStorage }
          })
          // 缓存当前用户有权限的按钮
          let allMenus = []
          Object.key(partition).forEach(key => {
            allMenus = [ ...allMenus, ...partition[key] ]
          })
          commit(SET_PAGEMENUS, allMenus)

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
