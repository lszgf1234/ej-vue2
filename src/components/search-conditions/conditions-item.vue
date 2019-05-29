<template>
  <dd class="ej-conditions-item relative" ref="textWrapper">
    <span ref="textContent"
          :class="{'height-auto': showMore}"
          class="ej-conditions-item__text-wraaper inline-flex flex-wrap overflow-hidden">
          <div v-for="(item, index) in options"
              :key="index"
              :class="{'active': item.active}"
              @click="click(item.value)"
              class="item-block cursor-pointer whitespace-no-wrap">
              {{item.label}}
          </div>
    </span>

    <span v-show="showMoreBtn"
          @click="showMore = !showMore"
          class="ej-conditions-item__more text-blue cursor-pointer">
          {{showMoreText}}
          <i :class="showMoreClass" class="el-icon-arrow-down"/>
    </span>
  </dd>
</template>

<script>
  import {Icon as ElIcon} from 'element-ui'
  export default {
    name: 'EjConditionsItem',

    components: {
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
      },
      conditionsKey: {
        type: String,
        default: '',
      },
    },

    computed: {
      showMoreText () {
        return this.showMore ? '收起' : '更多'
      },
      showMoreClass () {
        return this.showMore ? 'up-active' : ''
      },
    },

    methods: {
      click (itemkey) {
        this.$emit('toggle', this.conditionsKey, itemkey)
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
  };
</script>

<style lang="scss">
  @import './variables.scss';
  $transition-duration: 300ms;

  .ej-conditions-item {
    width: 100%;
    padding-right: 150px;
    line-height: $search-conditions-height;

    .item-block {
      margin-right: 30px;

      &.active {
        @apply text-blue;
      }
    }

    .ej-conditions-item__more {
      @apply absolute;
      top: 0;
      right: 26px;

      .el-icon-arrow-down {
        transition: transform $transition-duration;
        
        &.up-active {
          transform: rotateZ(180deg);
        }
      }
    }

    .ej-conditions-item__text-wraaper {
      max-height: $search-conditions-height;
      transition: max-height $transition-duration;
      overflow: hidden;

      &.height-auto {
        max-height: 300px;
      }
    }
  }
</style>

