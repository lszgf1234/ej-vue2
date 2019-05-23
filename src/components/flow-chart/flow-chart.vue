<template>
 <div class="ej-flow-chart">
   <ej-flow-item
     :data="item" v-for="(item, key) of data"
     :key="key"
     :has-next="key<data.length-1"
     :class="{'flex-1': key<data.length-1}"
      @press="press"
      @email="email"
   />
 </div>
</template>

<script>
  import FlowItem from './flow-item'

  export default {
    name: 'EjFlowChart',
    components: {
      [FlowItem.name]: FlowItem,
    },
    props: {
      data: {
        type: Array,
        default: []
      },
    },
    methods: {
      press (data) {
        this.$emit('press', data)
      },
      email (data) {
        this.$emit('email', data)
      }
    },
  }
</script>

<style lang="scss">
  .ej-flow-chart{
    display: flex;
    .flex-1{
      flex: 1;
    }
  }
</style>
