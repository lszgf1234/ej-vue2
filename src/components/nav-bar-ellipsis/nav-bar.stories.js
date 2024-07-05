import {storiesOf} from '@storybook/vue'
import Vue from 'vue'

import NavBarAuto from '.'
import Base from './story/base.vue'

Vue.use(NavBarAuto)

storiesOf('Components|NavBarEllipsis', module)
  .add('基本使用', () => Base)
