import {storiesOf} from '@storybook/vue'
import Vue from 'vue'

import ScreenAdapter from '.'
import Base from './story/base.vue'

Vue.use(ScreenAdapter)

storiesOf('Components|大屏适配布局', module)
  .add('基本使用', () => Base)
