<template>
  <div>
    <ej-nav-menu  mode="vertical"
                  :toggle-button="true"
                  :collapse="collapse"
                  @current-collapses="handleCollapses"
                  class="el-menu-vertical-demo">

      <el-menu-item index="_0">
        <i class="el-icon-setting"></i>
        <span slot="title">首页</span>
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

    <div @click="collapse = !collapse">收缩菜单</div>
  </div>
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
        collapse: false,
      }
    },

    methods: {
      handleCollapses (val) {
        this.collapse = val
      },
    },
  }
</script>

<style>
  .el-menu-vertical-demo:not(.el-menu--collapse) {
    width: 200px;
  }
</style>
