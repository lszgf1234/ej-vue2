<template>
  <ej-search-option-item v-show="isShow" :show-more="showMore" :change="options" label="已选条件">
    <el-tag v-for="(item, index) in options"
            :key="index"
            v-show="item.children && item.children.length"
            :title="`${item.label}：${mapListString(item.children, 'label', '、')}`"
            closable
            class="ej-conditions-tag"
            :style="style"
            @close="close(index, item)">
      {{`${item.label}：${mapListString(item.children, 'label', '、')}`}}
    </el-tag>
  </ej-search-option-item>
</template>

<script>
  import {Tag as ElTag} from 'element-ui'

  import EjSearchOptionItem from './search-option-item.vue'

  export default {
    name: 'EjSearchOptionTag',

    components: {
      ElTag,
      EjSearchOptionItem,
    },

    props: {
      showMore: Boolean,
      options: {
        type: Array,
        default: () => [],
      },
      maxWidth: {
        type: String,
        default: '',
      },
    },

    computed: {
      isShow () {
        return this.options.some(item => item.children && item.children.length)
      },
      style () {
        return {
          maxWidth: this.maxWidth,
        }
      },
    },

    methods: {
      mapListString (list = [], key, tag = ',') {
        return list.map(item => {
          return item ? item[key] : ''
        }).join(tag)
      },

      close (index, item) {
        this.$emit('close', index, {
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
    max-width: 100%;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;

    .el-icon-close {
      @apply .text-gray;

      &:hover {
        @apply .text-white;
      }
    }
  }
</style>
