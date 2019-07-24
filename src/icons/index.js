import Vue from 'vue'
import IconSvg from '@/components/icon-svg'

Vue.component('icon-svg', IconSvg)

// 引入不需要在资源列表展示的图标
const refFun = requireContext => requireContext.keys().map(requireContext)
const refContext = require.context('./svg', false, /\.svg$/)
refFun(refContext)
