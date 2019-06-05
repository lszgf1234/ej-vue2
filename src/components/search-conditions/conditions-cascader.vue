<template>
  <conditions-List v-bind="$attrs" :change="value">
    <el-cascader ref="cascader" v-model="model" :options="options" @change="change" class="ej-cascader-item"/>
  </conditions-List>
</template>

<script>
  import {Cascader as ElCascader} from 'element-ui'

  import ConditionsList from './conditions-list'

  export default {
    name: 'EjConditionsCascader',

    components: {
      ElCascader,
      ConditionsList,
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
    },

    computed: {
      model: {
        get () {
          return this.value
        },
        set (val) {
          this.$emit('input', val)
        },
      },
    },

    methods: {
      change () {
        const labels = this.$refs.cascader.currentLabels
        
        this.$emit('update:selected',
          this.$refs.cascader.currentValue.map((item, index) => {
            return {
              value: item,
              label: labels[index],
            }
          })
        )
      },
    },

    mounted () {
      this.change()
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

