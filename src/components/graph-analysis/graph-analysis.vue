<template>
  <div ref="echart"
       :style="style"
       class="echart"></div>
</template>

<script>
/**
 * 安装echarts
 * 按需加载graph
 * 处理数据
 * 显示*/
/**
 * 血缘分析：汇聚到一个点
 * 影响分析：向下影响到其他
 * */
/**
 * 问题
 * 悬停线不显示 tooltip
 *
 * */
import echarts from 'echarts/lib/echarts'
import 'echarts/lib/chart/graph'
import 'echarts/lib/chart/tree'
import 'echarts/lib/component/tooltip'

export default {
  name: 'GraphAnalysis',

  props: {
    nodes: {
      type: Array,
      default: () => [],
    },
    edges: {
      type: Array,
      default: () => [],
    },
    baseId: {
      type: String,
      default: null,
      required: true,
    },
    type: {
      type: String,
      default: 'Blood',
    },
  },

  data () {
    return {
      height: '500px',
      width: '500px',
      myChart: null,
    }
  },

  computed: {
    style () {
      return {height: this.height , width: this.width}
    }
  },

  watch: {
    baseId () {
      this.handleResize()
    },
    nodes () {
      this.handleResize()
    },
    edges () {
      this.handleResize()
    },
    type () {
      this.handleResize()
    },
  },

  mounted () {
    this.setTree()
    this.handleResize()
  },

  methods: {
    setOptions () {
      const SPACING_X = -200
      const SPACING_Y = 40
      const FIX_Y = 20

      const nodes = this.nodes
      const edges = this.edges
      const BASE_ID = this.baseId

      /**
       * 设置一个nodeMap对象*/
      const nodesMap = nodes.reduce((map, node) => {
        map[node.id] = node
        return map
      }, {})

      /**设置第一层
       * */
      Object.assign(nodes.find(({id}) => id === BASE_ID), {level: 0})

      /**设置其他数据层级
       * */
      void (function calcLevels (parentNodeIds) {
        const nextLevel = nodesMap[parentNodeIds[0]].level + 1
        const childNodeIds = edges.filter(([from, to]) => parentNodeIds.includes(from)).map(([from, to]) => to)
        if (childNodeIds.length) {
          for (const node of childNodeIds.map(id => nodesMap[id])) {
            node.level = nextLevel
          }
          calcLevels(childNodeIds)
        }
      }([BASE_ID]))

      const nodeLevels = nodes.reduce((levels, {level, id}) => {
        if (!levels[level]) {
          levels[level] = []
        }
        levels[level].push(id)
        return levels
      }, [])

      const levelSizes = nodeLevels.map(ids => ids.length)
      const maxY = SPACING_Y * (Math.max(...levelSizes) - 1)
      nodeLevels.forEach((ids, x) => {
        const offset = (maxY - (ids.length - 1) * SPACING_Y) / 2
        ids.forEach((id, y) => {
          const node = nodesMap[id]
          node.x = SPACING_X * x
          node.y = offset + SPACING_Y * y
        })
      })
      this.height = `${maxY + FIX_Y}px`
      let width = (14 + (-SPACING_X)) * levelSizes.length - (-SPACING_X) + 190 + 20 + 100
      this.width = `${width}px`

      const edges1 = edges.map(([source, target]) => ({
        source,
        target,
      }))
      return {
        tooltip: {
          trigger: 'item',
          triggerOn: 'mousemove',
          padding: [16, 24],
          formatter: (params) => {
            let _params = params.data
            return `<p>名称： ${_params.name || '--'}</p>`
          },
        },
        series: [{
          type: 'graph',
          focusNodeAdjacency: true,
          left: 20,
          label: {
            show: true,
            position: 'right',
            formatter: (val) => {
              let num = 20
              return val.name.length > num ? `${val.name.slice(0, num)}...` : val.name
            },
          },
          lineStyle: {
            curveness: 0.05,
          },
          edgeSymbol: ['none', 'arrow'],
          edgeSymbolSize: 8,
          nodes,
          edges: edges1,
        }],
      }
    },
    setTree () {
      // let option = this.option
      let option = this.setOptions()
      if (!Object.keys(option)) return

      let myChart = echarts.init(this.$refs.echart)
      this.myChart = myChart
      this.myChart.resize()
      myChart.setOption(option)
    },
    handleResize () {
      this.$nextTick(() => {
        this.myChart.resize()
      })
    },
  },
}
</script>

<style lang="scss">
.echart {
  display: flex;
}
</style>
