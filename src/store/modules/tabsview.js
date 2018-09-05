const SET_TABSVIEW = 'SET_TABSVIEW'
const DEL_TABSVIEW = 'DEL_TABSVIEW'

const tabsview = {
  state: {
    tabViews: {}
  },
  mutations: {
    [SET_TABSVIEW](state, payLoad) {
      let visitedTabsView = state.tabViews[payLoad.menuSwitch] || []
      if (visitedTabsView.find((n) => n.path === payLoad.route.path)) {
        return
      }
      visitedTabsView.push({ name: payLoad.route.name, path: payLoad.route.path })
      // 新增对象属性时需要按照一定规则才能响应
      state.tabViews = Object.assign({}, state.tabViews, {
        [payLoad.menuSwitch]: visitedTabsView
      })
    },
    [DEL_TABSVIEW](state, payLoad) {
      let route = payLoad.route
      for (let [i, v] of state.tabViews[payLoad.menuSwitch].entries()) {
        if (v.path === route.path || v.name === route.name) {
          state.tabViews[payLoad.menuSwitch].splice(i, 1)
        }
      }
    }
  },
  actions: {
    // 添加一个新的tabsView
    addVisitedTabsView({ commit }, payLoad) {
      commit(SET_TABSVIEW, payLoad)
    },
    // 关闭一个tabsViewx
    delVisitedTabsView({ commit, state }, payLoad) {
      return new Promise((resolve) => {
        commit(DEL_TABSVIEW, payLoad)
        resolve([...state.tabViews])
      })
    }
  },
  getters: {
    tabViews: state => state.tabViews
  }
}

export default tabsview
