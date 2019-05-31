<template>
  <div class="ej-conditions-item" :class="{'text-blue': selected}" @click="click">
    <slot></slot>
  </div>
</template>

<script>
  import {Tag as ElTag} from 'element-ui'
  export default {
    name: 'EjConditionsItem',

    components: {
      ElTag,
    },

    props: {
      selected: {
        type: Boolean,
        default: false,
      }
    },

    methods: {
      click () {
        this.$emit('update:selected', !this.selected)
      },
    },
  }
</script>

<style lang="scss">
  @import './variables.scss';

  .ej-conditions-item {
    @apply cursor-pointer whitespace-no-wrap;

    margin-right: 30px;
  }
</style>
