import {storiesOf} from '@storybook/vue'
import Vue from 'vue'

import SelectTreeSingleMultiple from '.'
import BasicStory from './stories/basic.vue'

Vue.use(SelectTreeSingleMultiple)

storiesOf('Components|SelectTreeSingleMultiple', module)
  .add('基本使用', () => BasicStory)
