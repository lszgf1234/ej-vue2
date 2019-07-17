<template>
  <el-popover
    popper-class="set-name-popper"
    trigger="click"
    v-model="visible">
    <h3>新常用条件名称</h3>
    <el-input v-model="model" class="mt-1" type="text"/>
    <div class="text-center mt-2">
      <el-button size="small" @click="close()">取消</el-button>
      <el-button type="primary" @click="confirm(model)" size="small">确定</el-button>
    </div>
    <p slot="reference" class="set-name-text text-blue cursor-pointer">设为常用条件</p>
  </el-popover>
</template>

<script>
  import {Input as ElInput, Button as ElButton, Popover as ElPopover} from 'element-ui'

  export default {
    name: 'EjSearchSetName',

    components: {
      ElInput,
      ElButton,
      ElPopover,
    },

    data () {
      return {
        visible: false,
        model: '',
      }
    },

    methods: {
      close () {
        this.visible = false
      },

      confirm (val) {
        this.$emit('confirm', val)
        this.close()
      },
    },
  }
</script>


<style lang="scss">
  @import '../search-options/variables.scss';

  .set-name-text {
    line-height: $search-conditions-height;
  }

  .set-name-popper {
    .el-input {
      .el-input__inner {
        height: $search-input-height;
        line-height: $search-input-height;
      }
    }
  }
</style>

