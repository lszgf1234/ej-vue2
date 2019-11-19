<template>
  <div>
    <ej-popper
      placement="top-start"
      title="标题"
      width="200"
      trigger="hover"
      content="这是一段内容,这是一段内容,这是一段内容,这是一段内容。">
      <el-button slot="reference">hover 激活</el-button>
    </ej-popper>
  </div>
</template>

<script>
  export default {
    name: 'basic',
  }
</script>

<style scoped>

</style>
