<script lang="jsx">
  import Vue from 'vue'
  import {Tree as ElTree} from 'element-ui'

  Vue.use(ElTree)

  export default {
    name: 'EjTree',

    functional: true,

    render: (h, {props, data: $data}) => {
      /**
       * tree样式: general | dottedline
       */
      const _layoutStyle = props.layoutStyle ? props.layoutStyle : 'general'

      return (
        <div class="tree-view">
          <el-tree {...{...$data, ...props, ref: $data.ref || 'tree', staticClass: `${_layoutStyle}`}}/>
        </div>
      )
    },
  }
</script>

<style lang="scss">
  .tree-view {
    .dottedline {
      & > .el-tree-node {
        margin-left: 6px;
      }

      .el-tree-node {
        @apply relative outline-none whitespace-no-wrap border-l border-dashed border-gray;

        margin-left: 13px;

        & > .el-tree-node__content:active,
        &.is-current > .el-tree-node__content {
          background: transparent !important;
        }
      }

      .el-tree-node__label {
        @apply pl-4;
      }

      // .el-tree-node__expand-icon.is-leaf + .el-tree-node__label {
      //   @apply pl-10;
      // }

      .el-tree-node__content {
        padding-left: 0 !important;

        &:hover {
          @apply text-blue;

          background: #f7f7f7;
        }

        & > .el-tree-node__expand-icon {
          @apply absolute bg-white border border-solid border-gray;

          padding: 5px;
          left: -7px;
        }

        & > label.el-checkbox {
          margin-right: 8px;
          margin-left: 8px;
        }

        .el-tree-node__expand-icon + .el-checkbox + .el-tree-node__label {
          @apply pl-0 #{!important};
        }
      }

      .el-icon-caret-right:before {
        @apply absolute;

        left: -1px;
        top: -1px;
        content: "\E6D9";
      }

      .el-tree-node__expand-icon.is-leaf {
        @apply relative text-blue bg-white cursor-default z-10;

        border: none;
        padding: 0 !important;
        padding-left: 5px !important;
        left: 7px;

        &::before {
          @apply bg-white absolute invisible;

          content: "\E785";
          border: none;
          left: 7px;
          top: -5px;
        }

        &::after {
          @apply absolute border-b border-dashed border-gray;

          content: '';
          width: 8px;
          height: 2px;
          left: -5px;
          top: -1px;
        }
      }

      .el-tree-node__expand-icon.expanded {
        transform: none;

        &::before {
          content: "\E6D8";
        }
      }
    }
  }
</style>
