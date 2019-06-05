<template>
  <conditions-wrapper :label="label" :change="value">
    <el-cascader ref="cascader" v-model="model" :options="options" @change="change" class="ej-cascader-item"/>
  </conditions-wrapper>
</template>

<script>
  import {Cascader as ElCascader} from 'element-ui'

  import ConditionsWrapper from './conditions-wrapper'

  export default {
    name: 'EjConditionsCascader',

    components: {
      ElCascader,
      ConditionsWrapper,
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
      label: {
        type: String,
        default: '',
      }, 
      keyName: {
        type: String,
        default: '',
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
        const key = this.keyName
        if (!key) return
        const labels = this.$refs.cascader.currentLabels
        const values = this.$refs.cascader.currentValue
        const selectedList = values.map((item, index) => {
          return {
            value: item,
            label: labels[index],
          }
        })
      
        this.$parent.setOptions({
          value: key,
          label: this.label,
          children: selectedList,
        })
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

