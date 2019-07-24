import {storiesOf} from '@storybook/vue'
import Vue from 'vue'

import EjSearchList from '.'
import BasicStory from './stories/basic.vue'

Vue.use(EjSearchList)

storiesOf('Components|SearchList', module)
  .add('基本用法', () => BasicStory)
