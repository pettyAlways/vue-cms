import Vue from 'vue'
import store from '../store/index'
import IconSvg from '@/components/icon-svg'

Vue.component('icon-svg', IconSvg)

// 在资源列表中显示的图标
const requireAll = requireContext => requireContext.keys().map(requireContext)
const req = require.context('./svg', false, /\.svg$/)
requireAll(req)

// 引入不需要在资源列表展示的图标
const refFun = requireContext => requireContext.keys().map(requireContext)
const refContext = require.context('./reference', false, /\.svg$/)
refFun(refContext)

// 将svg图标全部变成可选图标供其他地方使用
console.info(req)
store.commit(`SAVE_SVG_ICONS`, req.keys().map(item => {
  let re = /\.\/(\S+).svg/ig
  var result
  while ((result = re.exec(item))) {
    return result[1]
  }
}))
