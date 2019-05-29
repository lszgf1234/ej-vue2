import {storiesOf} from '@storybook/vue'
import {number, text, withKnobs} from '@storybook/addon-knobs'
import Vue from 'vue'

import Popcard from '.'

Vue.use(Popcard)

const data = {
  name: '李帅123',
  img: 'https://jianjiaoedu.oss-cn-zhangjiakou.aliyuncs.com/avatar/201706291521585954aa9606954.jpg',
  phone: 18732700123,
}
/*
两个钩子
  操作
  详情
*/

storiesOf('Popcard', module)
  .addDecorator(withKnobs)
  .add('基本使用', () => ({
    template: `
      <ej-popcard :img-url="imgUrl" :title="title" :width="width">
        <template slot="img">
          <img style="width: 25px; height: 25px" :src="imgUrl">
        </template>
      </ej-popcard>
    `,
    props: {
      title: {
        default: text('title', data.name),
      },
      imgUrl: {
        default: text('img-url', data.img),
      },
      width: {
        default: number('width', 272),
      },
    },
  }))
  .add('slot', () => ({
    template: `
      <ej-popcard :img-url="data.img" :title="data.name">
        <template slot="img">
          <img style="width: 25px; height: 25px" :src="data.img">
        </template>
        <template slot="action">
          <a href="javascript:">操作插槽</a>
        </template>
        <template slot="main">
          <a href="javascript:">详情插槽</a>
        </template>
      </ej-popcard>
    `,
    props: {
      data: {
        default: data,
      },
    },
  }))
