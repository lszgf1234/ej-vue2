<template>
  <div class="ej-tabbed-workspace clearfix">
    <div class="tabbed-workspace-tabs">
      <span class="float-left fixed-height">
      <slot name="tabbar-left"/>
    </span>
      <span class="float-right fixed-height">
      <slot name="tabbar-right"/>
    </span>
      <ul class="clearfix">
        <li v-for="(it, idx) of tabs" :key="idx" class="float-left fixed-height">
          <div
            class="ide-tab-item flex items-center cursor-default"
            :class="{active: idx === activeIdx}"
            @click="changeTab(it, idx)"
            @dblclick="rename(it, idx, $event)">
            <img v-if="it.icon" :src="it.icon" class="icon-left mr-2">
            <a v-show="!inputs[idx]" class="text-sm truncate name">{{it.name}}</a>
            <input ref="input"
                   type="text"
                   v-show="inputs[idx]"
                   v-model="item.name"
                   class="name rename text-gray-darkest"
                   :style="{width: width}"
                   @keyup.enter="renameSure"
                   @blur="renameSure">
            <span
              v-if="closable(it.closable)"
              class="my-icon-wrap"
              @click.stop="remove(it, idx)">
            <ej-icon icon="close" class="my-icon"/>
          </span>
          </div>
        </li>
        <li v-if="hasCreate" @click="create" class="float-left fixed-height inline-flex items-center px-1 text-blue btn-create">
          <ej-icon icon="plus" class="icon-plus"></ej-icon>
        </li>
      </ul>
    </div>
    <div class="tabbed-workspace-content">
      <slot :tab="tabs[activeIdx]" :idx="activeIdx"/>
    </div>
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
      prop: 'activeIdx',
      event: 'update:activeIdx',
    },

    props: {
      tabs: {
        type: Array,
        default: () => [],
      },

      activeIdx: {
        type: Number,
        default: 0,
      },

      hasCreate: {
        type: Boolean,
        default: false,
      },
    },

    data () {
      return {
        inputActive: -1,
        inputs: [],
        item: {},
        width: 0,
        timer: null,
      }
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

      changeTab (it, idx) {
        const clearT = () => {
          clearTimeout(this.timer)
          this.timer = null
        }

        if (this.timer) {
          clearT()
        } else {
          this.timer = setTimeout(() => {
            clearT()
            this.$emit('update:activeIdx', idx)
            this.$emit('change-tab', it, idx)
          }, 200)
        }
      },

      rename (it, idx, e) {
        // 切换到
        this.changeTab(it, idx)

        this.item = Object.assign({}, it)
        this.inputActive = idx
        this.width = `${e.currentTarget.querySelector('a').offsetWidth}px`
        this.$set(this.inputs, this.inputActive, true)
        this.$nextTick(() => {
          this.$refs.input[this.inputActive].focus()
        })
      },

      renameCancel () {
        this.$set(this.inputs, this.inputActive, false)
      },

      renameSure () {
        this.$emit('rename-tab', this.item, this.inputActive)
        this.renameCancel()
      },

      create () {
        let idx = this.tabs.length
        this.$emit('create')
        if (this.tabs.length - 1 === idx) {
          this.$set(this.inputs, idx, true)
          this.inputActive = idx
          this.$nextTick(() => {
            this.$refs.input[idx].focus()
          })
        }
      },
    },
  }
</script>

<style lang="scss">
  .ej-tabbed-workspace {
    .ide-tab-item {
      @apply bg-gray-light px-4 border border-solid border-gray relative rounded-tl rounded-tr;
      margin-right: -1px;

      &.active {
        @apply bg-white text-blue;

        z-index: 10;
      }

      .name {
        @apply py-1 border-0 text-sm;

        max-width: 300px;
        min-width: 80px;
        height: 26px;
      }

      .rename {
        &:focus {
          outline: none;
        }
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

    .fixed-height {
      height: 28px;
    }

    .icon-plus {
      width: 12px;
      height: 12px;
    }

    .btn-create {
      &:hover {
        @apply text-blue-light;
      }
    }
  }
</style>
