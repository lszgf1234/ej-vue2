import {storiesOf} from '@storybook/vue'
import Vue from 'vue'
import {select, boolean} from '@storybook/addon-knobs';

import FlowChart from '.'
import {testImg} from '../../assets/base64'

Vue.use(FlowChart)


const data = [
  {
    title: '工单初审', // 必须的
    type: 'success', // 必须的 站内信
    user_img: testImg,
    user_name: '李帅123',
    time: '2018-02-23 18:03',
  },
  {
    title: '工单初审', // 必须的
    type: 'success', // 必须的 站内信
    user_img: testImg,
    user_name: '李帅123',
    time: '2018-02-23 18:03',
  },
  {
    title: '审核中',
    type: 'starting',

    user_img: testImg,
    user_name: '李帅123',
  },
  {
    title: '待审核',
    type: 'wait',
  },
]
const dataError = [
  {
    title: '工单初审', // 必须的
    type: 'success', // 必须的 站内信
    user_img: testImg,
    user_name: '李帅123',
    time: '2018-02-23 18:03',
  },
  {
    title: '驳回',
    type: 'error',
    user_img: testImg,
    user_name: '李帅123',
    time: '2018-02-23 18:03',
  },
  {
    title: '待审核',
    type: 'wait',
  },
]

storiesOf('FlowChar', module)
  .add('基本使用', () => ({
    template: `
      <ej-flow-chart :data="data" @press="press" @email="email"/>
    `,
    props: {
      data: {
        default: data,
      },
    },
    methods: {
      press (data) {
        console.log(data)
      },
      email(data) {
        console.log(data)
      },
    },
  }))
  .add('驳回', () => ({
    template: `
      <ej-flow-chart :data="data" @email="email"/>
    `,
    props: {
      data: {
        default: dataError,
      },
    },
    methods: {
      email(data) {
        console.log(data)
      },
    },
  }))
