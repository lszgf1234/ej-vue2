import {storiesOf} from '@storybook/vue'
import Vue from 'vue'

import Popper from '.'
import Basic from './stories/basic'

Vue.use(Popper)

storiesOf('Components|Popper', module)
  .add('基本使用', () => Basic)
