import {storiesOf} from '@storybook/vue'
import {text, boolean, optionsKnob as options} from '@storybook/addon-knobs'
import {action} from '@storybook/addon-actions'
import Vue from 'vue'

import searchInput from '.'

Vue.use(searchInput)

storiesOf('searchInput', module)
  .add('基本用法', () => ({
    template: `
      <ej-search-input  v-model="model"
                        :placeholder="placeholder"
                        @search="search"
      />
    `,
    data () {
      return {
        model: ''
      }
    },
    props: {
      placeholder: {
        default: text('placeholder', '请输入资料名称'),
      },
      modelInput: {
        default: text('modelInput', ''),
      },
    },
    methods: {
      search (...args) {
        action('search')(...args)
      },
    },
    watch: {
      modelInput: {
        handler (newVal) {
          this.model = newVal
        },
        immediate: true
      },
    }
  }))
