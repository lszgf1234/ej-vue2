<template>
  <ej-icon :icon="icon" :style="style"></ej-icon>
</template>

<script>
  import {color, text} from '@storybook/addon-knobs'

  export default {
    props: {
      icon: {
        default: text('Icon', 'star', 'Props'),
      },
      color: {
        default: color('Color', '#f0f', 'Preview'),
      },
    },

    computed: {
      style () {
        return {
          color: this.color,
        }
      },
    },
  }
</script>
