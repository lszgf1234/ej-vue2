<template>
  <div class="ej-search-option-tag">
    <ej-search-option-item v-show="isShow" :show-more="showMore" :change="options" label="已选条件">
      <div v-for="(item, index) in options" :key="index" class="ej-conditions-tag">
        <el-tag v-show="item.children && item.children.length"
                :title="`${item.label}：${mapListString(item.children, 'label', '、')}`"
                closable
                :style="style"
                @close="close(index, item)">
          {{`${item.label}：${mapListString(item.children, 'label', '、')}`}}
        </el-tag>
      </div>
    </ej-search-option-item>
  </div>
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

  .ej-search-option-tag {
    .ej-conditions-list .title {
      padding-top: 5px;
    }

    .ej-conditions-tag {
      @apply relative;
      padding-top: 5px;
      max-width: 100%;

      .el-tag {
        @apply text-gray-darkest;

        height: $search-conditions-height;
        line-height: $search-conditions-height;
        font-size: 14px;
        border: none;
        border-radius: 9px;
        margin-right: 10px;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
        background-color: theme('colors.blue.lighter');

        .el-icon-close {
          @apply text-blue border-blue absolute;

          font-size: 14px;
          background-color: white;
          border-style: solid;
          border-width: 1px;
          right: 5px;
          top: 0px;
          transform: scale(0.8);

          &:hover {
            @apply text-blue;
            background-color: white;
          }
        }
      }
    }
  }
</style>
