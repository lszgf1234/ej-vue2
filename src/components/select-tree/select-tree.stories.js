import {storiesOf} from '@storybook/vue'
import Vue from 'vue'

import SelectTree from '.'
import {sTData as MockList, sTProps as MockProps} from './mock-data'

Vue.use(SelectTree)

storiesOf('Components|SelectTree', module)
  .add('基本使用', () => ({
    template: `
    <div style="width: 800px; margin: 50px auto;">
      <ej-select-tree v-model="selOrganizationId"
        placeholder="请选择机构名称"
        :props="sTProps"
        :options="sTData"
        :clearable="isClearable"
        @getValue="getValue"/>
    </div>
    `,
    data () {
      return {
        sTData: MockList,
        sTProps: MockProps,
        isClearable: true,
        selOrganizationId: '',
      }
    },
    methods: {
      getValue (val) {
        console.log('选中的值是：', val)
      },
    },
  }))  
