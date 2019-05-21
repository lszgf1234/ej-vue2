import AppHeader from './components/app-header'
import Icon from './components/icon'
import InfoList from './components/info-list'

export {
  AppHeader,
  Icon,
  InfoList,
}

export default {
  install: Vue => {
    Vue.use(AppHeader)
    Vue.use(Icon)
    Vue.use(InfoList)
  },
}
