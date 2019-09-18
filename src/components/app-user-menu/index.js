import UserMenu from './user-menu.vue'

export default {
  ...UserMenu,
  install: Vue => Vue.component(UserMenu.name, UserMenu),
}
