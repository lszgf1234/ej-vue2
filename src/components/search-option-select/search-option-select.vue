<template>
  <ej-search-option-item :show-more="defaultMore" :label="label" :change="value">
    <template v-for="(item, index) in params">
      <ej-select ref="ejSelect"
                 clearable
                 :key="index"
                 v-model="item.model"
                 :options="item.option"
                 @change="change(item.model, index)"
                 class="ej-search-option-select mr-3"/>
    </template>
    
  </ej-search-option-item>
</template>

<script>
  import EjSelect from './select'
  import EjSearchOptionItem from '../search-options/search-option-item'

  export default {
    name: 'searchOptionSelect',

    inheritAttrs: false,

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

    data () {
      return {
        models: [],
      }
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

      params () {
        const options = this.options
        return options.map((item, index) => {
          return {model: this.models[index] || '', option: item}
        })
      },
    },

    watch: {
      value: {
        deep: true,
        immediate: true,
        handler (newVal) {
          this.$set(this, 'models', newVal)
          this.changeSource()
        },
      }
    },

    methods: {
      change (val, index) {
        this.$set(this.models, index, val)
        this.changeSource()
      },

      changeSource () {
        this.$nextTick(_ => {
          const index = this.index
          const values = this.models
          const labels = this.$refs.ejSelect.map(item => item.getLabels())

          this.wrapperVm.setOptions(index, {
            label: this.label,
            children: values.filter(item => item && item.length).map((item, i) => {
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
  @import '../search-options/variables.scss';

  .ej-search-option-select {
    width: 130px;
    line-height: $search-conditions-height;

    &:last-of-type {
      margin-right: 0;
    }

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
