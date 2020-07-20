<script lang="jsx">
  import Vue from 'vue'
  import {Menu as ElMenu} from 'element-ui'
  import CollapsesButton from './collapses-btn'

  Vue.use(CollapsesButton)

  const _classNameVertical = {
    main: 'ej-nav-menu__vertical',
  }

  const _classNameHorizontal = {
    main: 'ej-nav-menu',
  }

  let _defaultMode = 'horizontal'

  export default {
    name: 'EjNavMenu',

    functional: true,

    render: (h, {parent, props, data, slots, children, listeners}) => {

      let { mode, collapse, toggleButton } = props

      if (!mode) {
        mode = _defaultMode
        console.warn(`EjNavMenu: 建议手动设置mode，否则会默认为 horizontal`)
      }

      const _mode = mode === _defaultMode
      const _collapse = typeof(collapse) !== 'undefined'
      const _toggleButton =  typeof(toggleButton) !== 'undefined' ? toggleButton : true

      const collapsesComp = (<CollapsesButton {...{props, on: listeners}}/>)

      const _staticClass = _mode ? _classNameHorizontal : _classNameVertical

      data.staticClass = (data.staticClass || '') + ` ${_staticClass.main}`

      return (
            _mode ?
            <ElMenu {...{...data, ...props}}>{children}</ElMenu>
            :
            <div class="ej-nav-menu__vertical--wapper">
              <div>
                <ElMenu {...{...data, ...props}}>
                  {children}
                </ElMenu>
              </div>
              <div class="collapse--wapper" vShow={_collapse && _toggleButton}>{collapsesComp}</div>
            </div>
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
  $menu-layout--size-16: 16px;

  @mixin ej-nav-menu__vertical--padding-class {
    padding-left: 24px !important;
    padding-right: 24px !important;
    margin-bottom: 4px;
    i:first-child {
      padding-right: 16px !important;
    }
  }
  @mixin ej-nav-menu__vertical--font-class ($active-bg-color:$menu-layout--blue, $active-font-color:$menu-layout--white) {
    @apply font-medium;
    font-size: $menu-layout--size-16;
    color: $menu-layout--gray-darker;
    background: transparent;
    height: 40px;
    line-height: 40px;

    .ej-icon {
      width: 18px;
      height: 18px;
    }
    &.is-active {
      color: $active-font-color;
      background: $active-bg-color;
      i {
        color: $active-font-color;
      }
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

  .ej-nav-menu {
    &__vertical {
      @apply z-10 relative h-full overflow-y-auto overflow-x-hidden;

      border-right: none !important;
      padding-top: 30px;
      box-shadow: 6px 0px 16px -8px rgba(0,0,0,0.2);

      .el {
        &-submenu__title, &-menu-item {
          i {
            color: $menu-layout--gray-darker;
          }
          @include ej-nav-menu__vertical--padding-class;
        }
        &-menu-item {
          @include ej-nav-menu__vertical--font-class;
        }
        &-submenu {
          &__title {
            @include ej-nav-menu__vertical--font-class;
            span + i {
              right: 24px;
            }
          }
          &.is-active {
            background: $menu-layout--gray-lighter;
          }
          .el-menu-item {
            color: $menu-layout--gray-darker;
            &.is-active {
              @apply text-white;
            }
            &:not(.is-active):hover {
              color: $menu-layout--blue;
              & > i {
                color: $menu-layout--blue;
              }
            }
          }
          &__icon-arrow {
            @apply text-base;
            color: $menu-layout--gray-dark;
            &::before {
              content: '';
              display: block;
              width: 18px;
              height: 18px;
              background: url('../../assets/icons/arrow-up.svg') no-repeat center;
            }
          }
          .el-menu--inline {
            li {
              padding-left: 60px !important;
            }
          }
        }
      }

      &:not(.el-menu--collapse) {
        width: 226px;
        .el {
          &-menu-item {
            @apply truncate;
          }
        }
      }

      &.el-menu--collapse {
        width: 68px;
        .el {
          &-submenu {
            &.is-active {
              background: $menu-layout--blue;
              .el-submenu__title i {
                @apply text-white;
              }
            }
            .el-menu-item {
              color: $menu-layout--gray-darker;
              &.is-active {
                @apply text-white;
              }
            }
          }
          &-menu-item:not(.is-active):hover {
            background: $menu-layout--gray-lighter;
            & > i {
              background: $menu-layout--gray-lighter;
            }
          }
        }
      }
    }

    &__vertical--wapper {
      @apply h-full flex overflow-y-auto overflow-x-hidden flex-col justify-between z-50;
      max-width: 220px;
      box-shadow: 6px 0px 16px -8px rgba(0,0,0,0.2);

      & > div {
        @apply overflow-hidden h-full;
      }

      .collapse--wapper {
        @apply bg-white z-50 border-t border-solid ;
        height: 54px;
        border-top-color: #C1C7CD;
        // box-shadow: 0 -3px 8px 0 rgba(0, 0, 0, 0.05);
      }
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

  .el-tooltip__popper {
    &.is-dark {
      background-color: $menu-layout--white;
      color: $menu-layout--gray-darker;
      box-shadow: -1px 1px 3px 1px rgba(0, 0, 0, 0.1), 1px 1px 3px 1px rgba(0, 0, 0, 0.1);
    }

    .popper__arrow,
    .popper__arrow::after {
      color: $menu-layout--white !important;
      border-right-color: $menu-layout--white !important;
    }
  }
</style>
