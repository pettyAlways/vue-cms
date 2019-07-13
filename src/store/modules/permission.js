import { constantRouterMap, asyncRouterMap } from '@/router'
let _ = require('lodash')

// 递归过滤异步路由表，返回符合用户角色权限的路由表。如果存在子路由，则需要根据默认页面给父路由设置默认路由，如果默认页面
// 不存在则根据授权页面设置第一张页面为默认路由页面
function filterAsyncRouter(asyncRouterMap, roles, defaultPage, parentPath) {
  const accessedRouters = asyncRouterMap.filter(route => {
    if (!_.isEmpty(route.children)) {
      route.children = filterAsyncRouter(route.children, roles, defaultPage, resolve(route.path, parentPath))
      if (route.children && route.children.length) {
        // 授权的页面是否存在默认页面
        let result = route.children.filter(item => resolve(item.path, route.path) === defaultPage)
        // 新增默认路由
        if (result && result.length) {
          route.children.push({ path: '', component: result[0].component })
        } else {
          route.children.push({ path: '', component: route.children[0].component })
        }
        return true
      }
      return false
    }
    if (roles.indexOf(resolve(route.path, parentPath)) !== -1) {
      return true
    }
    return false
  })
  return accessedRouters
}

// 如果子路由路径开头带有/斜杆则直接返回（参考vue-router根路径规则），否则需要组装父路由路径
function resolve(path, parentPath) {
  if (/^\//.exec(path)) {
    return path
  }
  if (parentPath) {
    return `${parentPath}/${path}`
  }
}

// 将树结构数据变成平面化结构数据
function resolveMenuTree(tree) {
  if (_.isEmpty(tree)) {
    return []
  }
  let allLeaves = []
  tree.forEach(item => {
    if (item.type === 'menu') {
      let leaves = resolveMenuTree(item.children)
      allLeaves = [ ...allLeaves, ...leaves ]
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
    GenerateRoutes({ commit, getters }, permissions) {
      return new Promise((resolve) => {
        // permissions 是menu的alias为key的一组对象，需要将这组对象转换成一个包含所有menu的数组
        let menus = []
        Object.keys(permissions).forEach(key => {
          menus = [ ...menus, permissions[key] ]
        })
        let routersMap = resolveMenuTree(menus)
        // 将数组中的用户权限比对异步路由并动态添加匹配的动态路由
        let defaultPage = getters.defaultPage
        let accessedRouters = filterAsyncRouter(asyncRouterMap, routersMap, defaultPage)
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
