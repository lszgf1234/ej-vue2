import {storiesOf} from '@storybook/vue'
import Vue from 'vue'

import GraphAnalysis from '.'
Vue.use(GraphAnalysis)

/*
两个钩子
  操作
  详情
*/

storiesOf('Components|GraphAnalysis', module)
  .add('基本使用', () => ({
    template: `
      <graph-analysis></graph-analysis>
    `,
    props: {
    },
    methods: {
    },
  }))
