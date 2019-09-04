import {storiesOf} from '@storybook/vue'
import {text} from '@storybook/addon-knobs'
import Vue from 'vue'

import {Button as ElButton} from 'element-ui'

import SearchSetName from '.'

Vue.use(ElButton)
Vue.use(SearchSetName)


storiesOf('Components|SearchSetName', module)
  .add('基本用法', () => ({
    template: `
      <div class="ml-16 mt-16">
        <div class="flex mb-5">
          <ej-search-set-name v-model="model" title="01设置">
            <el-button>01按钮</el-button>
          </ej-search-set-name>

          <ej-search-set-name v-model="model" title="02设置" number placeholder="只能输入数字" class="ml-10">
            <el-button>02按钮</el-button>
          </ej-search-set-name>
        </div>
        设置内容：{{model}}
      </div>
    `,

    data () {
      return {
        model: '',
      }
    },
  }))
