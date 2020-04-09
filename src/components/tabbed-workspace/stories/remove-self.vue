<template>
  <div class="story">
    <div class="story-stage">
      <ej-tabbed-workspace v-model="index"
                           :tabs="data"
                           :removeSelf="removeSelf"
                           style="width: 1000px;">
        <template #default="{tab, idx}">
          <pre>{{JSON.stringify({_index: idx, ...tab}, null, 2)}}</pre>
        </template>
      </ej-tabbed-workspace>
    </div>
  </div>
</template>

<script>
  import {logo} from '../../../assets/base64'
  import {Message} from 'element-ui'

  export default {
    data () {
      return {
        index: 1,
        data: [
          {
            name: 'tab1',
            icon: logo,
            closable: false,
          },
          {
            name: 'tab2',
          },
          {
            name: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. A ab accusantium aliquam atque.',
          },
        ],
      }
    },

    methods: {
      removeSelf (it, idx) {
        Message.info({
          message: '自定义移除方式',
        })
      },
    },
  }
</script>
