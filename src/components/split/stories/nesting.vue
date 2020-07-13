<template>
  <ej-split 
    v-model="splitRate" 
    mode="horizontal" 
    :min="100" 
    :max="200" 
    @move-start="startFn"
    @move-end="endFn"
    @moving="moveFn">

    <template #left>
      <div>111</div>
    </template>

    <template #right>
      <ej-split v-model="splitRate" mode="vertical">

        <template #left>
          <div>222</div>
        </template>

        <template #right>
          <div>333</div>
        </template>
        
      </ej-split>
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

    methods: {
      startFn() {
        console.log('开始了')
      },

      endFn() {
        console.log('结束了')
      },

      moveFn(ev) {
        console.log('移动中', ev)
      },
    },
  }
</script>

<style lang="scss">
  .ej-split{
    height: 100vh;
  }
</style>
