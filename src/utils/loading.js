import Vue from 'vue'
import { Loading } from 'element-ui'

export default {
  loadingInstance: {},
  startLoading(querySelector, text) {
    this.loadingInstance = Loading.service({
      target: querySelector,
      text: text || '拼命加载中...',
      lock: false,
      spinner: 'el-icon-loading'
    })
  },
  stopLoading() {
    Vue.nextTick(() => {
      this.loadingInstance.close()
    })  }
}
