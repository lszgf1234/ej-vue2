import SearchConditions from './search-conditions.vue'
import ConditionsList from './conditions-list.vue'
import ConditionsItem from './conditions-item.vue'
import ConditionsTag from './conditions-tag.vue'
import ConditionsCascader from './conditions-cascader.vue'

export default {
  ...SearchConditions,
  install: (Vue) => { 
    Vue.component(SearchConditions.name, SearchConditions)
    Vue.component(ConditionsList.name, ConditionsList)
    Vue.component(ConditionsItem.name, ConditionsItem)
    Vue.component(ConditionsTag.name, ConditionsTag)
    Vue.component(ConditionsCascader.name, ConditionsCascader)
  },
}
