import {storiesOf} from '@storybook/vue'
import {text, boolean} from '@storybook/addon-knobs'
import Vue from 'vue'

import Loading from '.'

Vue.use(Loading)

storiesOf('Loading', module)
  .add('局部loading', () => ({
    template: `
      <div class="relative border-solid border border-black"
           style=" height: 300px; width: 300px;"
           v-loading="loadingStatus">
      </div>
    `,
    props: {
      loadingStatus: {
        default: boolean('控制loading出现与消失 loadingStatus', true),
      },
      readme: {
        default: text('局部loading指令用法', 'v-loading="loadingStatus"'),
      },
    },
  }))
  .add('全屏loading', () => ({
    template: `
      <div v-loading.fullscreen="loadingStatus"></div>
    `,
    props: {
      loadingStatus: {
        default: boolean('控制loading出现与消失 loadingStatus', true),
      },
      readme: {
        default: text('全局loading指令用法', 'v-loading.fullscreen="loadingStatus"'),
      },
    },
  }))
