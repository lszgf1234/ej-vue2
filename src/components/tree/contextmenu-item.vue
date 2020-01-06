<template>
  <div>
    <span>{{ menu.label }}</span>
    <span v-if="menu.children" class="el-icon-arrow-right"></span>
    <!-- 循环 -->
    <template v-if="menu.children && isSelected">
      <slot></slot>
    </template>
  </div>
</template>

<script>
  import {mapGetters, mapActions} from 'vuex'
  import store from './store'

  export default {
    store,
    name: 'EjTreeContextmenuItem',
    props: {
      menu: {
        type: Object,
        default: () => ({})
      },
      level: {
        type: Number,
        default: 0,
      },
    },
    computed: {
      ...mapGetters([
        'commands',
      ]),
      isSelected () {
        const commands = this.commands || []
        return commands[this.level] === this.menu.command
      },
      isLeaf () {
        return !this.menu.children || !this.menu.children.length
      },
    },
  }
</script>

