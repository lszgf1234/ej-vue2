import {storiesOf} from '@storybook/vue'
import Vue from 'vue'

import tailwindConfig from '../../../tailwind.config'
import {cloneDeep} from '../../utils'
import Timeline from '.'

Vue.use(Timeline)

const data = [
  {
    timestamp: '2018-04-12 20:46',
    title: '创建成功',
  },
  {
    timestamp: '2018-04-13T12:23:34.567',
    title: '通过审核',
    desc: '不知道为什么但就是通过了',
  },
  {
    timestamp: '2018-04-14',
    title: '活动进行中',
    files: [
      {
        href: '/file1',
        name: '活动照片1.jpg',
        type: 3,
        size: '123KB',
      },
      {
        href: '/file2',
        name: '活动照片2.jpeg',
        type: 3,
        size: '42KB',
      },
      {
        href: '/file3',
        name: '节目表.pdf',
        type: 1,
        size: '234KB',
      },
    ],
  },
  {
    timestamp: '2018-04-15 00:00:00',
    title: '活动结束',
    desc: '活动圆满结束',
    files: [
      {
        href: '/file4',
        name: '活动纪要和录像.zip',
        type: 2,
        size: '20.4MB',
      },
    ],
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
  .add('自定义节点样式', () => ({
    template: `
      <ej-timeline :data="data"/>
    `,
    props: {
      data: {
        default: () => {
          const clone = cloneDeep(data)
          clone[3].color = tailwindConfig.theme.extend.colors.green.default
          return clone
        },
      },
    },
  }))
