<template>
  <div class="ej-conditions-list">
    <span class="title">
      <slot name="title"></slot>
    </span>

    <div ref="listWrapper"
        :class="{'max-height-300': isShowMore}"
        class="ej-conditions-list__content">

      <div class="flex flex-wrap" ref="listContent">
        <slot name="content" :options="options"></slot>
      </div>

      <ej-conditions-more :isShow="isMoreBtn" @showMore="showMore"></ej-conditions-more>
    </div>

  </div>
</template>

<script>
  import EjConditionsMore from './conditions-more.vue'

  export default {
    name: 'EjConditionsList',

    components: {
      EjConditionsMore,
    },

    data () {
      return {
        isMoreBtn: false,
        isShowMore: false,
      }
    },

    props: {
      options: {
        type: Array,
        default: () => ([]),
      }
    },

    methods: {
      showMoreBtn () {
        this.$nextTick(() => {
          // 减掉150的右内边距
          const listWrapper = this.$refs.listWrapper.offsetWidth - 80;
          const listContent = this.$refs.listContent.offsetWidth;

          // 判断长度超过父级
          this.isMoreBtn = listContent >= listWrapper
        })
      },

      showMore (isShow) {
        this.isShowMore = isShow
      },
    },

    mounted () {
      this.showMoreBtn()
    },

    watch: {
      // 更新数据时重新计算
      options: {
        handler () {
          this.showMoreBtn()
        },
        deep: true,
        immediate: true,
      },
    }
  };
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
