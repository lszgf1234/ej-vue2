import {storiesOf} from '@storybook/vue'
import {boolean} from '@storybook/addon-knobs'
import Vue from 'vue'

import Tree from '.'

Vue.use(Tree)

const treeData = () => {
  return [{
    label: '一级 1',
    children: [{
      label: '二级 1-1',
      children: [{
        label: '三级 1-1-1'
      }]
    }]
  }, {
    label: '一级 2',
    children: [{
      label: '二级 2-1',
      children: [{
        label: '三级 2-1-1'
      }]
    }, {
      label: '二级 2-2',
      children: [{
        label: '三级 2-2-1'
      }]
    }]
  }, {
    label: '一级 3',
    children: [{
      label: '二级 3-1',
      children: [{
        label: '三级 3-1-1'
      }]
    }, {
      label: '二级 3-2',
      children: [{
        label: '三级 3-2-1'
      }]
    }]
  }]
}

storiesOf('Components|Tree', module)
  .add('虚线样式', () => ({
    template: `
      <ej-tree :data="data" :show-checkbox="showCheckbox" layoutStyle="dottedline"/>
    `,
    props: {
      data: {
        default: treeData(),
      },
      showCheckbox: {
        default: boolean('show-checkbox', false),
      },
    },
  }))
  .add('通用样式', () => ({
    template: `
      <ej-tree :data="data" layoutStyle="general"/>
    `,
    props: {
      data: {
        default: treeData(),
      },
    },
  }))
