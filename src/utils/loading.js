import Vue from 'vue'
import { Loading } from 'element-ui'

export default {
  loadingInstance: {},
  // 防止重复加载
  isLoading: false,
  startLoading(querySelector, text) {
    if (this.isLoading) {
      return false
    }
    this.loadingInstance = Loading.service({
      target: querySelector,
      text: text || '拼命加载中...',
      lock: false,
      spinner: 'el-icon-loading'
    })
    this.isLoading = true
    return true
  },
  stopLoading() {
    Vue.nextTick(() => {
      this.loadingInstance.close()
      this.isLoading = false
    })
  }
}
