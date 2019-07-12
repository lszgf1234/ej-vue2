<script lang="jsx">
  import {Menu as ElMenu} from 'element-ui'

  export default {
    name: 'EjNavMenu',

    functional: true,

    render: (h, {data, children}) => {
      data.staticClass = (data.staticClass || '') + ' ej-nav-menu'

      return <ElMenu {...data}>{children}</ElMenu>
    },
  }
</script>

<style lang="scss">
  .ej-nav-menu {
    &.el-menu {
      background: unset;

      &.el-menu--horizontal {
        @apply border-b-0 flex;

        > * {
          margin-left: 50px;
          opacity: .65;

          &:first-child {
            margin-left: 0;
          }

          &:hover,
          &.is-opened,
          &.is-active {
            opacity: 1;
          }
        }

        > .el-menu-item,
        > .el-submenu .el-submenu__title {
          @apply p-0 border-b-0;

          height: unset;
          line-height: unset;

          &:hover,
          &:focus {
            background: unset;
          }
        }

        > .el-menu-item {
          &.is-active {
            @apply border-0;
          }
        }

        > .el-submenu {
          .el-submenu__title {
          }
        }
      }
    }
  }
</style>
