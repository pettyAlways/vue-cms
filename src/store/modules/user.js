import { retrieveUserInfo, login } from '../../api/user'
import {removeToken, setToken} from '../../utils/auth'

const SET_USERINFO = 'SET_USERINFO'

const user = {
  state: {
    userShow: {}
  },
  mutations: {
    [SET_USERINFO](state, userInfo) {
      state.userShow = userInfo
    }
  },
  actions: {
    retrieveUserInfo({commit}) {
      return new Promise((resolve, reject) => {
        retrieveUserInfo().then(res => {
          if (res.flag) {
            resolve()
            commit(SET_USERINFO, res.data)
          }
        })
      })
    },
    userLogin({commit}, params) {
      return new Promise((resolve, reject) => {
        login(params).then(res => {
          if (res.flag) {
            setToken(res.authorization)
            resolve()
          }
        }).catch(reason => {
          reject(reason)
        })
      })
    },
    loginOut({commit}) {
      removeToken()
      commit(SET_USERINFO, {})
    }
  },
  getters: {
    userShow: state => state.userShow
  }
}
export default user
