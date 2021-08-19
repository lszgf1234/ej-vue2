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

const edges = [
  ['1', '1-1'],
  ['1', '1-2'],
  ['1', '1-2-1'],
  ['1-2', '1-2-1'],
]

const baseId = '1'

export default {
  data () {
    return {
      nodes,
      edges,
      baseId,
      type: 'Blood',
    }
  }
}
</script>

<style scoped>

</style>
