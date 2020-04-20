import {storiesOf} from '@storybook/vue'
import Vue from 'vue'

import SelectTree from '.'

Vue.use(SelectTree)

storiesOf('Components|SelectTree', module)
  .add('基本使用', () => SelectTree)
