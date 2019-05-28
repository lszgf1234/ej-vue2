<template>
  <div class="ej-loading inset-0 z-10 flex justify-center items-center" :class="[fullscreen ? 'fixed' : 'absolute']">
    <div class="point"></div>
    <div class="point"></div>
    <div class="point"></div>
  </div>
</template>

<script>
  export default {
    name: 'CommonLoading',

    data () {
      return {
        fullscreen: false,
      }
    },
  }
</script>

<style lang="scss">
  .ej-loading {
    background-color: rgba(255,255,255,.75);

    .point {
      @apply rounded-sm;

      width: 16px;
      height: 16px;
      margin-left: 5px;
      background-color: #000;
      box-shadow: 0 0 5px #999;
      animation: ej-loading 800ms infinite;

      &:first-child {
        margin-left: 0;
      }

      &:nth-child(2) {
        animation-delay: .2s;
      }

      &:nth-child(3) {
        animation-delay: .4s;
      }
    }
  }

  @keyframes ej-loading {
    0%, 75%, 100% {
      background-color: #000;
    }

    25% {
      background-color: theme('colors.blue.default');
    }
  }
</style>
