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
        name: '文件1',
      },
      {
        href: '/',
        name: '文件2',
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
