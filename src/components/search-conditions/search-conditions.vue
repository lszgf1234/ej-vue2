<template>
  <div class="ej-search-conditions">
    <slot></slot>
  </div>
</template>

<script>

  export default {
    name: 'EjSearchConditions',

    methods: {
      close (val) {
        console.log(val)
      }
    }
  }
</script>

<style lang="scss">
  @import './variables.scss';
  .ej-search-conditions {
    &__title {
      white-space: nowrap;
      line-height: $search-conditions-height;
      margin-right: $search-conditions-height;
    }

    &__item {
      margin-bottom: 10px;

      &:last-child {
        margin-bottom: 0;
      }
    }
  }
</style>
