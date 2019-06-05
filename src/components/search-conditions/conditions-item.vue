<template>
  <conditions-wrapper :label="label" :change="value">
      <div v-for="item in options"
           :key="item.value"
           :class="{'text-blue': someSelected(selectedList, item.value)}"
           class="ej-conditions-item"
           @click="click(item.value)">
        {{item.label}}
        <span v-if="item.num" class="text-black">
          (<em class="text-red not-italic">{{item.num}}</em>)
        </span>
      </div>
  </conditions-wrapper>
</template>

<script>
  import {Tag as ElTag} from 'element-ui'
  
  import ConditionsWrapper from './conditions-wrapper'

  export default {
    name: 'EjConditionsItem',

    components: {
      ElTag,
      ConditionsWrapper,
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
      label: {
        type: String,
        default: '',
      },
      keyName: {
        type: String,
        default: '',
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
        const key = this.keyName
        if (!key) return
        this.$parent.setOptions({
          value: key,
          label: this.label,
          children: this.selectedList,
        })
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
