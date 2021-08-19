import GraphAnalysis from './graph-analysis.vue'

export default {
  ...GraphAnalysis,
  install: Vue => Vue.component(GraphAnalysis.name, GraphAnalysis),
}
