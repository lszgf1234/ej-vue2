<template>
  <div class="loading-wrap bg-white inset-0 z-10 opacity-75"
       :class="[fullscreen ? 'fixed' : 'absolute']">
    <div class="flex items-center justify-center h-full">
      <div class="point point_one"></div>
      <div class="point point_two"></div>
      <div class="point point_three"></div>
    </div>
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
  .loading-wrap {
    .point {
      @apply w-5 h-5 mr-6 bg-black rounded-full;
    }

    .point_one {
      animation: point_one_animation 1.5s infinite;
    }

    .point_two {
      animation: point_two_animation 1.5s infinite;
      animation-delay: .25s;
    }

    .point_three {
      animation: point_three_animation 1.5s infinite;
      animation-delay: .5s;
    }
  }

  @keyframes point_one_animation {
    75% {
      transform: scale(0);
    }
  }

  @keyframes point_two_animation {
    75% {
      transform: scale(0);
    }
  }

  @keyframes point_three_animation {
    75% {
      transform: scale(0);
    }
  }
</style>
