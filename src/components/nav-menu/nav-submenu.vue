<script lang="jsx">
  import {Submenu as ElSubmenu} from 'element-ui'

  export default {
    name: 'EjNavSubmenu',

    functional: true,

    render: (h, {props, data, slots, children}) => {
      const { mode } = props

      if (mode === 'horizontal') {
        data.staticClass = (data.staticClass || '') + ' ej-nav-submenu'
        data.attrs['popper-class'] = (data.attrs['popper-class'] || '') + ' ej-nav-submenu-popper'
      } else {
        data.staticClass = (data.staticClass || '')
        data.attrs['popper-class'] = (data.attrs['popper-class'] || '')
      }

      return (
        <ElSubmenu {...{...data, slots}}>{children}</ElSubmenu>
      )
    },
  }
</script>

<style lang="scss">
  // .ej-nav-submenu {
  //   .el-submenu__icon-arrow {
  //     @apply hidden;
  //   }
  // }

  .ej-nav-submenu-popper {
    .el-menu--popup {
      background: #1F2E4D;

      .el-menu-item,
      .el-submenu,
      .el-submenu__title {
        background: transparent !important;
        color: rgba(255, 255, 255, .65) !important;

        &:hover {
          @apply text-white #{!important};
        }
      }

      .el-menu-item,
      .el-submenu {
        &:hover {

        }

        &.is-active {
          @apply text-white #{!important};
          background: theme('colors.blue.default') !important;
          > .el-submenu__title {
            @apply text-white #{!important};
            background: theme('colors.blue.default') !important;
          }
        }

        &.is-opened {
          > .el-submenu__title {
            @apply text-white #{!important};
          }
        }
      }
    }
  }
</style>
