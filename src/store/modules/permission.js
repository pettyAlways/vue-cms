import { constantRouterMap, asyncRouterMap } from '@/router'
let _ = require('lodash')
/**
 * 递归过滤异步路由表，返回符合用户角色权限的路由表
 * @param asyncRouterMap
 * @param routesMap
 */
function filterAsyncRouter(asyncRouterMap, roles, parentPath) {
  const accessedRouters = asyncRouterMap.filter(route => {
    if (!_.isEmpty(route.children)) {
      route.children = filterAsyncRouter(route.children, roles, route.path)
      return true
    }
    if (roles.indexOf(`${parentPath || ''}/${route.path}`) !== -1) {
      return true
    }
    return false
  })
  return accessedRouters
}

// 将树结构数据变成平面化结构数据
function resolveMenuTree(menuTree) {
  if (_.isEmpty(menuTree)) {
    return []
  }
  let allLeaves = []
  menuTree.forEach(item => {
    if (item.type === 'menu') {
      let leaves = resolveMenuTree(item.children)
      allLeaves = [...allLeaves, ...leaves]
    } else if (item.type === 'page') {
      allLeaves.push(item.path)
    }
  })
  return allLeaves
}
const SET_ROUTERS = 'SET_ROUTERS'
const SET_SYS_PARAM = 'SET_SYS_PARAM'

const permission = {
  state: {
    addRouters: '',
    routers: constantRouterMap,
    sysParam: {}
  },
  mutations: {
    [SET_ROUTERS](state, routers) {
      state.addRouters = routers
      state.routers = constantRouterMap.concat(routers)
    },
    [SET_SYS_PARAM](state, sysParam) {
      state.sysParam = sysParam
    }
  },
  actions: {
    GenerateRoutes({ commit }, routers) {
      return new Promise((resolve) => {
        const { permissions } = routers
        // 将该用户的所有权限都存放到数组中
        let routersMap = []
        Object.keys(permissions).forEach(key => {
          routersMap = [...routersMap, ...resolveMenuTree(permissions[key])]
        })
        // 将数组中的用户权限比对异步路由并动态添加匹配的动态路由
        debugger
        let accessedRouters = filterAsyncRouter(asyncRouterMap, routersMap)
        commit(SET_ROUTERS, accessedRouters)
        resolve()
      })
    }
  },
  getters: {
    addRouters: state => state.addRouters,
    routers: state => state.routers,
    sysParam: state => state.sysParam
  }
}

export default permission
