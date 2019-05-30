import {storiesOf} from '@storybook/vue'
import {text, number} from '@storybook/addon-knobs'
import Vue from 'vue'

import InfoList from '.'

Vue.use(InfoList)

storiesOf('Components|InfoList', module)
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
        default: number('Columns', 3),
      },
      separator: {
        default: text('Separator', '：'),
      },
    },
  }))
