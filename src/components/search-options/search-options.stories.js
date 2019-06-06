import {storiesOf} from '@storybook/vue'
import {object} from '@storybook/addon-knobs'
import {action} from '@storybook/addon-actions'
import Vue from 'vue'

import EjSearchOptions from '.'
import EjSearchCascader from '../search-cascader'
import EjSearchList from '../search-list'

Vue.use(EjSearchOptions)
Vue.use(EjSearchList)
Vue.use(EjSearchCascader)

const _conditionsOptions = [
  {
    value: 'cy1',
    label: '本部门全部资源1',
  },
  {
    value: 'cy2',
    label: '本部门全部资源2',
  },
  {
    value: 'cy3',
    label: '本部门全部资源3',
    num: 2, // 未审核数量
  },
  {
    value: 'cy4',
    label: '本部门全部资源1',
  },
]

const _cascaderOptions = [
  {
    value: 'zhinan',
    label: '指南',
    children: [
      {
        value: 'shejiyuanze',
        label: '设计原则',
        children: [
          {
            value: 'yizhi',
            label: '一致',
          }, {
            value: 'fankui',
            label: '反馈',
          }, {
            value: 'xiaolv',
            label: '效率',
          }, {
            value: 'kekong',
            label: '可控',
          },
        ],
      },
      {
        value: 'daohang',
        label: '导航',
        children: [
          {
            value: 'cexiangdaohang',
            label: '侧向导航',
          },
          {
            value: 'dingbudaohang',
            label: '顶部导航',
          },
        ],
      },
    ],
  },
]

storiesOf('SearchConditions', module)
  .add('基本使用', () => ({
    template: `
      <ej-search-options :style="{'width': '1000px', margin: '50px auto'}">
      
        <ej-search-list v-model="models.model1"
                        :index="0"
                        :options="datas[0].options"
                        :label="datas[0].label"/>

        <ej-search-list v-model="models.model2"
                        :index="1"
                        :options="datas[1].options"
                        :label="datas[1].label"/>

        <ej-search-list v-model="models.model3"
                        :index="2"
                        :options="datas[2].options"
                        :label="datas[2].label"/>

        <ej-search-cascader v-model="models.model4"
                            :index="3"
                            :options="datas[3].options"
                            :label="datas[3].label"/>

        <ej-search-cascader v-model="models.model5"
                            :index="4"
                            :options="datas[4].options"
                            :label="datas[4].label"/>
      </ej-search-options>
    `,

    props: {
      conditionsOptions1: {
        default: object('ConditionsOptions1', JSON.parse(JSON.stringify(_conditionsOptions))),
      },
      conditionsOptions2: {
        default: object('ConditionsOptions2', JSON.parse(JSON.stringify(_conditionsOptions))),
      },
      conditionsOptions3: {
        default: object('ConditionsOptions3', JSON.parse(JSON.stringify(_conditionsOptions))),
      },
      cascaderOptions1: {
        default: object('CascaderOptions1', JSON.parse(JSON.stringify(_cascaderOptions))),
      },
      cascaderOptions2: {
        default: object('CascaderOptions2', JSON.parse(JSON.stringify(_cascaderOptions))),
      },
    },

    data () {
      return {
        models: {
          model1: ['cy1', 'cy3'],
          model2: [],
          model3: [],
          model4: ['zhinan', 'daohang', 'dingbudaohang'],
          model5: [],
        },
        datas: [
          {
            label: '常用条件',
            options: this.conditionsOptions1,
          },
          {
            label: '机构名称',
            options: this.conditionsOptions2,
          },
          {
            label: '常用条件',
            options: this.conditionsOptions3,
          },
          {
            label: '基础资源',
            options: this.cascaderOptions1,
          },
          {
            label: '主题资源',
            options: this.cascaderOptions2,
          },
        ],
      }
    },

    watch: {
      models: {
        deep: true,
        immediate: true,
        handler (newVal) {
          let obj = {}
          for (let i in newVal) {
            obj[i] = newVal[i].join(',')
          }
          action('search')(obj)
        },
      },
    },
  }))
