import {storiesOf} from '@storybook/vue'
import {number, object} from '@storybook/addon-knobs'
import Vue from 'vue'

import IdeTabs from '.'

Vue.use(IdeTabs)

const data = [
  {
    name: 'tab1',
    icon: 'tags-o',
    closable: false,
  },
  {
    name: 'tab2',
  },
  {
    name: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. A ab accusantium aliquam atque aut blanditiis dolor excepturi fugiat hic illo minus modi pariatur porro quam, sed tenetur voluptate? Deserunt, eveniet?',
  },
]

storiesOf('Components|tabbedWorkspace', module)
  .add('基本使用', () => ({
    template: `
      <ej-tabbed-workspace :tabs="data" 
                            v-model="index"
                            @change-tab="change"
                            @rename-tab="rename"
                            @close-tab="remove">  
      </ej-tabbed-workspace>
    `,
    props: {
      index: {
        default: number('index', 1),
      },
      data: {
        default: object('list', data),
      },
    },
    methods: {
      remove (it, idx) {
        this.data.splice(idx, 1)
      },
      rename (it, idx) {
      },
      change (it, idx) {
      },
    },
  }))
  .add('左右slot', () => ({
    template: `
      <ej-tabbed-workspace :tabs="data" 
                            v-model="index"
                            @change-tab="change"
                            @rename-tab="rename"
                            @close-tab="remove">
        <div slot="tabbar-left">left</div>            
        <div slot="tabbar-right">right</div>            
      </ej-tabbed-workspace>
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
      remove (it, idx) {
        this.data.splice(idx, 1)
      },
      rename (it, idx) {
      },
      change (it, idx) {
      },
    },
  }))
