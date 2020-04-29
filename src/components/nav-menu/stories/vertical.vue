<template>
  <ej-nav-menu  style="width: 200px;"
                mode="vertical"
                :collapse="collapse"
                 class="el-menu-vertical-demo">
    <el-menu-item index="_0">
      <span>首页</span>
    </el-menu-item>

    <ej-nav-submenu index="_3"
                    :show-timeout="100"
                    mode="vertical">
      <template #title>更多</template>
      <el-menu-item index="_3-1">
        <span>数据地图</span>
      </el-menu-item>
      <el-menu-item index="_3-2">
        <span><a href="javascript:" target="_blank">政策法规</a></span>
      </el-menu-item>
    </ej-nav-submenu>
  </ej-nav-menu>
</template>

<script>
  import {MenuItem as ElMenuItem} from 'element-ui'
  import {boolean, text, number} from '@storybook/addon-knobs'

  export default {
    components: {
      ElMenuItem,
    },

    data () {
      return {
        model: '',
      }
    },

    props: {
      collapse: {
        default: boolean('Collapse', false),
      },
    },
  }
</script>

<style>
  .el-menu-vertical-demo:not(.el-menu--collapse) {
    width: 200px;
    min-height: 400px;
  }
</style>
