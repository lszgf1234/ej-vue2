<template>
  <div>
    <h3>血缘分析</h3>
    <graph-analysis
      :type="type"
      :nodes="nodes"
      :edges="edges"
      :baseId="baseId"
    />
  </div>
</template>

<script>
import Vue from 'vue'
import {select} from '@storybook/addon-knobs'

import GraphAnalysis from '../'

Vue.use(GraphAnalysis)

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

export default {
  props: {
    type: {
      default : select('类型', ['Blood', 'Effect'], 'Effect')
    }
  },

  data () {
    return {
      nodes,
      baseId,
    }
  },
  computed: {
    edges () {
      return this.type === 'Blood' ? edgesBlood : edgesEffect
    }
  },
}
</script>

<style scoped>

</style>
