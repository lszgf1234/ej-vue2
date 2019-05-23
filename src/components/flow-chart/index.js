import FlowChart from './flow-chart'

export default {
  ...FlowChart,
  install: Vue => Vue.component(FlowChart.name, FlowChart)
}
