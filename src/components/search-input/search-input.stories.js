import {storiesOf} from '@storybook/vue'
import {number, text} from '@storybook/addon-knobs'
import {action} from '@storybook/addon-actions'
import Vue from 'vue'

import SearchInput from '.'

Vue.use(SearchInput)

storiesOf('Components|SearchInput', module)
  .add('基本用法', () => ({
    template: `
      <ej-search-input clearable v-model="model" :width="width" :height="height" :placeholder="placeholder" @search="search" class="ml-8 mt-8"/>
    `,
    props: {
      placeholder: {
        default: text('Placeholder', '请输入关键词'),
      },
      width: {
        default: number('Width', 552),
      },
      height: {
        default: number('Height', 40),
      },
    },
    data () {
      return {
        model: '',
      }
    },
    methods: {
      search (...args) {
        action('search')(...args)
      },
    },
  }))
