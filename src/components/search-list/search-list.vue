<template>
  <div class="ej-search-list">
    <div class="input-box flex justify-between items-center mb-4">
      <div class="flex items-end">
        <ej-search-input v-model="keywordModel"
                         placeholder="请输入资料名称"
                         @search="search('btn')"/>
        <ej-select clearable
                   v-model="commonlyModel"
                   :options="commonlyOptions"
                   @deleted-select="deletedOptions"
                   @change="commonlyChange(commonlyModel, commonlyOptions)"
                   placeholder="常用条件"
                   class="ej-search-commonly-select mb-1"/>
      </div>
      <slot name="input-suffix"/>
    </div>

    <ej-search-options :default-tag-more="defaultTagMore" :max-width-tag="maxWidthTag">
      <template #tag-suffix>
        <ej-search-set-name  @confirm="setNameConfirm"/>
      </template>
      <template #default="{setOptions}">
        <component v-for="(item, index) in datas"
                  :key="index"
                  :is="item.component"
                  v-model="models[item.key]"
                  v-bind="item"
                  @setOptions="setOptions"/>
      </template>
    </ej-search-options>
  </div>
</template>

<script>
  import { Message } from 'element-ui';

  import EjSelect from '../search-options/select/select'
  import EjSearchInput from '../search-input/search-input'
  import EjSearchSetName from '../search-set-name/search-set-name'
  import EjSearchOptions from '../search-options/'
  import SelectTempalte from './select-tempalte'

  import QUERY_COMMONLY_LIST from './grapgql/query_commonly_list.gql'
  import MUTATION_COMMONLY_LIST from './grapgql/mutation_commonly_list.gql'

  export default {
    name: 'EjSearchList',

    components: {
      EjSelect,
      EjSearchInput,
      EjSearchSetName,
      EjSearchOptions,
    },

    data () {
      return {
        models: {},
        commonlyModel: '',
        commonlyOptions: [],
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
      keyword: {
        type: String,
        default: '',
      },
      defaultTagMore: {
        type: Boolean,
        default: true,
      },
      maxWidthTag: {
        type: String,
        default: '',
      },
      // 应用key
      appKey: {
        type: String,
        default: '',
      },
      // 应用内页面id
      viewId: {
        type: [String, Number],
        default: '',
      },
    },

    computed: {
      keywordModel: {
        get () {
          return this.keyword
        },
        set (keyword) {
          this.$emit('update:keyword', keyword)
        },
      },
    },

    watch: {
      options: {
        deep: true,
        immediate: true,
        handler (newVal) {
          this.models = newVal
        },
      },
      models: {
        deep: true,
        handler (newVal) {
          this.$emit('update:options', newVal)
          this.search('hot')
        },
      },
    },

    created () {
      if (!this.$apollo) {
        this.$apollo = {
          query () {return this},
          mutate () {return this},
          then () {return this},
          catch () {return this},
        }
      }
      this.requestCommonlyList()
    },

    methods: {
      /**
       * @param {string} type btn:搜索按钮触发  hot:数据更改触发
       */
      search (type = 'btn') {
        this.$emit('search', type, this.handlerParams(this.models))
      },

      // 获取常用条件
      requestCommonlyList () {
        const appKey = this.appKey
        const pageId = this.viewId

        this.$apollo.query({
          query: QUERY_COMMONLY_LIST,
          fetchPolicy: 'network-only',
          client: 'apolloUserClient',
          variables: {input: {appKey}},
        }).then(({data}) => {
          this.commonlyOptions = this.handlerCommonlyOptions(data.list)
        })
      },

      // 设置常用条件
      setNameConfirm (label) {
        this.$apollo.mutate({
          mutation: MUTATION_COMMONLY_LIST,
          client: 'apolloUserClient',
          variables: {
            input: {
              conditionName: label,
              conditionContent: JSON.stringify(this.handlerParams(this.models)),
              pageId: this.viewId,
              appKey: this.appKey,
            },
          },
        })
        .then(({data}) => {
          if (!data || !data.result) return
          const result = data.result[0]
          const {conditionContent, conditionName, userConditionId} = result
          this.commonlyOptions.push({
            label: conditionName,
            value: userConditionId,
            params: this.handlerParams(JSON.parse(conditionContent)),
            component: SelectTempalte,
          })
          Message.success('设置常用条件成功')
        }).catch((err) => {
          console.error(err)
          Message.error('设置常用条件失败')
        })
      },

      // 删除选项
      deletedOptions (id) {
        const index = this.commonlyOptions.findIndex(item => item.value === id)
        if (index === -1) return
        this.commonlyOptions.splice(index, 1)
        this.commonlyModel = ''
        Message.success('删除常用条件成功')
      },

      // 预填通用条件
      commonlyChange (val, options = []) {
        // 获取要预填的参数
        const selected = options.find(item => item.value === val) || {}
        this.$set(this, 'models', this.resetParams(selected.params))
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
          if (item) {
            obj[i] = item.split(',')
          } else {
            obj[i] = []
          }
        }
        return obj
      },

      // 常用条件的参数
      handlerCommonlyOptions (list = []) {
        return list.map(item => {
          const {userConditionId, conditionName, conditionContent} = item
          return {
            value: userConditionId,
            label: conditionName,
            params: JSON.parse(conditionContent),
            component: SelectTempalte,
          }
        })
      },
    },
  }
</script>

<style lang="scss">
  .ej-search-list {
    .ej-search-commonly-select {
      width: 140px;
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

