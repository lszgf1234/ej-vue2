import SearchSetName from './search-set-name.vue'

export default {
  ...SearchSetName,
  install: Vue => Vue.component(SearchSetName.name, SearchSetName),
}
