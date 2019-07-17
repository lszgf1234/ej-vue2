import SearchItem from '../search-options/search-option-item.vue'

export default {
  ...SearchItem,
  install: Vue => Vue.component(SearchItem.name, SearchItem),
}
