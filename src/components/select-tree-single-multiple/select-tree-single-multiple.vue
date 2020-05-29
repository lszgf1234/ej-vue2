<template>
  <div class="ej-select-tree">
    <el-select
      ref="ejSelect"
      popper-class="ej-select-tree-dropdown"
      :value="valueTitle"
      :placeholder="placeholder"
      filterable
      :multiple="multiple"
      :collapse-tags="multiple"
      :filter-method="filterMethod"
      :clearable="clearable"
      @clear="clearHandle"
      class="select-tree">
      <el-option
        :value="valueId"
        :label="multiple ? null : valueTitle"
        class="selectTree">
        <el-tree
          id="ej-select-tree-option"
          ref="ejSelectOptionTree"
          :accordion="accordion"
          :data="options"
          :props="props"
          :node-key="props.value"
          :show-checkbox="multiple"
          :default-expanded-keys="defaultExpandedKey"
          :expand-on-click-node="false"
          :filter-node-method="filterNode"
          @check-change="handleCheckChange"
          @node-click="handleNodeClick">
        </el-tree>
      </el-option>
    </el-select>
  </div>
</template>

<script>
  import {Select, Option, Tree} from 'element-ui'
  export default {
    name: 'EjSelectTreeSingleMultiple',

    components: {
      [Select.name]: Select,
      [Option.name]: Option,
      [Tree.name]: Tree,
    },

    props: {
      /* 配置项 */
      props: {
        type: Object,
        default: () => ({
          value: 'organizationId',
          label: 'organizationName',
          children: 'children',
        }),
      },
      /* 选项列表数据(树形结构的对象数组) */
      options: {
        type: Array,
        default: () => [],
      },
      /* 多选 */
      multiple: {
        type: Boolean,
        default: false,
      },
      /* 初始值 */
      value: {
        type: Array,
        default: () => [],
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
      accordion: {
        type: Boolean,
        default: false,
      },
    },

    data () {
      return {
        valueId: this.multiple ? [] : '',
        valueTitle: this.multiple ? [] : '',
        defaultExpandedKey: [],
        filterText: '',
      }
    },

    watch: {
      value (val) {
        if (this.multiple) {
          this.valueId = this.arrUnique(this.value)
        } else {
          this.valueId = this.value[0]
        }
        this.initHandle()
      },
      filterText(val) {
        this.$refs.ejSelectOptionTree.filter(val);
      }
    },

    mounted () {
      this.valueId = this.multiple ? this.value : this.value[0] // 初始值
      this.initHandle()
    },

    methods: {
      // 初始化值
      initHandle () {
        if (this.multiple) {
          if (this.valueId.length > 0) {
            this.valueTitle = []
            this.valueId.forEach(item => {
              let curTitle = this.$refs.ejSelectOptionTree.getNode(item).data[this.props.label] // 初始化显示
              this.valueTitle.push(curTitle)
            })
            this.$refs.ejSelectOptionTree.setCheckedKeys(this.valueId) // 设置默认选中
            this.defaultExpandedKey = this.valueId// 设置默认展开
          }
        } else {
          if (this.valueId) {
            this.valueTitle = this.$refs.ejSelectOptionTree.getNode(this.valueId).data[this.props.label] // 初始化显示
            this.$refs.ejSelectOptionTree.setCurrentKey(this.valueId) // 设置默认选中
            this.defaultExpandedKey = [this.valueId] // 设置默认展开
          }
        }
        this.initScroll()
      },
      // 初始化滚动条
      initScroll () {
        this.$nextTick(() => {
          let scrollWrap = document.querySelectorAll('.ej-select-tree-dropdown .el-scrollbar .el-select-dropdown__wrap')[0]
          let scrollBar = document.querySelectorAll('.ej-select-tree-dropdown .el-scrollbar .el-scrollbar__bar')
          scrollWrap.style.cssText = 'margin: 0px; max-height: none; overflow: hidden;'
          scrollBar.forEach(ele => {
            ele.style.width = 0
          })
        })
      },
      // 清除选中
      clearHandle () {
        this.valueTitle = this.multiple ? [] : ''
        this.valueId = this.multiple ? [] : ''
        this.defaultExpandedKey = []
        this.$refs.ejSelectOptionTree.setCheckedKeys([])
        this.clearSelected()
        this.$emit('getValue', this.multiple ? [] : '')
      },
      /* 清空选中样式 */
      clearSelected () {
        let allNode = document.querySelectorAll('#ej-select-tree-option .el-tree-node')
        allNode.forEach((element) => element.classList.remove('is-current'))
      },
      // 搜索
      filterMethod (val) {
        this.filterText = val
      },
      // 过滤查找树节点
      filterNode (value, data) {
        if (!value) return true
        return data[this.props.label].indexOf(value) !== -1
      },
      // 树复选框-多选事件
      handleCheckChange (data, checked, indeterminate) {
        // 获取半选中父节点、子节点：合并
        console.log(555)
        let curSNodes = this.$refs.ejSelectOptionTree.getCheckedNodes()
        this.valueTitle = []
        curSNodes.forEach(item => {
          let curTitle = this.$refs.ejSelectOptionTree.getNode(item).data[this.props.label] // 初始化显示
          let curID = this.$refs.ejSelectOptionTree.getNode(item).data[this.props.value]
          this.valueTitle.push(curTitle)
          this.valueId.push(curID)
        })
        this.$emit('getValue', curSNodes)
        // this.$refs.ejSelect.handleClose()
      },
      // 树单选事件
      handleNodeClick (node) {
        if (!this.multiple) {
          this.valueTitle = node[this.props.label]
          this.valueId = node[this.props.value]
          this.$emit('getValue', node)
          this.defaultExpandedKey = []
          this.$refs.ejSelect.handleClose() // 选中后，收缩树形下拉框组件
        }
      },
      // 数组去重
      arrUnique (arr) {
        var newArr = []
        for (let i = 0; i < arr.length; i++) {
          if (newArr.indexOf(arr[i]) === -1) {
            newArr.push(arr[i])
          }
        }
        return newArr
      },
    },
  }
</script>

<style lang="scss">
  .ej-select-tree-dropdown {
    .is-current {
      color:rgb(71, 125, 233);
      background: #F5F5F5;
    }

    // 有子项时，子项样式不选中
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
<style lang="css" scoped>
  .ej-select-tree-dropdown .el-scrollbar__view .selectTree{
    height: auto;
    max-height: 274px;
    padding: 0;
    overflow: hidden;
    overflow-y: auto;
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

  .el-tree >>>.is-current .el-tree-node__label{
    color: #409EFF;
    font-weight: 700;
  }

  .el-tree >>>.is-current .el-tree-node__children .el-tree-node__label{
    color:#606266;
    font-weight: normal;
  }
</style>
