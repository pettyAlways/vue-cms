// 通过导航栏的菜单进行切换aside功能界面
const SET_CURCONFIGURE = 'SET_CURCONFIGURE'
const menuswitch = {
  state: {
    curConfigure: 'SysConfigure'
  },
  mutations: {
    [SET_CURCONFIGURE](state, curMenuName) {
      state.curConfigure = curMenuName
    }
  },
  actions: {
    // 添加一个新的tabsView
    switchConfigureMenu({ commit }, curMenuName) {
      commit(SET_CURCONFIGURE, curMenuName)
    }
  },
  getters: {
    curConfigure: state => state.curConfigure
  }
}

export default menuswitch
