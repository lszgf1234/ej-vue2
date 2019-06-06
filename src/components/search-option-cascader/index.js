import SearchCascader from '../search-options/search-option-cascader.vue'

export default {
  ...SearchCascader,
  install: Vue => Vue.component(SearchCascader.name, SearchCascader),
}
