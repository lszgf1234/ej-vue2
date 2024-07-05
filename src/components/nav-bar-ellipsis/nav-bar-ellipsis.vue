<template>
  <div
    :class="`nav-bar-${theme}`"
    :style="{width: navWidth, height: height}"
    class="nav-bar overflow-hidden"
  >
    <div
      ref="content"
      class="nav-bar-content">
      <ul class="nav-menu-list">
        <nav-menu
          ref="mainMenu"
          :menus="menus"
          :class="{
            'show-active-background': barBackgroundActive,
            'show-underline': underline
          }"
        />
        <nav-menu
          v-if="collapsed"
          :menus="[moreMenu]"
          :index="menus.length"
          :class="{
            'show-active-background': barBackgroundActive,
            'show-underline': underline
          }"
          is-collapsed-menu
        />
      </ul>
    </div>
  </div>
</template>

<script>
import cssVarPoly from './css-var-polyfill';

import NavSubMenuItem from './nav-sub-menu-item';
import NavMenu from './nav-menu';
import menuMixins from './menu-mixin';

const overflowedTemplate = {
  hide: false,
  icon: 'more',
  type: 'overflowed'
};

export default {
  name: 'EjNavBarEllipsis',

  components: {
    NavSubMenuItem,
    NavMenu
  },

  mixins: [menuMixins],

  props: {
    data: {
      type: Array,
      default: () => ([])
    },
    defaultActive: {
      type: String,
      default: null
    },
    routeMode: {
      type: Boolean,
      default: false
    },
    trigger: {
      type: String,
      default: 'click'
    },
    theme: {
      type: String,
      default: 'light'
    },
    themeColor: {
      type: String,
      default: '#1890ff'
    },
    backgroundColor: {
      type: String,
      default: '#1890ff1a'
    },
    barBackgroundColor: {
      type: String,
      default: '#141f2e'
    },
    /* darkColor: {
      type: String,
      defualt: '#2d3a4b'
    }, */
    align: {
      type: String,
      default: 'fluid' // 'fixed' or 'fluid'
    },
    width: {
      type: [Number, String],
      default: null
    },
    arrow: {
      type: Boolean,
      default: false
    },
    appendToBody: {
      type: Boolean,
      default: true
    },
    barBackgroundActive: {
      type: Boolean,
      default: true
    },
    underline: {
      type: Boolean,
      default: false
    },
    barHeight: {
      type: [String, Number],
      default: 56
    },
    menuHeight: {
      type: [String, Number],
      default: 32
    },
    rootIndex: {
      type: String,
      default: null
    },
    debounce: {
      type: Number,
      default: 300
    }
  },

  data() {
    return {
      activeIndex: this.defaultActive,
      menus: [],
      moreMenu: {},
      collapsed: false,
      collapsedMenu: [],
      key: 10000,
      background: this.backgroundColor
    };
  },

  computed: {
    navWidth() {
      const { width } = this;
      if (!width) {
        return '100%';
      };
      return typeof width === 'string' ? width : `${width}px`;
    },
    defaultMenus() {
      return this.filterHide(this.data);
    },
    elIndex() {
      return this.$refs['mainMenu'].elIndex;
    },
    widthIndex() {
      return this.$refs['mainMenu'].widthIndex;
    },
    height() {
      return typeof this.barHeight === 'string' ? this.barHeight : `${this.barHeight}px`;
    }
  },

  watch: {
    data(val, old) {
      this.menus = this.defaultMenus;
      this.$nextTick(() => {
        this.onWindowResize();
      });
    },
    collapsedMenu(val, old) {
      if (JSON.stringify(val) !== JSON.stringify(old)) {
        this.moreMenu = overflowedTemplate;
        this.moreMenu.children = val;
        this.key++;
      }
    },
    theme(val) {
      if (val === 'light') {
        this.background = this.backgroundColor;
      } else {
        this.background = '#24292e';
      }
      this.setBackgroundColor(this.background);
    },
    themeColor(val) {
      if (val) {
        this.setThemeColor(val);
      }
    },
    backgroundColor(val) {
      if (val) {
        this.setBackgroundColor(val);
      }
    },
    barBackgroundColor(val) {
      if (val) {
        this.setBarBackgroundColor(val);
      }
    }
  },

  created() {
  },

  mounted() {
    this.menus = this.defaultMenus;
    if (this.align === 'fluid') {
      window.addEventListener('resize', this.onWindowResize);
      this.$nextTick(() => {
        setTimeout(() => {
          this.onWindowResize();
        }, this.debounce);
      });
    }

    if (this.theme === 'dark') {
      this.background = '#24292e';
    }

    this.setThemeColor(this.themeColor);
    this.setBackgroundColor(this.background);
    this.setBarBackgroundColor(this.barBackgroundColor);

    this.init();
  },

  beforeDestroy() {
    window.removeEventListener('resize', this.onWindowResize);
  },

  methods: {
    init() {
      cssVarPoly.init();

      // 页面跳转兼容ie
      function checkIE() {
        return '-ms-scroll-limit' in document.documentElement.style && '-ms-ime-align' in document.documentElement.style;
      }

      if (checkIE()) {
        window.addEventListener('hashchange', () => {
          var currentPath = window.location.hash.slice(1);
          if (this.$route.path !== currentPath) {
            this.$router.push(currentPath);
          }
        }, false);
      }
    },
    handleSelect(item, index, indexPath) {
      if (item.path) this.activeIndex = item.path;
      this.$emit('select', item, index, indexPath);
    },

    handleOpen(item, index, indexPath) {
      this.$emit('open', item, index, indexPath);
    },

    handleClose(item, index, indexPath) {
      this.$emit('close', item, index, indexPath);
    },

    setThemeColor(color) {
      document.documentElement.style.setProperty('--THEME-COLOR', color);
      cssVarPoly.updateVars({
        '--THEME-COLOR': this.themeColor,
        '--BACKGROUND-COLOR': this.background,
        '--BAR-BACKGROUND-COLOR': this.barBackgroundColor
      });
    },

    setBackgroundColor(color) {
      document.documentElement.style.setProperty('--BACKGROUND-COLOR', color);
      cssVarPoly.updateVars({
        '--THEME-COLOR': this.themeColor,
        '--BACKGROUND-COLOR': this.background,
        '--BAR-BACKGROUND-COLOR': this.barBackgroundColor
      });
    },

    setBarBackgroundColor(color) {
      document.documentElement.style.setProperty('--BAR-BACKGROUND-COLOR', color);
      cssVarPoly.updateVars({
        '--THEME-COLOR': this.themeColor,
        '--BACKGROUND-COLOR': this.background,
        '--BAR-BACKGROUND-COLOR': this.barBackgroundColor
      });
    },

    onWindowResize() {
      let innerWidth = this.$refs.content.offsetWidth;
      let menus = this.$refs.content.querySelectorAll('.nav-bar-menu-item:not(.nav-bar-overflowed-menu-item)');
      let widthCount = 0;

      this.collapsedMenu = [];
      this.collapsed = false;

      // const { widthIndex, elIndex } = this;
      /* for (let i = 0; i < widthIndex.length; i++) {
        widthCount += widthIndex[i];

        //  宽度超出容器时
        //  当菜单尚未加载完并且空余空间不足
        if (widthCount > innerWidth ||
          (i !== menus.length - 1 && widthCount > innerWidth - 60)) {
          this.collapsedMenu.push(this.menus[i]);
          this.collapsed = true;
          menus[i].style.visibility = 'hidden';
          menus[i].style.position = 'absolute';
          console.error(menus[i].style);
          continue;
        }
        menus[i].style.visibility = 'visible';
        menus[i].style.position = 'relative';
      }
      */
      for (let i = 0; i < menus.length; i++) {
        widthCount += menus[i].offsetWidth;

        //  宽度超出容器时
        //  当菜单尚未加载完并且空余空间不足
        if (widthCount > innerWidth ||
          (i !== menus.length - 1 && widthCount > innerWidth - 60)) {
          this.collapsedMenu.push(this.menus[i]);
          this.collapsed = true;
          menus[i].style.visibility = 'hidden';
          menus[i].style.position = 'absolute';
          continue;
        }
        menus[i].style.visibility = 'visible';
        menus[i].style.position = 'relative';
      }
    }
  }
};
</script>
