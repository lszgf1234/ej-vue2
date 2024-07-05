import NavBarEllipsis from './nav-bar-ellipsis.vue'

export default {
  ...NavBarEllipsis,
  install: Vue => Vue.component(NavBarEllipsis.name, NavBarEllipsis),
}
