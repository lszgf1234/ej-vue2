<template>
  <div class="ej-search-conditions">
    <dl v-show="searchLen" class="ej-search-conditions__item flex">
      <dt class="ej-search-conditions__title text-gray-darkest">已选条件</dt>
      <search-tag :options="searchList" @close="toggleActive"/>
    </dl>

    <dl v-for="(item, index) in conditionsList"
        :key="index"
        class="ej-search-conditions__item flex">
      <dt class="ej-search-conditions__title text-gray-darkest">{{item.label}}</dt>

      <component  v-if="item.isTemplate"
                  :is="item.isTemplate"
                  v-model="item.model"
                  :options="item.valueList"
                  :conditions-key="item.value"
                  @cascaderChange="cascaderChange"
                  @toggle="toggleActive"
      />
    </dl>
  </div>
</template>

<script>
  import SearchTag from './search-tag'
  import CascaderItem from './cascader-item'
  import ConditionsItem from './conditions-item'

  export default {
    name: 'EjSearchConditions',

    components: {
      SearchTag,
    },

    data () {
      return {
        conditionsList: [],
      }
    },

    props: {
      options: {
        type: Array,
        default: () => ([])
      },
      cascaderKeys: {
        type: Array,
        default: () => ([])
      },
    },

    computed: {
      // 搜索列表
      searchList () {
        let arr = [];
        this.conditionsList.forEach(item => {
          // model 默认为单选
          if (item.model && item.model.length) {
            arr.push({
              pValue: item.value,
              pLabel: item.label,
              value: item.model.join(','),
              label: item.labels.join('/ ')
            })
          } else {
            // 查找选中的条件
            arr.push(...item.valueList.filter(citem => {
                return citem.active === true
              }).map(citem => {
                // 增加父级信息
                return Object.assign(citem, {
                  pValue: item.value,
                  pLabel: item.label,
                })
              })
            )
          }
        })
        return arr
      },

      searchLen () {
        return this.searchList.length
      }
    },

    methods: {
      // 处理父级传下来的参数
      handlerOptions (options = []) {
        this.conditionsList =  options.map(item => {
          return Object.assign(item, {
            // CascaderItem 联级选择器
            // ConditionsItem 默认
            isTemplate: this.cascaderKeys.indexOf(item.value) !== -1 ? CascaderItem : ConditionsItem
          })
        })
        
      },
      // 联级选择器
      cascaderChange (conditionsKey, val, labels) {
        let cascaderOptions = this.findConditionItem(this.conditionsList, conditionsKey)
        cascaderOptions.model = val;
        cascaderOptions.labels = labels;
      },
      
      // 切换选中状态
      toggleActive (conditionsKey, itemKey) {
        let itemList = this.findConditionItem(this.conditionsList, conditionsKey)
        // model 取消事件 置空
        if (itemList.model && itemList.model.length) {
          this.$set(itemList, 'model', [])
          this.$set(itemList, 'labels', [])
        }
        // 切换状态
        let itemObj = this.findConditionItem(itemList.valueList, itemKey)
        if (itemObj) {
          this.$set(itemObj, 'active', !itemObj.active)
        }
      },

      // 根据key寻找item
      findConditionItem (list = [], key) {
        return list.find(item => {
          return item.value === key
        })
      },
    },

    watch: {
      options: {
        handler (newVal) {
          this.handlerOptions(newVal)
        },
        deep: true,
        immediate: true
      },

      searchList (newVal) {
        this.$emit('change', newVal)
      }
    }
  }
</script>

<style lang="scss">
  @import './variables.scss';
  .ej-search-conditions {
    &__title {
      white-space: nowrap;
      line-height: $search-conditions-height;
      margin-right: $search-conditions-height;
    }

    &__item {
      margin-bottom: 10px;
    }
  }
</style>
