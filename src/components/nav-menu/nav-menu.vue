<script lang="jsx">
  import Vue from 'vue'
  import {Menu as ElMenu} from 'element-ui'
  import CollapsesButton from './collapses-btn'

  Vue.use(CollapsesButton)

  export default {
    name: 'EjNavMenu',

    functional: true,

    render: (h, {parent, props, data, slots, children, listeners}) => {
      const { mode, collapse, toggleButton } = props

      if (!mode) {
        mode = 'horizontal'
        console.warn(`EjNavMenu: 建议手动设置mode，否则会默认为 horizontal`)
      }

      const _mode = mode === 'horizontal'
      const _collapse = typeof(collapse) !== 'undefined'
      const _toggleButton =  typeof(toggleButton) !== 'undefined' ? toggleButton : true

      const collapsesComp = (<CollapsesButton {...{props, on: listeners}}/>)

      if (_mode) { // 水平导航模式，兼容老项目样式
        data.staticClass = (data.staticClass || '') + ' ej-nav-menu'
      } else {
        data.staticClass = (data.staticClass || '') + ' ej-nav-menu__vertical'
      }

      return (
            _mode ?
            <ElMenu {...data}>{children}</ElMenu>
            :
            <ElMenu {...data}>
              <div v-show={_collapse && _toggleButton}>{collapsesComp}</div>
              {children}
            </ElMenu>
      )
    },
  }
</script>

<style lang="scss">
  .ej-nav-menu {
    &__vertical {
      @apply relative;

      padding-top: 26px;
    }

    &.el-menu {
      background: #1F2E4D;

      &.el-menu--horizontal {
        @apply border-b-0 flex;

        > * {
          margin-left: 50px;
          opacity: .65;
          padding: 0 12px;

          &:first-child {
            margin-left: 0;
          }

          &:hover,
          &.is-opened,
          &.is-active {
            opacity: 1;
          }
          &.is-active {
            background: rgba(255, 255, 255, .1) !important;
          }
        }

        > .el-menu-item,
        > .el-submenu .el-submenu__title {
          @apply p-0 border-b-0;

          height: inherit;
          font-size: 16px;
          line-height: inherit;

          &:hover,
          &:focus {
            background: transparent;
          }
        }

        > .el-menu-item {
          padding: 0 12px;

          &.is-active {
            @apply border-0;
            background: rgba(255, 255, 255, .1) !important;
          }
        }

        > .el-submenu {
          .el-submenu__title {
          }
        }
      }
    }

    @at-root .ej-app-logo + & {
      margin-left: 172px;
    }
  }
</style>
