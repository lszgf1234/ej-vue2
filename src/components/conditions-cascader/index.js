import ConditionsCascader from '../search-conditions/conditions-cascader.vue'

export default {
  ...ConditionsCascader,
  install: Vue => Vue.component(ConditionsCascader.name, ConditionsCascader),
}
