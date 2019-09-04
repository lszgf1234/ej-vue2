<template>
  <el-popover
    v-model="visible"
    trigger="click"
    class="set-name-view"
    popper-class="set-name-popper">
    <h3>{{title}}</h3>

    <ej-input v-model="model" v-bind="$attrs" @keyup.enter.native="confirm(model)" class="mt-1"/>

    <div class="text-center mt-2">
      <el-button size="small" @click="close()">取消</el-button>
      <el-button type="primary" @click="confirm(model)" size="small">确定</el-button>
    </div>

    <div slot="reference">
      <slot>
        <p class="content-text text-blue cursor-pointer">设为常用条件</p>
      </slot>
    </div>
  </el-popover>
</template>

<script>
  import {Button as ElButton, Popover as ElPopover} from 'element-ui'
  import EjInput from '../input/input.vue'

  export default {
    name: 'EjSearchSetName',

    components: {
      EjInput,
      ElButton,
      ElPopover,
    },

    props: {
      value: {
        type: [String, Number],
        default: '',
      },

      title: {
        type: String,
        default: '新常用条件名称',
      },
    },

    data () {
      return {
        visible: false,
        internalModel: '',
      }
    },

    computed: {
      model: {
        get () {
          return this.value || this.internalModel
        },
        set (val) {
          this.internalModel = val
          this.$emit('input', val)
        },
      },
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

