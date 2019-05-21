import svg4everybody from 'svg4everybody'

import Icon from './icon.vue'

export default {
  ...Icon,
  install: Vue => {
    // 第一次注册组件时应用 SVG polyfill（伺候老不死的 IE 用）
    if (!Vue.component(Icon.name)) {
      svg4everybody()
    }
    Vue.component(Icon.name, Icon)
  },
}
