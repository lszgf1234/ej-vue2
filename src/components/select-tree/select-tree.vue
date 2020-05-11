<template>
  <div class="ej-select-tree">
    <el-select
      ref="ejSelect"
      :value="valueTitle"
      :placeholder="placeholder"
      :clearable="clearable"
      @clear="clearHandle"
      class="select-tree">
      <el-option
        :value="valueId"
        :label="valueTitle"
        class="selectTree">
        <el-tree id="tree-option"
          ref="ejSelectOptionTree"
          :accordion="accordion"
          :data="options"
          :props="props"
          :node-key="props.value"
          :default-expanded-keys="defaultExpandedKey"
          :expand-on-click-node="false"
          @node-click="handleNodeClick">
        </el-tree>
      </el-option>
    </el-select>
  </div>
</template>

<script>
  import {Select, Option, Tree} from 'element-ui'
  export default {
    name: 'EjSelectTree',

    components: {
      [Select.name]: Select,
      [Option.name]: Option,
      [Tree.name]: Tree,
    },

    props: {
      /* 配置项 */
      props:{
        type: Object,
        default: () => ({
          value: 'organizationId',
          label: 'organizationName',
          children: 'children',
        }),
      },
      /* 选项列表数据(树形结构的对象数组) */
      options:{
        type: Array,       
        default: () => {[]}
      },
      /* 初始值 */
      value: {
        type: String,
        default: null,
      },
      placeholder: {
        type: String,
        default: '请选择',
      },
      /* 可清空选项 */
      clearable: {
        type: Boolean,
        default: true,
      },
      /* 自动收起 */
      accordion:{
        type: Boolean,
        default: false,
      },
    },

    data () {
      return {
        valueId: null,
        valueTitle: '',
        defaultExpandedKey: [],
      }
    },

    watch: {
      value () {
        this.valueId = this.value
        this.initHandle()
      },
    },

    mounted () {
      this.initHandle()
    },

    methods: {
      // 初始化值
      initHandle () {
        if (this.valueId) {
          this.valueTitle = this.$refs.ejSelectOptionTree.getNode(this.valueId).data[this.props.label] // 初始化显示
          this.$refs.ejSelectOptionTree.setCurrentKey(this.valueId) // 设置默认选中
          this.defaultExpandedKey = [this.valueId] // 设置默认展开
        }
        this.initScroll()
      },
      // 初始化滚动条
      initScroll(){
        this.$nextTick(()=>{
          let scrollWrap = document.querySelectorAll('.el-scrollbar .el-select-dropdown__wrap')[0]
          let scrollBar = document.querySelectorAll('.el-scrollbar .el-scrollbar__bar')
          scrollWrap.style.cssText = 'margin: 0px; max-height: none; overflow: hidden;'
          scrollBar.forEach(ele => {
            ele.style.width = 0
          })
        })
      },
      handleNodeClick (node) {
        this.valueTitle = node[this.props.label]
        this.valueId = node[this.props.value]
        this.$emit('getValue', this.valueId)
        this.defaultExpandedKey = []
        this.$refs.ejSelect.handleClose()
      },
      // 清除选中
      clearHandle () {
        this.valueTitle = ''
        this.valueId = null
        this.defaultExpandedKey = []
        this.clearSelected()
        this.$emit('getValue', null)
      },
      /* 清空选中样式 */
      clearSelected () {
        let allNode = document.querySelectorAll('#tree-option .el-tree-node')
        allNode.forEach((element) => element.classList.remove('is-current'))
      },
    },
  }
</script>

<style lang="scss">
  .ej-select-tree {

    .select-tree {
      .el-input__suffix, .el-input__suffix-inner {
        outline: none;
      }
      .is-focus {
        .el-icon-circle-close {
          line-height: 29px;
        }
      }
    }

    .el-select-dropdown__item.selected{
      font-weight: normal;
    }

    ul li >>>.el-tree .el-tree-node__content{
      height:auto;
      padding: 0 20px;
    }

    .el-tree-node__label{
      font-weight: normal;
    }

    .is-current {
      color:rgb(71, 125, 233);
      background: #F5F5F5;
    }

    .is-expanded {
      &.is-current {
        .el-tree-node__children {
          color: #606266;
          background: #FFFFFF;
        }
      }
    }
  }
</style>
<style scoped>
  .el-scrollbar .el-scrollbar__view .selectTree{
    height: auto;
    max-height: 274px;
    padding: 0;
    overflow: hidden;
    overflow-y: auto;
  }
</style>