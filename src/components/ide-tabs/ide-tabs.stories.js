import {storiesOf} from '@storybook/vue'
import {number, object} from '@storybook/addon-knobs'
import Vue from 'vue'

import IdeTabs from '.'

Vue.use(IdeTabs)

const data = [
  {
    name: 'tab1',
  },
  {
    name: 'tab2',
  },
  {
    name: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. A ab accusantium aliquam atque aut blanditiis dolor excepturi fugiat hic illo minus modi pariatur porro quam, sed tenetur voluptate? Deserunt, eveniet?',
  },
]

storiesOf('Components|IdeTabs', module)
  .add('基本使用', () => ({
    template: `
      <ej-ide-tabs :list="data" :index.sync="index" @remove="remove"/>
    `,
    props: {
      index: {
        default: number('index', 0),
      },
      data: {
        default: object('list', data),
      },
    },
    methods: {
      remove (idx, it) {
        this.data.splice(idx, 1)
      },
    },
  }))
