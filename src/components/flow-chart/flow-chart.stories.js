import {storiesOf} from '@storybook/vue'
import Vue from 'vue'
import {select, boolean} from '@storybook/addon-knobs';

import FlowChart from '.'

Vue.use(FlowChart)

const data = {
  title: '工单初审',
  time: '2018-02-23 18:03',
  duration: '0.1h',
  desc: '审批意见内容描述',
  user_name: '李帅123',
  user_img: 'https://jianjiaoedu.oss-cn-zhangjiakou.aliyuncs.com/avatar/201706291521585954aa9606954.jpg',
  files: [
    {
      name: '附件1',
      herf: 'https://jianjiaoedu.oss-cn-zhangjiakou.aliyuncs.com/avatar/201706291521585954aa9606954.jpg'
    },
    {
      name: '附件2',
      herf: 'https://jianjiaoedu.oss-cn-zhangjiakou.aliyuncs.com/avatar/201706291521585954aa9606954.jpg'
    }
  ]
}
storiesOf('FlowChart', module)
  .add('基本使用', () => ({
    template: `
      <ej-flow-chart :data="data" :type="type" :has-next="hasNext" :has-popcard="hasPopcard"></ej-flow-chart>
    `,
    props: {
      data: {
        default: data,
      },
      type: {
        default: select('type', ['wait', 'starting', 'error', 'success'], 'wait')
      },
      hasNext: {
        default: boolean('hasNext', false),
      },
      hasPopcard: {
        default: boolean('hasPopcard', false),
      },
    },
  }))
storiesOf('FlowChart', module)
  .add('使用卡片插槽', () => ({
    template: `
      <ej-flow-chart :data="data" :has-next="true" :has-popcard="true">
        <template slot="action">
           <a href="javascript:">操作插槽</a>
        </template>
        <template slot="main">
           <a href="javascript:">详情插槽</a>
        </template>
      </ej-flow-chart>
    `,
    props: {
      data: {
        default: data,
      },
    },
  }))

