<template>
  <el-cascader  ref="cascader"
                v-model="model"
                :options="options"
                @change="change"
                class="ej-cascader-item"
  />
</template>

<script>
  import {Cascader as ElCascader} from 'element-ui'
  export default {
    components: {
      ElCascader,
    },

    data () {
      return {
        model: [],
      }
    },

    props: {
      options: {
        type: Array,
        default: () => ([]),
      },
      value: {
        type: Array,
        default: () => ([]),
      },
      conditionsKey: {
        type: String,
        default: '',
      },
    },

    methods: {
      change (val) {
        this.$emit('cascaderChange', this.conditionsKey, val, this.$refs.cascader.currentLabels)
      }
    },

    mounted () {
      // 首次进入触发生成Labels
      this.change (this.model)
    },

    watch: {
      value: {
        handler (newVal) {
          this.model = newVal
        },
        immediate: true,
      }
    }
  }
</script>

<style lang="scss">
  @import './variables.scss';
  .ej-cascader-item.el-cascader {
    width: 250px;
    line-height: $search-conditions-height;

    .el-input__inner {
      height: $search-conditions-height;
      line-height: $search-conditions-height;
      font-size: 14px;
    }

    .el-input__icon {
      line-height: $search-conditions-height;
    }
    
  }
</style>

