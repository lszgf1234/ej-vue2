import directive from './directive'

export default {
  directive,
  install: Vue => Vue.use(directive),
}
