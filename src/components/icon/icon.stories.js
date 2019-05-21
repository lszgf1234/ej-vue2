import {storiesOf} from '@storybook/vue'
import {withKnobs, text, color} from '@storybook/addon-knobs'
import Vue from 'vue'

import Icon from '.'

Vue.use(Icon)

storiesOf('Icon', module)
  .addDecorator(withKnobs)
  .add('基本使用', () => ({
    template: `
      <ej-icon :icon="icon" :style="{color}"/>
    `,
    props: {
      icon: {
        default: text('Icon', 'star', 'Props'),
      },
      color: {
        default: color('Color', '#000', 'Preview'),
      },
    },
  }))
