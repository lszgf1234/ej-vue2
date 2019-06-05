import ConditionsItem from '../search-conditions/conditions-item.vue'

export default {
  ...ConditionsItem,
  install: Vue => Vue.component(ConditionsItem.name, ConditionsItem),
}
