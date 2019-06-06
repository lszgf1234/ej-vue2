<template>
  <div class="ej-conditions-list">
    <span class="title">{{label}}</span>
    <div ref="listWrapper"
         class="ej-conditions-list__content"
         :class="{'max-height-300': isShowMore}">
      <div class="flex flex-wrap" ref="listContent">
        <slot/>
      </div>

      <ej-search-option-more :isShow="isMoreBtn" @showMore="showMore"/>
    </div>
  </div>
</template>

<script>
  import EjSearchOptionMore from './search-option-more'

  export default {
    name: 'EjSearchOptionItem',

    components: {
      EjSearchOptionMore,
    },

    props: {
      label: {
        type: String,
        default: '',
      },
      change: {
        type: Array,
        default: () => [],
      }
    },

    data () {
      return {
        isMoreBtn: false,
        isShowMore: false,
      }
    },

    watch: {
      // 更新数据时重新计算
      change: {
        deep: true,
        immediate: true,
        handler () {
          this.showMoreBtn()
        },
      },
    },

    mounted () {
      this.showMoreBtn()
    },

    methods: {
      showMoreBtn () {
        this.$nextTick(() => {
          // 减掉150的右内边距
          const listWrapper = this.$refs.listWrapper.offsetWidth - 80
          const listContent = this.$refs.listContent.offsetWidth

          // 判断长度超过父级
          this.isMoreBtn = listContent >= listWrapper
        })
      },

      showMore (isShow) {
        this.isShowMore = isShow
      },
    },
  }
</script>

<style lang="scss">
  @import './variables.scss';

  .ej-conditions-list {
    @apply flex;

    margin-bottom: 10px;

    &:last-child {
      margin-bottom: 0;
    }

    .title {
      @apply text-gray-darkest font-bold whitespace-no-wrap;

      height: $search-conditions-height;
      line-height: $search-conditions-height;
      margin-right: 20px;
    }

    &__content {
      @apply flex relative overflow-hidden;

      width: 100%;
      padding-right: 80px;
      max-height: $search-conditions-height;
      line-height: $search-conditions-height;
      transition: max-height $transition-duration;

      &.max-height-300 {
        max-height: 300px;
      }
    }
  }
</style>
