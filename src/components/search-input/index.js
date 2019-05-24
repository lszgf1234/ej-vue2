import searchInput from './search-input.vue'

export default {
  ...searchInput,
  install: Vue => Vue.component(searchInput.name, searchInput),
}
