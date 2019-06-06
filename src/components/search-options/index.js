import SearchOptions from './search-options.vue'

export default {
  ...SearchOptions,
  install: Vue => {
    Vue.component(SearchOptions.name, SearchOptions)

    // 对于用户可能用到的子组件，注册为异步组件
    Vue.component('EjSearchOptionList', () => import('./search-option-list.vue'))
    Vue.component('EjSearchOptionCascader', () => import('./search-option-cascader.vue'))
  },
}
