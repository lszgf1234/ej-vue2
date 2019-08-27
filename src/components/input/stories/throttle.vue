<template>
  <div class="w-1/2 ml-8">
    <ej-input v-model="model"
              :isThrottle="isThrottle"
              :throttleTime="throttleTime"
              @ej-change="throttleInput"/>
    <br>输入内容：{{ejModel}}
  </div>
</template>

<script>
  import {action} from '@storybook/addon-actions'
  import {boolean, number} from '@storybook/addon-knobs'

  export default {
    data () {
      return {
        model: '',
        ejModel: '',
      }
    },

    props: {
      isThrottle: {
        default: boolean('isThrottle', true),
      },

      throttleTime: {
        default: number('throttleTime', 1005),
      },
    },

    methods: {
      throttleInput (...args) {
        this.ejModel = args[0]
        action('节流')(...args)
      },
    },
  }
</script>
