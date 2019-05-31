<template>
  <el-tag v-show="isShow" closable class="ej-conditions-tag" @close="close">
    <slot/>
    ：{{label}}
  </el-tag>
</template>

<script>
  import {Tag as ElTag} from 'element-ui'

  export default {
    name: 'EjConditionsTag',

    components: {
      ElTag,
    },

    props: {
      options: {
        type: Array,
        default: () => [],
      },
    },

    computed: {
      selectedList () {
        return this.filterSelected(this.options)
      },
      label () {
        return this.mapListString(this.selectedList, 'label', '、')
      },
      isShow () {
        return Boolean(this.selectedList.length)
      },
    },

    methods: {
      mapListString (list = [], key, tag = ',') {
        return list.map(item => {
          return item[key]
        }).join(tag)
      },

      filterSelected (list = []) {
        return list.filter(item => {
          return item.selected
        })
      },

      close () {
        this.selectedList.forEach(item => {
          item.selected = false
        })
      },
    },
  }
</script>

<style lang="scss">
  @import './variables.scss';

  .el-tag.ej-conditions-tag {
    @apply text-blue border-blue;

    height: $search-conditions-height;
    line-height: $search-conditions-height;
    font-size: 14px;
    background-color: transparent;
    border-radius: 8px;
    margin-right: 10px;
    margin-bottom: 5px;

    .el-icon-close {
      @apply .text-gray;

      &:hover {
        @apply .text-white;
      }
    }
  }
</style>
