import Usermenu from './usermenu.vue'

export default {
  ...Usermenu,
  install: Vue => Vue.component(Usermenu.name, Usermenu),
}
