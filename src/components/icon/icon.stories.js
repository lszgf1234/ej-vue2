import {storiesOf} from '@storybook/vue'
import {color, text} from '@storybook/addon-knobs'
import Vue from 'vue'

import Icon from '.'

Vue.use(Icon)

storiesOf('Components|Icon', module)
  .add('基本用法', () => ({
    template: `
      <ej-icon :icon="icon" :style="style"/>
    `,
    props: {
      icon: {
        default: text('Icon', 'star', 'Props'),
      },
      color: {
        default: color('Color', '#f0f', 'Preview'),
      },
    },
    computed: {
      style () {
        return {
          color: this.color,
        }
      },
    },
  }))
