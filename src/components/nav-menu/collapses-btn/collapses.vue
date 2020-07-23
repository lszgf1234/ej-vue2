<template>
  <div :class="['collapses-toggle__btn', currentCollapse ? 'w-60 b-r-0' : 'w-300']" @click="handleToggle">
    <div class="wapper">
      <ej-icon :icon="currentCollapse ? 'double-right' : 'double-left'"/>
      <span v-if="!currentCollapse">收起侧边栏</span>
    </div>
  </div>
</template>

<script>
  import EjIcon from '../../icon'

  export default {
    name: 'CollapsesButton',

    components: {
      EjIcon,
    },

    props: {
      collapse: {
        type: Boolean,
        default: false,
      }
    },

    data () {
      return {
        currentCollapse: this.collapse,
      }
    },

    methods: {
      handleToggle () {
        this.currentCollapse = !this.currentCollapse
        this.$emit('current-collapses', this.currentCollapse)
      },
    }
  }
</script>

<style lang="scss">
  $menu-layout--blue: #0C64EB;
  $menu-layout--gray-dark: #525252;
  $menu-layout--gray-darker: #262626;
  $menu-layout--gray-light: #909399;
  $menu-layout--gray-lighter: #e6e6e6;

  .collapses-toggle__btn {
    @apply py-3 bg-white overflow-hidden z-50 cursor-pointer;

    transition: .3s ease-in-out;
    padding-left: 24px;

    &.w-60 {
      width: 60px;
    }
    &.w-300 {
      width: 220px;
    }
    &.b-r-0 {
      border-right-color: transparent;
    }

    .wapper {
      @apply flex;
      min-width: 200px;
    }

    .ej-icon {
      color: $menu-layout--gray-darker;
      width: 14px;
    }

    span {
      @apply text-lg ml-3;
      color: $menu-layout--gray-dark;
    }
  }
</style>
