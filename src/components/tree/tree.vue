<template>
  <el-tree ref="tree"
           :class="[ 'ej-tree', `${collapseIcon}`, { 'line': treeAttrs['show-line'] === '' }, {'checkbox': treeAttrs['show-checkbox'] === ''} ]"
           :props="{ label: 'label', children: 'children' }"
           :expand-on-click-node="expandOnClickNode"
           :default-expanded-keys="defaultExpandedIds"
           node-key="id"
           v-bind="treeAttrs"
           v-on="treeListeners">
    <template #default="{ node, data }">
      <div :class="[ 'el-tree-node el-tree-menu', { 'is-leaf': node.isLeaf } ]">
        <!-- {{node.isLeaf}}{{node.expanded}} -->
        <!-- 自定义icon样式 -->
        <i v-if="data.iconClass" :class="[ 'el-tree-node__icon', data.iconClass ]"></i>
        
        <!-- ej-icon -->
        <ej-icon v-if="data.icon" :class="[ 'el-tree-node__icon']" :icon="data.icon"></ej-icon>
        
        <!-- label部分 -->
        <div class="el-tree-node__label">
            <slot :node="node" :data="data">
              <el-tooltip effect="dark" :content="`${data.label}`" placement="top" popper-class="tree-tooltip">
                <div>{{ data.label }}</div>
              </el-tooltip>
            </slot>
        </div>

        <!-- 更多操作 -->
        <div class="el-tree-node__more">
          <slot name="morePrefix" :node="node" :data="data"></slot>
          <el-dropdown v-if="showContextmenu"
                       trigger="click"
                       class="tree-dropdown">
            <div :class="['more-icon', { 'is-selected': dropMenuItem.id === data.id }]"
                 @click.stop="handleMoreClick(data)"/>
            <el-dropdown-menu slot="dropdown" ref="dropdown">
              <ej-tree-contextmenu v-for="(item, index) in contextmenu"
                                   :key="index"
                                   :menu="item"
                                   :level="0"
                                   :commands="commands"
                                   :commandTrigger="commandTrigger"
                                   @command="onCommand"
                                   @change="onChange"
                                   @commandTriggerChange="commandTriggerChange"></ej-tree-contextmenu>
            </el-dropdown-menu>
          </el-dropdown>
        </div>
      </div>
    </template>
  </el-tree>
</template>

<script>
  import {
    Tree as ElTree,
    Dropdown as ElDropdown,
    DropdownMenu as ElDropdownMenu,
    Tooltip as ElTooltip,
  } from 'element-ui'

  import EjTreeContextmenu from './contextmenu'
  import EjIcon from '../icon'

  export default {
    name: 'EjTree',

    components: {
      ElTree,
      ElDropdown,
      EjTreeContextmenu,
      ElDropdownMenu,
      ElTooltip,

      EjIcon,
    },

    props: {
      // 展开按钮类型
      collapseIcon: {
        type: String,
        default: 'caret',
      },

      // 默认展开的节点的 id 的数组
      defaultExpandedIds: {
        type: Array,
        default: () => ([]),
      },

      // 是否在点击节点的时候展开或者收缩节点， 默认值为 true，如果为 false 收缩节点。
      expandOnClickNode: {
        type: Boolean,
        default: false,
      },

      // 更多操作列表数据源
      contextmenu: {
        type: Array,
        default: () => ([]),
      },
    },

    computed: {
      commandsString () {
        return this.$commands.join('')
      },
      tree () {
        return this.$refs['tree']
      },
      showContextmenu () {
        return this.contextmenu.length > 0
      },
      treeListeners () {
        return Object.assign({}, this.$listeners, {
          'node-click': this.onNodeClick,
          'more-click': this.handleMoreClick,
          'command': this.onCommand,
        })
      },
      treeAttrs () {
        return Object.assign({}, this.$attrs, {
          'filter-node-method': (value, data) => this.$attrs.filter({value, data}),
        })
      },
    },

    data () {
      return {
        commandTrigger: 0,
        commands: [],
        keywords: null,
        currentNode: null,
        dropMenuItem: {},
        command: [],
      }
    },

    methods: {
      onChange ({index, command}) {
        this.commands.splice(index, this.commands.length - index, command)
      },
      onClearCommand () {
        this.commands = []
      },
      onNodeClick (data, node) {
        this.dropMenuItem = {}
        this.currentNode = data
        this.$emit('node-click', {data, node})
      },
      handleMoreClick (data) {
        this.onChange({index: 0, command: undefined})
        this.dropMenuItem = data
        this.$emit('more-click', {data})
      },
      onCommand () {
        this.$emit('command', {commands: Array.from(this.commands), data: this.dropMenuItem})
        this.onClearCommand()
      },
      setCurrentNode (node) {
        this.currentNode = node
        this.tree.setCurrentNode(node)
      },
      getCurrentTreeData () {
        return this.currentNode
      },
      commandTriggerChange (val) {
        this.commandTrigger = val
      },
    },
    watch: {
      commandTrigger (newVal) {
        if (this.commands.length) {
          this.onCommand()
        }
      },
    },
  }
</script>

