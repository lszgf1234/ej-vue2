import {storiesOf} from '@storybook/vue'
import {withKnobs, text, number} from '@storybook/addon-knobs'
import Vue from 'vue'

import InfoList from '.'

Vue.use(InfoList)

storiesOf('InfoList', module)
  .addDecorator(withKnobs)
  .add('基本使用', () => ({
    template: `
      <ej-info-list :data="data" :columns="columns" :separator="separator"></ej-info-list>
    `,
    props: {
      data: {
        default: Array.from({length: 5}).map((_, idx) => ({
          name: 'Item ' + (idx + 1),
          value: 'Value ' + (idx + 1),
        })),
      },
      columns: {
        default: number('Columns', 3)
      },
      separator: {
        default: text('Separator', '：')
      },
    },
  }))
