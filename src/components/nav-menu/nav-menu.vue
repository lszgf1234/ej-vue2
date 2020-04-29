<script lang="jsx">
  import {Menu as ElMenu} from 'element-ui'

  export default {
    name: 'EjNavMenu',

    functional: true,

    render: (h, {parent, props, data, slots, children}) => {
      const { mode, collapse } = props

      const _mode = mode === 'horizontal'
      const _collapse = typeof(collapse) !== 'undefined'

      let collapsesSlot = slots().collapses
      // onClick={() => emit('on-collapse', collapse)}
      const collapsesComp = (
        collapsesSlot ? <div>{collapsesSlot}</div> :
        <div class="text-red">展开收起</div>
      )

      console.log("collapse", collapse)

      if (_mode) { // 水平导航模式，兼容老项目样式
        data.staticClass = (data.staticClass || '') + ' ej-nav-menu'
      }

      return (
            _mode ? <ElMenu {...data}>{children}</ElMenu> :
            <ElMenu {...data}>
              <div v-show={_collapse}>{collapsesComp}</div>
              {children}
            </ElMenu>
      )
    },
  }
</script>

<style lang="scss">
  .ej-nav-menu {

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