<style lang="scss">
  $primary: #0C64EB;
  $text-second-color: #161616;
  $icon-width: 11px;
  $icon-height: 11px;
  $margin-right: 12px;
  $text-padding: 4px;
  $children-padding: 22px; // $icon-width + margin-right + text-padding
  $content-padding-left: 16px; // 12/2 + 10
  $leaf-line-left: -16px; // 12/2 + 10

  .ej-tree {
    @apply bg-white;

    &.classic {
      .el-tree-node {
        &__content {
          & > .el-tree-node__expand-icon {
            @apply bg-no-repeat bg-center bg-contain;

            margin-right: $margin-right;
            padding: 0;
            transform: none;
            transition: none;
            margin-left: 0;
            width: 12px;
            height: 12px;
            background-image: url('./stories/assets/extend.svg');

            &.expanded {
              background-image: url('./stories/assets/narrow.svg');
            }

            &.is-leaf {
              background-image: none;
            }

            &:before {
              content: ' ';
            }
          }
        }
      }
    }

    &.line {
      .el-tree-node {

        &__children {
          border-left: 1px dashed #bbb;

          >.el-tree-node {

            &:last-of-type {
              @apply relative;

              >.el-tree-node__content {
                >.el-tree-node {
                  &.is-leaf {
                    &::before {
                      height: calc(50% + 4px);
                    }
                  }
                }
              }
            }
          }
        }

        &.is-leaf {
          @apply relative;

          margin-left: $children-padding;

          &::before,
          &::after {
            @apply absolute;

            content: '';
            left: $leaf-line-left;
          }

          &:before { // |
            top: -4px;
            height: calc(100% + 8px);
            width: 0;
            border-left: 1px dashed #bbb;
          }

          &::after { // -
            top: 50%;
            height: 0;
            width: $margin-right;
            border-top: 1px dashed #bbb;
          }
        }
      }

      >.el-tree-node {
        >.el-tree-node__children {
          border-left: none;
        }
      }
    }

    &.caret {
      .el-tree-menu.is-leaf {
        margin-left: 2px;
      }
    }

    &.checkbox {
      .el-tree-node {
        &__children {
          border-left: none !important;
        }

        &__expand-icon {
          margin-left: 0;
          border: none;
          padding: 12px;
          display: inline-block !important;

          &.expanded {
            transform: rotate(90deg);
          }

          &:before,
          &::after {
            content: none !important;
            position: absolute;
          }

          &:not(.is-leaf) {
            &::before {
              height: auto;
              top: 50%;
              left: 50%;
              transform: translate3d(-50%, -50%, 0);
              background: none;
              // color: #999;
              color: $text-second-color;
              content: '\e791' !important;
            }

            &::after {
              content: none !important;
            }
          }
        }

        > .el-tree-node__children {
          margin-left: 16px;
          padding-left: 6px;
        }
      }
    }

    .el-tree-node {
      @apply flex-1 flex-row align-middle;

      font-size: 0;
      // margin: 4px 0;

      .ej-icon {
        width: $icon-width;
        height: $icon-height;
        margin: 0;
        padding: 0;
        margin-right: 8px;
        color: $primary;
        display: inline-block;
      }

      >.el-tree-node__children {
        // margin-left: $margin-right;
        margin-left: 6px;
      }

      &.is-current {
        >.el-tree-node {
          &__content {
            .el-tree-node__label {
              @apply text-gray-darkest;

              background-color: #d4e4ff;
            }
          }
        }
      }

      &:focus {
        &>.el-tree-node__content {
          @apply bg-transparent;
        }
      }

      &__content {
        @apply text-gray-darker flex-row flex-1 flex;

        line-height: 22px;
        height: auto;
        margin-top: 2px;
        margin-bottom: 2px;

        // 鼠标悬停样式
        &:hover {
          @apply bg-transparent;

          .el-tree-menu {
            background-color: #f5f7fa;
          }

          .more-icon {
            @apply visible;
          }
        }

        .el-tree-node__expand-icon {
          color: $text-second-color;

          &.is-leaf {
            display: none;
          }
        }
      }

      &__children {
        >.el-tree-node {

          >.el-tree-node {
            &__content {
              padding-left: $content-padding-left !important;
            }

            &__children {
              margin-left: $children-padding;
            }
          }
        }
      }

      &__icon {
        width: $icon-width;
        height: $icon-height;
        margin-right: 8px;
      }

      &__label {
        padding: 0 $text-padding;
        font-size: 14px;
        flex: 1;
      }

      // 更多按钮
      &__more {

        >div,
        >span {
          @apply inline-block align-middle;
          
          margin-left: 5px;
        }

        .more-icon {
          @apply bg-no-repeat bg-center invisible;

          width: 16px;
          height: 16px;
          background-image: url('./stories/assets/more.svg');
          background-color: #d4e4ff;
          border-radius: 2px;
          box-sizing: border-box;

          &.is-selected {
            @apply visible;
          }

          &:focus {
            outline: none;
          }
        }
      }
    }

    .el-tree-menu {
      @apply flex flex-row justify-between items-center;

      margin-top: 2px;
      margin-bottom: 2px;
      color: $text-second-color;

      &:hover {
        color: $primary;
      }
    }

    .el-checkbox {
      &__inner {
        &:hover {
          border-color: $primary;
        }
      }

      &__input {
        &.is-indeterminate,
        &.is-checked {
          .el-checkbox__inner {
            background-color: $primary;
            border-color: $primary;
          }
        }
      }
    }

    &:focus,
    *:focus {
      outline: none;
    }
  }

  .el-tooltip__popper {
    &.is-dark {
      background-color: #fff;
      color: #262626;
      box-shadow: -1px 1px 3px 1px rgba(0, 0, 0, 0.1), 1px 1px 3px 1px rgba(0, 0, 0, 0.1);

      &.tree-tooltip {
        margin-top: 5px;
        margin-bottom: 5px;
        padding: 4px 10px;

        .popper__arrow {
          display: none;
        }
      }
    }
  }
</style>
