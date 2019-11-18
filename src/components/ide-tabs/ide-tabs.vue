<template>
  <div class="ej-ide-tabs-view clearfix">
    <span class="float-left">
      <slot name="tabbar-left"></slot>
    </span>
    <span class="float-right">
      <slot name="tabbar-right"></slot>
    </span>
    <ul>
      <li v-for="(it, idx) of tabs" :key="idx" class="inline-block">
        <slot :tab="it" :idx="idx">
          <div @click="changeTab(idx)" :class="{active: idx === number}"
               class="ide-tab-item flex items-center cursor-pointer">
            <span class="text-sm single name">{{it.name}}</span>
            <a v-if="closable(it.closable)"
               href="javascript:"
               @click.stop="remove(it, idx)"
               class="my-icon-wrap">
              <ej-icon icon="close" class="my-icon"/>
            </a>
          </div>
        </slot>
      </li>
    </ul>
  </div>
</template>

<script>
  import {MessageBox} from 'element-ui'
  import Icon from '../icon'

  export default {
    name: 'EjTabbedWorkspace',

    components: {
      [Icon.name]: Icon,
    },

    model: {
      prop: 'number',
      event: 'update:number',
    },

    props: {
      tabs: {
        type: Array,
        default: () => {
        },
      },

      number: {
        type: Number,
        default: 0,
      },
    },

    methods: {
      remove (it, idx) {
        MessageBox.confirm('确认关闭窗口?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning',
        }).then(() => {
          this.$emit('close-tab', it, idx)
        })
      },

      closable (val) {
        return val === undefined ? true : val
      },

      changeTab (idx) {
        this.$emit('update:number', idx)
        this.$emit('change-tab', idx)
      },
    },
  }
</script>

<style lang="scss">
  .ej-ide-tabs-view {
    .ide-tab-item {
      @apply bg-gray-light;
      padding: 4px 16px;
      border: 1px solid theme('colors.gray.default');
      border-top-left-radius: 4px;
      border-top-right-radius: 4px;
      position: relative;
      margin-right: -1px;

      &.active {
        @apply bg-white text-blue;
        z-index: 10;
      }

      .name {
        max-width: 300px;
      }
    }

    .my-icon-wrap {
      margin-left: 12px;
    }

    .my-icon {
      width: 8px;
      height: 8px;

      &:hover {
        color: lighten(#477de9, 20%);
      }
    }

    .icon-left {
      width: 12px;
      height: 12px;
    }
  }
</style>
<style lang="scss">
  .single {
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
  }
</style>
