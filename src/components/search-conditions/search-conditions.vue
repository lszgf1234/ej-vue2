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
