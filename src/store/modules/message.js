import { comfirmRead, allRead } from '@/api/message'
const SET_MESSAGE = 'SET_MESSAGE'

const message = {
  state: {
    messageNum: 0
  },
  mutations: {
    [SET_MESSAGE](state, messageNum) {
      state.messageNum = messageNum
    }
  },
  actions: {
    // 消息设置已读
    confirmMessageRead({ commit }, params) {
      comfirmRead(params).then(res => {
        if (res.flag) {
          let unReadNum = res.unReadNum
          commit(SET_MESSAGE, unReadNum)
        }
      })
    },
    // 设置用户下的所有消息已读
    allMessageRead({ commit }) {
      allRead().then(res => {
        if (res.flag) {
          let unReadNum = res.unReadNum
          commit(SET_MESSAGE, unReadNum)
        }
      })
    }
  },
  getters: {
    messageNum: state => state.messageNum
  }
}

export default message
