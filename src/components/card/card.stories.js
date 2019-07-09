import {storiesOf} from '@storybook/vue'
import {boolean, text} from '@storybook/addon-knobs'
import Vue from 'vue'

import {logo} from '../../assets/base64'
import Card from '.'

Vue.use(Card)

const data = {
  userId: 123,
  name: 'ls',
  position: '大秘书',
  userAvatar: logo,
  jobNumber: '00010',
  phone: '18732700123',
  telephone: '0104654381',
  email: '1szgf@163.com',
  department: '总经办/秘书处',
  userAddress: '东城区白桥大街',
}
/*
两个钩子
  操作
  详情
*/

storiesOf('Components|Card', module)
  .add('基本使用', () => ({
    template: `
      <ej-card :data="data" :has-email="hasEmail" @mail="mail">
        <template slot="img">
          <img style="width: 25px; height: 25px" :src="imgUrl">
        </template>
      </ej-card>
    `,
    props: {
      data: {
        default: data,
      },
      hasEmail: {
        default: boolean('hasEmail', true),
      },
      imgUrl: {
        default: text('img-url', data.userAvatar),
      },
    },
    methods: {
      mail () {
        console.log('发邮件')
      },
    },
  }))
