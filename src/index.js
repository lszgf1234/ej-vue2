import AppHeader from './components/app-header'

export {
  AppHeader,
}

export default {
  install: Vue => {
    Vue.use(AppHeader)
  },
}