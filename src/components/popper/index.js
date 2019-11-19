import Popper from './popper.vue'

export default {
  ...Popper,
  install: Vue => Vue.component(Popper.name, Popper),
}
