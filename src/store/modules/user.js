import { login, userInfo, logout } from '@/api/login'
import { getToken, setToken, removeToken } from '@/utils/auth'
import store from '../index'

const SET_TOKEN = 'SET_TOKEN'
const SET_NAME = 'SET_NAME'
const SET_AGE = 'SET_AGE'
const SET_AVATAR = 'SET_AVATAR'
const SET_PERMISSIONS = 'SET_PERMISSIONS'
const SET_PAGEMENUS = 'SET_PAGEMENUS'
const SET_MODULELIST = 'SET_MODULELIST'

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
    name: '',
    age: 0,
    avatar: '',
    permissions: '',
    pageMenus: {},
    moduleList: []
  },
  mutations: {
    [SET_TOKEN](state, token) {
      state.token = token
    },
    [SET_NAME](state, name) {
      state.name = name
    },
    [SET_AGE](state, age) {
      state.age = age
    },
    [SET_AVATAR](state, avatar) {
      state.avatar = avatar
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
            // commit(SET_NAME, data.name)
            // commit(SET_AGE, data.age)
            // commit(SET_AVATAR, data.avatar)
            // commit(SET_PERMISSIONS, data.permissions)
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
          commit(SET_NAME, data.name)
          commit(SET_AGE, data.age)
          commit(SET_AVATAR, data.avatar)
          let partition = {}
          data.resourceTree.children.forEach(item => {
            partition[item.alias] = item.children
          })
          let modules = data.resourceTree.children.map(item => {
            return { index: item.alias, icon: item.icon, name: item.name }
          })
          commit(SET_MODULELIST, modules)
          commit(SET_PERMISSIONS, partition)
          commit(SET_PAGEMENUS, partition)
          // 如果当前的导航菜单是首页则默认缓存SysConfigure的左侧菜单栏数据
          let cacheSideBar = store.getters.curConfigure === 'HomePage' ? 'SysConfigure' : store.getters.curConfigure
          return resolve(partition[cacheSideBar], store.getters.curConfigure === 'HomePage')
        }).catch(err => {
          return reject(err)
        })
      })
    },
    // 用户退出登录
    logout({ commit }) {
      return new Promise((resolve, reject) => {
        logout().then(resp => {
          removeToken()
          commit(SET_TOKEN, '')
          commit(SET_NAME, '')
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
    moduleList: state => state.moduleList
  }
}

export default user
