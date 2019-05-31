<template>
  <el-cascader ref="cascader" v-model="model" :options="options" class="ej-cascader-item"/>
</template>

<script>
  import {Cascader as ElCascader} from 'element-ui'

  export default {
    name: 'EjConditionsCascader',

    components: {
      ElCascader,
    },

    props: {
      options: {
        type: Array,
        default: () => [],
      },
      value: {
        type: Array,
        default: () => [],
      },
      selected: {
        type: Boolean,
        default: false,
      },
    },

    computed: {
      model: {
        get () {
          this.change()
          return this.value
        },
        set (val) {
          this.$emit('input', val)
        },
      },
    },

    watch: {
      selected (newVal) {
        if (!newVal) {
          this.model = []
        }
      },
    },

    methods: {
      change () {
        this.$emit('update:selected', Boolean(this.value.length))

        this.$nextTick(() => {
          this.$emit('update:label', this.$refs.cascader.currentLabels)
        })
      },
    },
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

