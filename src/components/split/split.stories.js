import {storiesOf} from '@storybook/vue'
import Vue from 'vue'

import EjSplit from '.'
import HorizontalSplit from './stories/horizontal'
import VerticalSplit from './stories/vertical'
import NestingSplit from './stories/nesting'
Vue.use(EjSplit)

storiesOf('Components|Split', module)
  .add('横向', () => HorizontalSplit)
  .add('竖向', () => VerticalSplit)
  .add('嵌套', () => NestingSplit)
