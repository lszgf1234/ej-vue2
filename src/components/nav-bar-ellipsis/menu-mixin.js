export default {
  computed: {
    indexPath() {
      var path = [this.index];
      var parent = this.$parent;
      while (parent.$options.name !== 'NavMenu') {
        if (parent.index === 0 || parent.index || (parent.index && parent.index !== -1)) {
          path.unshift(parent.index);
        }
        parent = parent.$parent;
      }
      return path;
    },
    rootMenu() {
      var parent = this.$parent;
      while (
        parent &&
        parent.$options.name !== 'EjNavBarEllipsis'
      ) {
        parent = parent.$parent;
      }
      return parent;
    },
    parentMenu() {
      let parent = this.$parent;
      while (
        parent &&
        ['NavMenu', 'NavSubMenuItem'].indexOf(parent.$options.name) === -1
      ) {
        parent = parent.$parent;
      }
      return parent;
    },
    isChildrenHidden() {
      return !this.filterHide(this.item.children || []).length;
    }
  },

  methods: {
    filterHide(data) {
      return data.filter(item => !item.hide);
    }
  }
};
