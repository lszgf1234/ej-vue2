<template>
  <div class="ej-search-list">
    <div class="input-box flex justify-between items-center mb-4">
      <div class="flex items-end">
        <ej-search-input v-model="keyword"
                         placeholder="请输入资料名称"
                         @search="search('btn')"/>
        <ej-select clearable
                   v-model="commonlyModel"
                   :options="commonlyOptions"
                   @change="commonlyChange(commonlyModel, commonlyOptions)"
                   placeholder="常用条件"
                   class="ej-search-list-select mb-1"/>
      </div>
      <slot name="input-suffix"/>
    </div>

    <ej-search-options :default-tag-more="true">
      <template #tag-suffix>
        <ej-search-set-name @confirm="setNameConfirm"/>
      </template>
      <component v-for="(item, index) in datas"
                 :key="index"
                 :is="item.component"
                 v-model="models[item.key]"
                 :label="item.label"
                 :options="item.options"/>
    </ej-search-options>
  </div>
</template>

<script>
  import EjSelect from '../search-option-select/select'
  import EjSearchInput from '../search-input/search-input'
  import EjSearchOptions from '../search-options/search-options'
  import EjSearchSetName from '../search-set-name/search-set-name'

  export default {
    name: 'EjSearchList',

    components: {
      EjSelect,
      EjSearchInput,
      EjSearchOptions,
      EjSearchSetName,
    },

    data () {
      return {
        commonlyModel: '',
        commonlyOptions: [
          {value: '1', label: '常用条件1', params: {base: '03,001', format: 'database,image,stream,file', theme: '02', name: '3', share: 'condition', status: ''}},
          {value: '2', label: '常用条件2', params: {base: '', format: '', theme: '03', name: '1', share: '', status: ''}},
        ],
      }
    },

    props: {
      datas: {
        type: Array,
        default: () => [],
      },
      options: {
        type: Object,
        default: () => ({}),
      },
    },

    computed: {
      models: {
        get () {
          return this.options || {}
        },
        set (val) {
          this.$emit('update:options', val)
          // 数据改变时实时通知
          this.search('hot')
        },
      },
      keyword: {
        get () {
          return this.models.keyword
        },
        set (keyword) {
          this.$emit('update:options', Object.assign({}, this.models, {keyword}))
        },
      },
    },

    methods: {
      /**
       * @param {string} type btn:搜索按钮触发  hot:数据更改触发
       */
      search (type = 'btn') {
        this.$emit('search', type, this.handlerParams(this.models))
      },
   
      // 预填通用条件
      commonlyChange (val, options = []) {
        // 获取要预填的参数
        const selected = options.find(item => item.value === val) || {}
        this.$set(this, 'models', this.resetParams(selected.params))
      },

      // 设置常用条件
      setNameConfirm (label) {
        this.commonlyOptions.push({
          label,
          value: new Date().toString(),
          params: this.handlerParams(this.models),
        })
      },

      // 转换参数为键值对形式
      handlerParams (params = {}) {
        let obj = {}
        for (let i in params) {
          if (Array.isArray(params[i])) {
            obj[i] = params[i].join(',')
          } else {
            obj[i] = params[i]
          }
        }
        return obj
      },

      // 还原参数为数组形式
      resetParams (params = {}) {
        const obj = {}
        for (let i in params) {
          const item = params[i]
          if (i === 'keyword') {
            obj.keyword = item
          } else {
            if (item) {
              obj[i] = item.split(',')
            } else {
              obj[i] = []
            }
          }
        }
        return obj
      },
    },
  }
</script>

<style lang="scss">
  .ej-search-list {
    .ej-search-list-select {
      width: 120px;
      height: 26px;
      line-height: 26px;
      margin-left: 12px;

      .el-input__inner {
        height: 26px;
        line-height: 26px;
      }

      .el-input__icon {
        line-height: 26px;
      }
    }
  }
</style>

