<template>
  <el-popover
    v-model="visible"
    trigger="click"
    class="set-name-view"
    popper-class="set-name-popper">
    <h3>新常用条件名称</h3>
    <el-input v-model="model" @keyup.enter.native="confirm(model)" class="mt-1"/>
    <div class="text-center mt-2">
      <el-button size="small" @click="close()">取消</el-button>
      <el-button type="primary" @click="confirm(model)" size="small">确定</el-button>
    </div>
    <p slot="reference" class="content-text text-blue cursor-pointer">设为常用条件</p>
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

    watch: {
      visible (newVal) {
        if (newVal) this.model = ''
      },
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

  .set-name-view {
    .content-text {
      line-height: $search-conditions-height;
    }
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

