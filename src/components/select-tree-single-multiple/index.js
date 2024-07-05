import SelectTreeSingleMultiple from './select-tree-single-multiple.vue'

export default {
  ...SelectTreeSingleMultiple,
  install: Vue => Vue.component(SelectTreeSingleMultiple.name, SelectTreeSingleMultiple),
}
