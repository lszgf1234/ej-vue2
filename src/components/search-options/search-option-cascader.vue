<template>
  <ej-search-option-item :show-more="defaultMore" :label="label" :change="value">
    <el-cascader ref="cascader"
                 v-model="model"
                 :options="options"
                 class="ej-cascader-item"
                 @change="change"/>
  </ej-search-option-item>
</template>

<script>
  import {Cascader as ElCascader} from 'element-ui'

  import EjSearchOptionItem from './search-option-item'

  export default {
    name: 'EjSearchOptionCascader',

    components: {
      ElCascader,
      EjSearchOptionItem,
    },

    props: {
      defaultMore: Boolean,
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
    },

    computed: {
      index () {
        return this.$parent.$children.findIndex(item => item === this)
      },
      model: {
        get () {
          return this.value
        },
        set (val) {
          this.$emit('input', val)
        },
      },
    },

    watch: {
      model () {
        this.change()
      },
    },

    methods: {
      change () {
        /**
         * @TODO 子集value与不同父级value相同时出现bug  需要更新到v2.11.0
         * https://github.com/ElemeFE/element/issues/16324
         */
        this.$nextTick(_ => {
          const index = this.index
          const values = this.model
          const labels = []
          // 改用getCheckedNodes()方法，elementui 2.9.1版本去掉了内置的currentLabels
          let checkedNodes = this.$refs.cascader.getCheckedNodes()[0]

          // 遍历获取label
          while (checkedNodes && checkedNodes !== null) {
            labels.unshift(checkedNodes.label)
            checkedNodes = checkedNodes.parent
          }

          this.$emit('setOptions', index, {
            label: this.label,
            children: values.map((item, i) => {
              return {
                value: item,
                label: labels[i],
              }
            }),
          })
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
      height: $search-input-height;
      line-height: $search-input-height;
      font-size: 14px;
    }

    .el-input__icon {
      line-height: $search-input-height;
    }
  }
</style>

