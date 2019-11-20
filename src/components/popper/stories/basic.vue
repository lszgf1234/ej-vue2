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
    <ej-popper
      placement="top-start"
      width="200"
      trigger="click"
      content="这是一段内容,这是一段内容,这是一段内容,这是一段内容。">
      <el-button slot="reference">click 激活</el-button>
      <div>
        Lorem ipsum dolor sit amet, consectetur adipisicing elit. Adipisci dolor facere in nisi quam sed, similique! Aliquid beatae dolores eius expedita optio placeat possimus voluptate! Alias blanditiis expedita laborum perspiciatis?
      </div>
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
