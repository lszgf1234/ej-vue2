<template>
  <div :class="['collapses-toggle__btn', currentCollapse ? 'menu-expand' : 'menu-packup']" @click="handleToggle">
    <!-- <i class="el-icon-s-fold text-lg text-white"></i> -->
    <ej-icon :icon="currentCollapse ? 'menu-expand' : 'menu-packup'" class="text-blue"/>
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
  .collapses-toggle__btn {
    @apply absolute cursor-pointer;

    border-radius: 4px;
    box-shadow: 0px 0px 4px 0px rgba(0,0,0,0.2);

    &.menu-expand {
      top: 0;
      right: -25px;
      z-index: 2;
      border-radius: 0 4px 4px 0;
    }

    &.menu-packup {
      top: 14px;
      right: 5px;
      z-index: 2;
    }
  }
</style>
