import {storiesOf} from '@storybook/vue'
import {number, object} from '@storybook/addon-knobs'
import {action} from '@storybook/addon-actions'
import Vue from 'vue'

import EjSearchList from '.'
import EjSearchOptionList from '../search-options/search-option-list'
import EjSearchOptionSelect from '../search-option-select/search-option-select'
import EjSearchOptionCascader from '../search-options/search-option-cascader'
import SEARCH_OPTIONS from './search-options.js'

Vue.use(EjSearchList)

storiesOf('Components|SearchList', module)
  .add('基本用法', () => ({
    template: `
      <ej-search-list :datas="datas"
                      :keyword.sync="keyword"
                      :options.sync="models"
                      :style="{'width': '1000px', margin: '50px auto'}"
                      @search="search"/>
    `,

    data () {
      return {
        keyword: '',
        models: {
          name: [],
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
            component: EjSearchOptionList,
          },
          {
            key: 'base',
            label: '基础资源',
            options: SEARCH_OPTIONS.base,
            component: EjSearchOptionCascader,
          },
          {
            key: 'theme',
            label: '主题资源',
            options: [SEARCH_OPTIONS.theme],
            component: EjSearchOptionSelect,
          },
          {
            key: 'filter',
            label: '过滤条件',
            options: [SEARCH_OPTIONS.theme, SEARCH_OPTIONS.theme, SEARCH_OPTIONS.theme],
            component: EjSearchOptionSelect,
          },
          {
            key: 'format',
            label: '资源格式',
            options: SEARCH_OPTIONS.format,
            component: EjSearchOptionList,
          },
          {
            key: 'share',
            label: '共享状态',
            options: SEARCH_OPTIONS.share,
            component: EjSearchOptionList,
          },
          {
            key: 'status',
            label: '共享状态',
            options: SEARCH_OPTIONS.status,
            component: EjSearchOptionList,
          },
        ],
      }
    },

    methods: {
      search (...args) {
        console.log(...args)
        action('search')(...args)
      },
    },
  }))
