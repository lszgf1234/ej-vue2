<template>
  <div :class="['collapses-toggle__btn', currentCollapse ? 'menu-expand' : 'menu-packup']" @click="handleToggle">
    <ej-icon :icon="currentCollapse ? 'menu-expand' : 'menu-packup'"/>
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
  $menu-layout--gray-darker: #262626;

  .collapses-toggle__btn {
    @apply absolute cursor-pointer;

    border-radius: 4px;
    top: 0;
    right: -20px;
    z-index: 2;

    .blue-color {
      color: $menu-layout--blue;
    }

    .ej-icon {
      width: 18px;
      height: 15px;
      color: $menu-layout--gray-darker;
    }
  }
</style>
