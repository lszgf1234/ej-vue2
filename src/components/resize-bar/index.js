import ResizeBar from './resize-bar.vue'

export default {
  ...ResizeBar,
  install: Vue => Vue.component(ResizeBar.name, ResizeBar),
}
