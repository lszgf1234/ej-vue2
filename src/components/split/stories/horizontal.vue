<template>
  <ej-split :split="splitRate" mode="horizontal">

    <template #left>
      <div>111</div>
    </template>

    <template #right>
      <div v-for="item in 999" :key="item">222</div>
    </template>
    
  </ej-split>
</template>

<script>
  export default {
    data () {
      return {
        splitRate: '300px'
      }
    },
  }
</script>

<style lang="scss">
  .ej-split{
    height: 100vh;
  }
</style>
