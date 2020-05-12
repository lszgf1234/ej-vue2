<template>
  <div>
    <ej-nav-menu  mode="horizontal"
                  :toggle-button="true"
                  :collapse="collapse"
                  text-color="#fff"
                  active-text-color="#fff"
                  class="app-nav__menu flex"
                  @current-collapses="handleCollapses">

      <el-menu-item index="_0">
        <i class="el-icon-setting"></i>
        <span>首页</span>
      </el-menu-item>

      <ej-nav-submenu index="_3"
                      :show-timeout="100"
                      mode="horizontal">
        <template #title>
          <i class="el-icon-setting"></i>
          <span>更多</span>
          </template>
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
