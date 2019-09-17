import {storiesOf} from '@storybook/vue'
import Vue from 'vue'

import {Button as ElButton} from 'element-ui'

import PopoverSet from '.'

Vue.use(ElButton)
Vue.use(PopoverSet)


storiesOf('Components|PopoverSet', module)
  .add('基本用法', () => ({
    template: `
      <div class="ml-16 mt-16">
        <div class="flex mb-5">
          <ej-popover-set v-model="model" title="01设置">
            <el-button>01按钮</el-button>
          </ej-popover-set>

          <ej-popover-set  v-model="model" title="02设置" number placeholder="只能输入数字" class="ml-10">
            <el-button>02按钮</el-button>
          </ej-popover-set>
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
