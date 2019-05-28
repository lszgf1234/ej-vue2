<template>
  <dd class="ej-search-tag relative" ref="textWrapper">
    <span ref="textContent"
          :class="{'height-auto': showMore}"
          class="ej-search-tag__text-wraaper inline-flex flex-wrap overflow-hidden">
          <el-tag v-for="(item) in options"
                  :key="key(item)"
                  closable
                  @close="close(item)"
                  class="ej-search-tag__item text-blue border-blue">
                  {{text(item)}}
          </el-tag>
    </span>

    <span v-show="showMoreBtn"
          @click="showMore = !showMore"
          class="ej-conditions-item__more text-blue cursor-pointer">
          {{showMoreText}}
          <i class="el-icon-arrow-down"></i>
    </span>
  </dd>
</template>

<script>
  import {Tag as ElTag, Icon as ElIcon} from 'element-ui'
  export default {
    components: {
      ElTag,
      ElIcon,
    },

    data () {
      return {
        showMore: false,
        showMoreBtn: false,
      }
    },

    props: {
      options: {
        type: Array,
        default: () => ([]),
      }
    },

    computed: {
      showMoreText () {
        return this.showMore ? '收起' : '更多'
      }
    },

    methods: {
      close (item = {}) {
        this.$emit('close', item.pValue, item.value)
      },

      text (item = {}) {
        return `${item.pLabel}: ${item.label}`;
      },

      // 保证唯一
      key (item = {}) {
        return `'${item.pValue}''${item.value}'`;
      },

      isShowMoreBtn () {
        this.$nextTick(() => {
          // 减掉150的右内边距
          const textWrapper = this.$refs.textWrapper.offsetWidth - 150;
          const textContent = this.$refs.textContent.offsetWidth;

          // 判断长度超过父级
          this.showMoreBtn = textContent >= textWrapper
        })
      },
    },

    watch: {
      // 更新数据时重新计算
      options: {
        handler () {
          this.isShowMoreBtn()
        },
        deep: true,
        immediate: true,
      },
    }
  }
</script>

<style lang="scss">
  @import './variables.scss';
  $transition-duration: 300ms;

  .ej-search-tag {
    width: 100%;
    padding-right: 150px;

    &.h-auto {
      height: auto;
    }

    &__item {
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

    &__more {
      top: 0;
      right: 26px;
    }

    &__text-wraaper {
      max-height: $search-conditions-height;
      transition: max-height $transition-duration;
      overflow: hidden;

      &.height-auto {
        max-height: 300px;
      }
    }
  }
</style>
