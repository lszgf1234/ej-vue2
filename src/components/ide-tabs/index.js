import IdeTabs from './ide-tabs'

export default {
  ...IdeTabs,
  install: Vue => Vue.component(IdeTabs.name, IdeTabs),
}
