import ScreenAdapter from './screen-adapter.vue'

export default {
  ...ScreenAdapter,
  install: Vue => Vue.component(ScreenAdapter.name, ScreenAdapter),
}
