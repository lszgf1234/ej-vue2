<template>
  <ej-search-option-item :show-more="defaultMore" :label="label" :change="value">
    <ej-select ref="ejSelect"
               v-model="model"
               :options="options"
               @change="change"
              c lass="search-option-select-view"/>
  </ej-search-option-item>
</template>

<script>
  import {SearchOptionItem as EjSearchOptionItem} from '@ej/ui'

  import EjSelect from './select'

  export default {
    name: 'searchOptionSelect',

    components: {
      EjSelect,
      EjSearchOptionItem,
    },

    inject: {
      wrapperVm: {
        type: Object,
        default: () => ({}),
      },
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
          return this.value[0] || ''
        },
        set (val) {
          this.$emit('input', [val])
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
        this.$nextTick(_ => {
          const index = this.index
          const value = this.model
          const label = this.$refs.ejSelect.getLabels()

          this.wrapperVm.setOptions(index, {
            label: this.label,
            children: value.length ? [{value, label}] : [],
          })
        })
      },
    },
  }
</script>

<style lang="scss">
  @import '../../externals/ej-ui/src/components/search-options/variables.scss';

  .search-option-select-view {
    width: 250px;
    line-height: $search-conditions-height;

    .el-input__inner {
      height: $search-input-height;
      line-height: $search-input-height;
      font-size: 14px;
    }

    .el-input__icon {
      height: $search-input-height;
      line-height: $search-input-height;
    }
  }
</style>
