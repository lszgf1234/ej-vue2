import {storiesOf} from '@storybook/vue'
import {object} from '@storybook/addon-knobs'
import Vue from 'vue'

import SearchConditions from './index.js'
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
    selected: true,
  },
]

const _conditionsOptions4 = [
  {
    model: ['zhinan', 'daohang', 'dingbudaohang'],
    label: '',
  }
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
            label: '一致'
          }, {
            value: 'fankui',
            label: '反馈'
          }, {
            value: 'xiaolv',
            label: '效率'
          }, {
            value: 'kekong',
            label: '可控'
          },
        ],
      },
      {
        value: 'daohang',
        label: '导航',
        children: [
          {
            value: 'cexiangdaohang',
            label: '侧向导航'
          },
          {
            value: 'dingbudaohang',
            label: '顶部导航'
          },
        ]
      },
    ],
  },
]

storiesOf('SearchConditions', module)
  .add('基本使用', () => ({
    template: `
      <ej-search-conditions :style="{'width': '1000px', margin: '50px auto'}">
          <ej-conditions-list :options="selectedList">
            <template #title>已选条件</template>
            <template v-slot:content="{options}">
              <ej-conditions-tag v-for="(item, index) in options"
                                :key="index"
                                :options="item">
                基础资源
              </ej-conditions-tag>
            </template>
          </ej-conditions-list>

          <ej-conditions-list :options="conditionsOptions1">
            <template #title>常用条件</template>
            <template v-slot:content="{options}">
              <ej-conditions-item v-for="(item, index) in options"
                                  :key="index"
                                  :selected.sync="item.selected">
                {{item.label}}
              </ej-conditions-item>
            </template>
          </ej-conditions-list>

          <ej-conditions-list :options="conditionsOptions2">
            <template #title>机构名称</template>
            <template v-slot:content="{options}">
              <ej-conditions-item v-for="(item, index) in options"
                                  :key="index"
                                  :selected.sync="item.selected">
                {{item.label}}
              </ej-conditions-item>
            </template>
          </ej-conditions-list>

          <ej-conditions-list :options="conditionsOptions3">
            <template #title>基础资源</template>
            <template v-slot:content="{options}">
              <ej-conditions-item v-for="(item, index) in options"
                                  :key="index"
                                  :selected.sync="item.selected">
                {{item.label}}
              </ej-conditions-item>
            </template>
          </ej-conditions-list>

          <ej-conditions-list :options="conditionsOptions4">
            <template #title>主题资源</template>
            <template v-slot:content="{options}">

              <ej-conditions-cascader v-for="(item, index) in options"
                                      :key="index"
                                      v-model="item.model"
                                      :label.sync="item.label"
                                      :selected.sync="item.selected"
                                      :options="cascaderOptions1">
              </ej-conditions-cascader>
            </template>
          </ej-conditions-list>

          <ej-conditions-list :options="conditionsOptions5">
            <template #title>主题资源</template>
            <template v-slot:content="{options}">

              <ej-conditions-cascader v-for="(item, index) in options"
                                      :key="index"
                                      v-model="item.model"
                                      :label.sync="item.label"
                                      :selected.sync="item.selected"
                                      :options="cascaderOptions2">
              </ej-conditions-cascader>
            </template>
          </ej-conditions-list>
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
      conditionsOptions4: {
        default: object('ConditionsOptions4', JSON.parse(JSON.stringify(_conditionsOptions4))),
      },
      conditionsOptions5: {
        default: object('ConditionsOptions5', JSON.parse(JSON.stringify(_conditionsOptions4))),
      },
      cascaderOptions1: {
        default: object('CascaderOptions1', JSON.parse(JSON.stringify(_cascaderOptions))),
      },
      cascaderOptions2: {
        default: object('CascaderOptions2', JSON.parse(JSON.stringify(_cascaderOptions))),
      },
    },

    computed: {
      selectedList () {
        let a = [
          this.conditionsOptions1,
          this.conditionsOptions2,
          this.conditionsOptions3,
          this.conditionsOptions4,
          this.conditionsOptions5,
        ].map(item => {
          return item.filter(citem => {
            return citem.selected
          })
        })
        console.log(a)
        return a
      },
    },

  }))
