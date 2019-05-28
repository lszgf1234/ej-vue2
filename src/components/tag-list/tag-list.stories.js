import {storiesOf} from '@storybook/vue'
import Vue from 'vue'

import TagList from '.'

Vue.use(TagList)

storiesOf('TagList', module)
  .add('基本使用', () => ({
    template: '<ej-tag-list class="rules-tag"/>',
  }))
  .add('带默认值', () => ({
    template: `
      <ej-tag-list class="rules-tag" v-model="list"/>
    `,
    props: {
      list: {
        default: [
          {
            name: '22', // 名字
            score: 12, // 当前分数
            removable: false, // 带删除按钮
            voted: true, // 是否已投票
          },
        ],
      },
    },
  }))
