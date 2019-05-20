import {storiesOf} from '@storybook/vue'
import {withKnobs, text, boolean} from '@storybook/addon-knobs'
import Vue from 'vue'

import AppHeader from '.'

Vue.use(AppHeader)

storiesOf('AppHeader', module)
  .addDecorator(withKnobs)
  .add('基本使用', () => ({
    template: `
      <div>
        <ej-app-header :title="title" :fixed="fixed"/>
        <ul class="text-center text-gray-500">
          <li v-for="n of 100">{{n}}</li>
        </ul>
      </div>
    `,
    props: {
      title: {
        default: text('Title', '应用标题'),
      },
      fixed: {
        default: boolean('Fixed', false),
      },
    },
  }))
