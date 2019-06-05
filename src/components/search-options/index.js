import SearchOptions from './search-options.vue'

export default {
  ...SearchOptions,
  install: Vue => Vue.component(SearchOptions.name, SearchOptions),
}
