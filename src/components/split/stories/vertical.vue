<template>
  <ej-split :split="splitRate" mode="vertical">

    <template #left>
      <div>111</div>
    </template>

    <template #right>
      <div>222</div>
    </template>
    
  </ej-split>
</template>

<script>
  export default {
    data () {
      return {
        splitRate: 0.5
      }
    },
  }
</script>

<style lang="scss">
  .ej-split{
    height: 100vh;
  }
</style>