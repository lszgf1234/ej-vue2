<template>
  <div>
    <ej-search-list ref="ejSearchList"
                    :datas="datas"
                    :models.sync="models"
                    :keyword.sync="keyword"
                    :style="{'width': '1000px', margin: '50px auto'}"
                    :default-tag-more="true"
                    :max-width-tag="maxWidthTag"
                    @search="search">
      <template #default="{setSelected}">
        <ej-search-option-list :prop="datas[0].key" v-model="models[datas[0].key]" :label="datas[0].label" :options="datas[0].options" @setSelected="setSelected"/>
        <ej-search-option-cascader :prop="datas[1].key" v-model="models[datas[1].key]" :label="datas[1].label" :options="datas[1].options" @setSelected="setSelected"/>
        <ej-search-option-select :prop="datas[2].key" v-model="models[datas[2].key]" :label="datas[2].label" :options="datas[2].options" @setSelected="setSelected"/>
        <ej-search-option-select :prop="datas[3].key" v-model="models[datas[3].key]" :label="datas[3].label" :options="datas[3].options" @setSelected="setSelected"/>
        <ej-search-option-list :no-multiple="true" :prop="datas[4].key" v-model="models[datas[4].key]" :label="datas[4].label" :options="datas[4].options" @setSelected="setSelected"/>
        <ej-search-option-list :prop="datas[5].key" v-model="models[datas[5].key]" :label="datas[5].label" :options="datas[5].options" @setSelected="setSelected"/>
        <ej-search-option-list :prop="datas[6].key" v-model="models[datas[6].key]" :label="datas[6].label" :options="datas[6].options" @setSelected="setSelected"/>
        <ej-search-option-radio :prop="datas[7].key" v-model="models[datas[7].key]" :label="datas[7].label" :options="datas[7].options" @setSelected="setSelected"/>
      </template>
    </ej-search-list>
  </div>
</template>

<script>
  import EjSearchOptionList from '../../search-options/list'
  import EjSearchOptionRadio from '../../search-options/radio'
  import EjSearchOptionSelect from '../../search-options/select'
  import EjSearchOptionCascader from '../../search-options/cascader'
  import SEARCH_OPTIONS from './search-options.js'

  import {number} from '@storybook/addon-knobs'
  import {action} from '@storybook/addon-actions'

  export default {
    components: {
      EjSearchOptionList,
      EjSearchOptionRadio,
      EjSearchOptionSelect,
      EjSearchOptionCascader,
    },

    data () {
      return {
        keyword: '',
        models: {
          name: ['1', '2'],
          base: ['04', '002'],
          theme: [],
          filter: ['01', '02'],
          format: [],
          share: [],
          status: [],
          radio: '',
          otherParam: '',
        },
        datas: [
          {
            key: 'name',
            label: '机构名称',
            options: SEARCH_OPTIONS.name,
          },
          {
            key: 'base',
            label: '基础资源',
            options: SEARCH_OPTIONS.base,
          },
          {
            key: 'theme',
            label: '主题资源',
            options: [SEARCH_OPTIONS.theme],
          },
          {
            key: 'filter',
            label: '过滤条件',
            options: [SEARCH_OPTIONS.theme, SEARCH_OPTIONS.theme, SEARCH_OPTIONS.theme],
          },
          {
            key: 'format',
            label: '资源格式',
            options: SEARCH_OPTIONS.format,
          },
          {
            key: 'share',
            label: '共享状态',
            options: SEARCH_OPTIONS.share,
          },
          {
            key: 'status',
            label: '审核状态',
            options: SEARCH_OPTIONS.status,
          },
          {
            key: 'radio',
            label: '是否临时表',
            options: [
              {value: '1', label: '全部'},
              {value: '2', label: '否'},
              {value: '3', label: '是'},
            ],
          },
        ],
      }
    },

    watch: {
      models: {
        deep: true,
        handler (newVal) {
          console.log(newVal)
        },
      },
    },

    props: {
      maxWidthTag: {
        default: number('maxWidthTag', 100) + '%',
      },
    },

    methods: {
      emitSetSelected (...args) {
        return this.$refs.ejSearchList.emitSetSelected(...args)
      },

      search (type, params = {}) {
        action('search')(type, Object.assign(params, {keyword: this.keyword}))
      },
    },

    mounted () {
      setTimeout(() => {
        this.models.otherParam = 'otherParam'
        this.emitSetSelected({
          key: 'otherParam',
          label: '外部条件：otherParam',
        })
      }, 1500)
    },
  }
</script>

