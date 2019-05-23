import {storiesOf} from '@storybook/vue'
import Vue from 'vue'

import Timeline from '.'

Vue.use(Timeline)

const data = [
  {
    timestamp: '2018-04-12 20:46',
    color: 'blue',
    title: 'ls进行了一步操作',
    desc: '这是什么操作',
    files: [
      {
        href: '/',
        name: '文件1.zip',
        type: 2,
        size: '1M',
      },
      {
        href: '/',
        name: '文件2.docx',
        type: 1,
        size: '100KB',
      },
      {
        href: 'http://jianjiaoedu.bj.bcebos.com/201807091159335b42dda567baf.jpg',
        name: '文件2.png',
        type: 3,
        size: '10KB',
      },
    ],
  },
  {
    timestamp: '2018-04-12 20:46',
    color: 'red',
    title: 'ls又进行了一步操作',
    desc: '',
    files: [],
  },
]

storiesOf('Timeline', module)
  .add('基本用法', () => ({
    template: `
      <ej-timeline :data="data"/>
    `,
    props: {
      data: {
        default: data,
      },
    },
  }))
