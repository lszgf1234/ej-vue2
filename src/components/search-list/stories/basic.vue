<template>
  <ej-search-list :datas="datas"
                  :keyword.sync="keyword"
                  :options.sync="models"
                  :style="{'width': '1000px', margin: '50px auto'}"
                  :default-tag-more="true"
                  :max-width-tag="maxWidthTag"
                  @search="search">
    <template #default="{setOptions}">
      <ej-search-option-list v-model="models[datas[0].key]" :label="datas[0].label" :options="datas[0].options" @setOptions="setOptions"/>
      <ej-search-option-cascader v-model="models[datas[1].key]" :label="datas[1].label" :options="datas[1].options" @setOptions="setOptions"/>
      <ej-search-option-select v-model="models[datas[2].key]" :label="datas[2].label" :options="datas[2].options" @setOptions="setOptions"/>
      <ej-search-option-select v-model="models[datas[3].key]" :label="datas[3].label" :options="datas[3].options" @setOptions="setOptions"/>
      <ej-search-option-list v-model="models[datas[4].key]" :label="datas[4].label" :options="datas[4].options" @setOptions="setOptions"/>
      <ej-search-option-list v-model="models[datas[5].key]" :label="datas[5].label" :options="datas[5].options" @setOptions="setOptions"/>
      <ej-search-option-list v-model="models[datas[6].key]" :label="datas[6].label" :options="datas[6].options" @setOptions="setOptions"/>
    </template>
  </ej-search-list>
</template>

<script>
  import EjSearchOptionList from '../../search-options/list'
  import EjSearchOptionSelect from '../../search-options/select'
  import EjSearchOptionCascader from '../../search-options/cascader'
  import SEARCH_OPTIONS from './search-options.js'

  import {number} from '@storybook/addon-knobs'
  import {action} from '@storybook/addon-actions'

  export default {
    components: {
      EjSearchOptionList,
      EjSearchOptionSelect,
      EjSearchOptionCascader,
    },

    data () {
      return {
        keyword: '',
        models: {
          name: ['1', '2'],
          base: [],
          theme: [],
          filter: [],
          format: [],
          share: [],
          status: [],
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
        ],
      }
    },

    props: {
      maxWidthTag: {
        default: number('maxWidthTag', 100) + '%',
      },
    },

    methods: {
      search (...args) {
        action('search')(...args)
      },
    },
  }
</script>

