<template>
  <li class="nav-menu">
    <ul>
      <nav-sub-menu-item
        v-for="(menu, index) in menus"
        :key="key + '_' + index"
        :item="menu"
        :index="!isCollapsedMenu ? index : rootMenu.menus.length"
        :width="!isCollapsedMenu ? widthIndex[index] : 0"
        :ref="`menu${index}`"
        :is-collapsed-menu="isCollapsedMenu"
        is-first-layer
        class="nav-menu"
      >
      </nav-sub-menu-item>
    </ul>
  </li>
</template>

<script>
import NavSubMenuItem from './nav-sub-menu-item';
import NavMenuItem from './nav-menu-item';
import menuMixin from './menu-mixin';

export default {
  name: 'NavMenu',

  components: {
    NavSubMenuItem,
    NavMenuItem
  },

  mixins: [menuMixin],

  props: {
    menus: {
      type: Array,
      default: () => ([])
    },
    isCollapsedMenu: {
      type: Boolean,
      default: false
    }
  },

  data() {
    return {
      widthIndex: {},
      elIndex: {},
      popperIndex: {},
      key: 1
    };
  },

  computed: {
  },

  watch: {
    menus(val, old) {
      if (JSON.stringify(val) === JSON.stringify(old)) return;
      this.$nextTick(() => {
        val.forEach((item, index) => {
          let el = this.$refs[`menu${index}`][0].$el.querySelector('.nav-bar-menu-item');
          this.elIndex[index] = el;
          this.widthIndex[index] = el.offsetWidth;
        });
        this.key++;
      });
    }
  },

  mounted() {
  },

  methods: {
    adjustWidth(index) {
      let el = this.$refs[`menu${index}`][0].$el;
      let menus = el.querySelectorAll('.nav-menu-item:not(.nav-bar-menu-item)');
      let max = 0;
      menus.forEach((obj) => {
        let width = obj.innerText.length * 14 + 30;
        max = Math.max(max, width);
      });
      return max;
    }
  }
};
</script>
<style lang="scss">
@import "./style";
</style>
