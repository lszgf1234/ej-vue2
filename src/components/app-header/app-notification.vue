<template>
  <a href="javascript:" class="ej-app-notification flex items-center">
    <ej-icon icon="bell" class="ej-app-notification__button"/>
  </a>
</template>

<script>
  import EjIcon from '../icon'

  export default {
    name: 'EjAppNotification',

    components: {
      EjIcon,
    },
  }
</script>

<style lang="scss">
  @import './variables.scss';

  .ej-app-notification {
    &__button {
      width: $tray-icon-size;
      height: $tray-icon-size;
    }
  }
</style>
