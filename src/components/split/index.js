import Split from './index.vue'

export default {
  ...Split,
  install: Vue => Vue.component(Split.name, Split),
}
