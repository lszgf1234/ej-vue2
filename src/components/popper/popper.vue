<template>
  <el-popover v-bind="$attrs" v-on="$listeners">
    <template #default>
      <slot></slot>
    </template>
    <template #reference>
      <slot name="reference"></slot>
    </template>
  </el-popover>
</template>

<script>
  import {Popover} from 'element-ui'

  export default {
    name: 'EjPopper',

    components: {
      [Popover.name]: Popover,
    },
  }
</script>

<style lang="scss">
</style>
