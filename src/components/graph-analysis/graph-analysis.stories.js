import {storiesOf} from '@storybook/vue'
import Vue from 'vue'
import {select} from '@storybook/addon-knobs'

import GraphAnalysis from '.'


const nodes = [
  {
    id: '1',
    name: 'n1',
  },
  {
    id: '1-1',
    name: 'n1-1',
  },
  {
    id: '1-2',
    name: 'n1-2',
  },
  {
    id: '1-2-1',
    name: 'n1-2-1',
  },
]

const edgesBlood = [
  ['1', '1-1'],
  ['1', '1-2'],
  ['1', '1-2-1'],
  ['1-2', '1-2-1'],
]

const edgesEffect = [
  ['1-1', '1'],
  ['1-2', '1'],
  ['1-2-1', '1'],
  ['1-2-1', '1-2'],
]

const baseId = '1'

Vue.use(GraphAnalysis)
storiesOf('Components|GraphAnalysis', module)
  .add('血缘分析', () => ({
    template: `
      <graph-analysis
        :type="type"
        :nodes="nodes"
        :edges="edges"
        :baseId="baseId"
      />
    `,
    props: {
      type: {
        default : 'Blood',
      },
      nodes: {
        default: nodes,
      },
      baseId: {
        default: baseId,
      },
      edges: {
        default: edgesBlood,
      },
    },
  }))
  .add('影响分析', () => ({
    template: `
      <graph-analysis
        :type="type"
        :nodes="nodes"
        :edges="edges"
        :baseId="baseId"
      />
    `,
    props: {
      type: {
        default : 'Effect',
      },
      nodes: {
        default: nodes,
      },
      baseId: {
        default: baseId,
      },
      edges: {
        default: edgesEffect,
      },
    },
  }))
