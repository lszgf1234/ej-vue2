<template>
  <conditions-wrapper label="已选条件" v-show="isShow" :change="options">
    <el-tag v-for="(item, index) in options"
            v-show="item.children && item.children.length"
            :key="item.value"
            closable
            class="ej-conditions-tag"
            @close="close(index, item)">
      {{item.label}}：{{mapListString(item.children, 'label', '、', item)}}
    </el-tag>
  </conditions-wrapper>
</template>

<script>
  import {Tag as ElTag} from 'element-ui'

  import ConditionsWrapper from './conditions-wrapper'

  export default {
    name: 'EjConditionsTag',

    components: {
      ElTag,
      ConditionsWrapper,
    },

    props: {
      options: {
        type: Array,
        default: () => [],
      },
    },

    computed: {
      isShow () {
        return Boolean(this.options.length)
      },
    },

    methods: {
      mapListString (list = [], key, tag = ',', item) {
        return list.map(item => {
          return item ? item[key] : ''
        }).join(tag)
      },

      close (index, item) {
        this.$emit('close', index, {
          value: item.value,
          label: item.label,
          children: [],
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
