import {storiesOf} from '@storybook/vue'
import {object} from '@storybook/addon-knobs'
import {action} from '@storybook/addon-actions'
import Vue from 'vue'

import SearchConditions from '.'
import ConditionsItem from '../conditions-item'
import ConditionsCascader from '../conditions-cascader'

Vue.use(SearchConditions)
Vue.use(ConditionsItem)
Vue.use(ConditionsCascader)

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
      <ej-search-conditions :models="models" :datas="datas" :style="{'width': '1000px', margin: '50px auto'}">

        <ej-conditions-item v-model="models.model1"
                            :options="datas.model1.options"
                            :key-name="datas.model1.key"
                            :label="datas.model1.label"/>

        <ej-conditions-item v-model="models.model2"
                            :options="datas.model2.options"
                            :key-name="datas.model2.key"
                            :label="datas.model2.label"/>

        <ej-conditions-item v-model="models.model3"
                            :options="datas.model3.options"
                            :key-name="datas.model3.key"
                            :label="datas.model3.label"/>

        <ej-conditions-cascader v-model="models.model4"
                                :options="datas.model4.options"
                                :key-name="datas.model4.key"
                                :label="datas.model4.label"/>

        <ej-conditions-cascader v-model="models.model5"
                                :options="datas.model5.options"
                                :key-name="datas.model5.key"
                                :label="datas.model5.label"/>
      </ej-search-conditions>
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
        datas: {
          model1: {
            key: 'model1',
            label: '常用条件',
            selected: [],
            options: this.conditionsOptions1,
          },
          model2: {
            key: 'model2',
            label: '机构名称',
            selected: [],
            options: this.conditionsOptions2,
          },
          model3: {
            key: 'model3',
            label: '常用条件',
            selected: [],
            options: this.conditionsOptions3,
          },
          model4: {
            key: 'model4',
            label: '基础资源',
            selected: [],
            options: this.cascaderOptions1,
          },
          model5: {
            key: 'model5',
            label: '主题资源',
            selected: [],
            options: this.cascaderOptions2,
          },
        },
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
