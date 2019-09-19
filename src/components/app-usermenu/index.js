import UserMenu from './usermenu.vue'

export default {
  ...UserMenu,
  install: Vue => Vue.component(UserMenu.name, UserMenu),
}
