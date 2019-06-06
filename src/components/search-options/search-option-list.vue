<template>
  <ej-search-option-item :label="label" :change="value">
    <div v-for="item in options"
         :key="item.value"
         class="ej-conditions-item"
         :class="{'text-blue': someSelected(selectedList, item.value)}"
         @click="click(item.value)">
      {{item.label}}
      <span v-if="item.num" class="text-black">
        (<em class="text-red not-italic">{{item.num}}</em>)
      </span>
    </div>
  </ej-search-option-item>
</template>

<script>
  import {Tag as ElTag} from 'element-ui'

  import EjSearchOptionItem from './search-option-item'

  export default {
    name: 'EjSearchOptionList',

    components: {
      ElTag,
      EjSearchOptionItem,
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
    },

    computed: {
      index () {
        return this.$parent.$children.findIndex(item => item === this)
      },
      selectedList () {
        return this.value.map(item => {
          return this.options.filter(citem => {
            return item === citem.value
          })[0]
        })
      },
    },

    created () {
      this.emitLables()
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
        const index = this.index
        this.$parent.setOptions(index, {
          label: this.label,
          children: this.selectedList,
        })
      },
    },
  }
</script>

<style lang="scss">
  @import './variables.scss';

  .ej-conditions-item {
    @apply cursor-pointer whitespace-no-wrap;

    margin-right: 30px;
  }
</style>
