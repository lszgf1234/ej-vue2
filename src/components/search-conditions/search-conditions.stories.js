import {storiesOf} from '@storybook/vue'
import {object} from '@storybook/addon-knobs'
import Vue from 'vue'

import SearchConditions from '.'

Vue.use(SearchConditions)

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
  },
]

const _conditionsOptions4 = [
  {
    model: ['zhinan', 'daohang', 'dingbudaohang'],
    label: '',
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
      <ej-search-conditions :models="models" :datas="datas" :style="{'width': '1000px', margin: '50px auto'}">

        <ej-conditions-item v-model="models.model1"
                            :options="datas.model1.options"
                            :selected.sync="datas.model1.selected"
                            label="常用条件"/>

        <ej-conditions-cascader v-model="models.model4"
                                :options="datas.model4.options"
                                :selected.sync="datas.model4.selected"
                                label="基础资源"/>

        <ej-conditions-cascader v-model="models.model5"
                                :options="datas.model5.options"
                                :selected.sync="datas.model5.selected"
                                label="主题资源"/>
      </ej-search-conditions>
    `,

    data () {
      return {
        models: {
          model1: ['cy1', 'cy3'],
          model2: [],
          model3: [],
          model4: ['zhinan', 'daohang', 'dingbudaohang'],
          model5: [],
        },
        datas: {
          model1: {
            label: '常用条件',
            selected: [],
            options: this.conditionsOptions1,
          },
          model4: {
            label: '常用条件2',
            selected: [],
            options: this.cascaderOptions1,
          },
          model5: {
            label: '常用条件3',
            selected: [],
            options: this.cascaderOptions2,
          },
        },
      }
    },

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
  }))
