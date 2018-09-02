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
function resolveMenuTree(menuTree) {
  if (_.isEmpty(menuTree)) {
    return []
  }
  let allLeaves = []
  menuTree.forEach(item => {
    if (item.type === 'menu') {
      let leaves = resolveMenuTree(item.children)
      allLeaves = [...allLeaves, ...leaves]
    } else if (item.type === 'leaf') {
      allLeaves.push(item.path)
    }
  })
  return allLeaves
}

const SET_ROUTERS = 'SET_ROUTERS'

const permission = {
  state: {
    addRouters: '',
    routers: constantRouterMap
  },
  mutations: {
    [SET_ROUTERS](state, routers) {
      state.addRouters = routers
      state.routers = constantRouterMap.concat(routers)
    }
  },
  actions: {
    GenerateRoutes({ commit }, routers) {
      return new Promise((resolve) => {
        const { permissions } = routers
        const routersMap = resolveMenuTree(permissions)
        let accessedRouters = filterAsyncRouter(asyncRouterMap, routersMap)
        commit(SET_ROUTERS, accessedRouters)
        resolve()
      })
    }
  },
  getters: {
    addRouters: state => state.addRouters,
    routers: state => state.routers
  }
}

export default permission
