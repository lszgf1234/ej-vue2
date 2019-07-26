<template>
  <div style="width: 800px; margin: 50px auto;">
    <ej-search-select v-model="keyword"
                      :select-props="selectProps"
                      :select-on="selectOn"
                      @search="search"/>
  </div>
</template>

<script>
  import {action} from '@storybook/addon-actions'

  export default {
    data () {
      return {
        keyword: 'keyword',
        // el-select props & attr
        selectProps: {
          value: '03', // value对应v-model的值
          clearable: true,
          placeholder: '请选择检索条件',
          options: [
            {value: '01', label: '西文排版'},
            {value: '02', label: '设计中的设计'},
            {value: '03', label: '版式设计原理'},
            {value: '04', label: '色彩设计的原理'},
            {value: '06', label: '一字一生'},
          ],
        },
        // el-select 事件
        selectOn: {
          'change': (value) => {
            action('change')(value)
          },
          'visible-change': (value) => {
            action('visible-change')(`下拉框${value ? '出现' : '隐藏'}`)
          },
        },
      }
    },

    methods: {
      search (value) {
        action('search')(value)
      },
    }
  }
</script>

