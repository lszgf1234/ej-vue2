<script lang="jsx">
  import {Submenu as ElSubmenu} from 'element-ui'

  export default {
    name: 'EjNavSubmenu',

    functional: true,

    render: (h, {props, data, slots, children}) => {
      const { mode } = props
      if (!mode) {
        mode = 'horizontal'
        console.warn(`EjNavSubmenu: 建议手动设置mode，否则会默认为 horizontal`)
      }

      if (mode === 'vertical') {
        data.staticClass = (data.staticClass || '') + ' ej-nav-submenu__vertical'
        data.attrs['popper-class'] = (data.attrs['popper-class'] || '') + ' ej-nav-submenu__vertical-popper'
      } else {
        data.staticClass = (data.staticClass || '') + ' ej-nav-submenu'
        data.attrs['popper-class'] = (data.attrs['popper-class'] || '') + ' ej-nav-submenu-popper'
      }

      return (
        <ElSubmenu {...{...data, slots}}>{children}</ElSubmenu>
      )
    },
  }
</script>

<style lang="scss">
  $menu-layout--gray-darkest: #161616;
  $menu-layout--gray-darker: #262626;
  $menu-layout--gray-dark: #525252;
  $menu-layout--gray-lighter: #F4F4F4;
  $menu-layout--blue: #0C64EB;
  $menu-layout--blue-lighter: #D0E2FF;
  $menu-layout--white: #fff;
  $menu-layout--size-18: 18px;

  @mixin ej-nav-menu__vertical--font-class ($active-bg-color:$menu-layout--blue, $active-font-color:$menu-layout--white) {
    @apply font-medium;
    font-size: $menu-layout--size-18;
    color: $menu-layout--gray-darkest;
    background: transparent;

    .ej-icon {
      width: 20px;
      height: 20px;
    }
    &.is-active {
      color: $active-font-color;
      background: $active-bg-color;

      &:hover {
        &, & > i {
          color: $active-font-color;
        }
      }
    }
    &:hover {
      color: $menu-layout--blue;
      & > i {
        color: $menu-layout--blue;
      }
    }
  }

  .ej-nav-submenu__vertical-popper {
    .el-menu--popup {
      .el-menu-item {
        @include ej-nav-menu__vertical--font-class($menu-layout--blue-lighter, $menu-layout--blue);

        height: 40px;
        line-height: 40px;
      }
    }
  }

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
