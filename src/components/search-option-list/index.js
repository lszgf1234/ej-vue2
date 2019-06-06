import SearchList from '../search-options/search-option-list.vue'

export default {
  ...SearchList,
  install: Vue => Vue.component(SearchList.name, SearchList),
}
