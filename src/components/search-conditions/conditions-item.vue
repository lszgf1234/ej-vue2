<template>
  <conditions-List v-bind="$attrs" :change="value">
      <template v-for="item in options">
        <div :key="item.value"
             :class="{'text-blue': someSelected(selectedList, item.value)}"
             class="ej-conditions-item"
             @click="click(item.value)">
          {{item.label}}
        </div>
      </template>
  </conditions-List>
</template>

<script>
  import {Tag as ElTag} from 'element-ui'
  
  import ConditionsList from './conditions-list'

  export default {
    name: 'EjConditionsItem',

    components: {
      ElTag,
      ConditionsList,
    },

    props: {
      options: {
        type: Array,
        default: () => [],
      },
      value: {
        type: Array,
        default: () => [],
      },
    },

    computed: {
      selectedList () {
        return this.value.map(item => {
          return this.options.filter(citem => {
            return item === citem.value
          })[0]
        })
      },
    },

    methods: {
      click (key) {
        let value = this.value
        if (this.someSelected(this.selectedList, key)) {
          value.splice(value.indexOf(key), 1)
        } else {
          value.push(key)
        }
        // 修改v-model值
        this.$emit('input', value)
        this.emitLables()
      },
      someSelected (list, key) {
        return list.some(item => {
          return item && item.value === key 
        })
      },
      emitLables () {
        this.$emit('update:selected', this.selectedList)
      },
    },

    created () {
      this.emitLables()
    }
  }
</script>

<style lang="scss">
  @import './variables.scss';

  .ej-conditions-item {
    @apply cursor-pointer whitespace-no-wrap;

    margin-right: 30px;
  }
</style>
