
import Vue from 'vue'
import LoadingComp from './loading.vue'

const Mask = Vue.extend(LoadingComp)

const Loading = {}

Loading.install = Vue => {
  Vue.directive('loading', {
    bind: (el, binding) => {
      const mask = new Mask({
        el: document.createElement('div'),
        data: {
          fullscreen: !!binding.modifiers.fullscreen,
        },
      })

      el.instance = mask

      const curStyle = window.getComputedStyle(el)
      const position = curStyle.position
      const positionProps = ['absolute', 'relative', 'fixed']

      el.style.position = positionProps.includes(position) ? position : 'relative'

      if (binding.value) {
        el.appendChild(el.instance.$el)
      }
    },

    update: (el, binding) => {
      if (binding.value) {
        if (el.instance.$el.parentNode === null) {
          el.appendChild(el.instance.$el)
        }
      } else {
        if (el === el.instance.$el.parentNode) {
          el.removeChild(el.instance.$el)
        }
      }
    },

    unbind: (el) => {
      if (el === el.instance.$el.parentNode) {
        el.removeChild(el.instance.$el)
      }
      el.instance = null
    },
  })
}

export default Loading
