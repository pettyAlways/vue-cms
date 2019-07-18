import Vue from 'vue'
import Vuex from 'vuex'
import user from './modules/user'
import menuswitch from './modules/menuswitch'
import tabsview from './modules/tabsview'
import language from './modules/language'
import permission from './modules/permission'
import message from './modules/message'

Vue.use(Vuex)

export default new Vuex.Store({
  modules: {
    user,
    menuswitch,
    tabsview,
    language,
    permission,
    message
  }
})
