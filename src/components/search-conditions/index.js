import SearchConditions from './search-conditions.vue'

export default {
  ...SearchConditions,
  install: Vue => Vue.component(SearchConditions.name, SearchConditions),
}
