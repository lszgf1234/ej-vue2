<template>
  <div class="ej-select-tree">
    <el-select
      ref="ejSelect"
      popper-class="ej-select-tree-dropdown"
      :value="model"
      :placeholder="placeholder"
      filterable
      :multiple="multiple"
      :collapse-tags="multiple"
      :filter-method="filterMethod"
      :clearable="clearable"
      @remove-tag="remove"
      @clear="clearHandle"
      class="select-tree">
      <el-option :value="model" class="selectTree">
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
      <!-- 隐藏option，用于回显 -->
      <el-option
        v-for="item in hiddenLabels"
        :key="item.value"
        :value="item.value"
        :label="item.label"
        class="hidden"
      />
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
        type: [Array, String],
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
        defaultExpandedKey: [],
        filterText: '',
        hiddenLabels: [],
      }
    },

    computed: {
      // 双向绑定value
      model: {
        get () {
          return this.value
        },
        set (val) {
          this.$emit('input', this.multiple ? this.arrUnique(val) : val)
        },
      },
    },

    watch: {
      filterText (val) {
        this.$refs.ejSelectOptionTree.filter(val)
      },
      model: {
        immediate: true,
        handler (newVal) {
          this.setInit()
        },
      },
    },

    methods: {
      setInit () {
        const values = this.model
        // 清空
        if (!values || !values.length) {
          this.hiddenLabels = []
          this.defaultExpandedKey = []
          this.$nextTick(() => {
            this.$refs.ejSelectOptionTree.setCheckedKeys([])
            this.$refs.ejSelectOptionTree.setCurrentKey(null)
            // setCheckedKeys(null)
          })
          return
        }

        // 设置关联值
        this.$nextTick(() => {
          const treeEl = this.$refs.ejSelectOptionTree
          if (treeEl) {
            // 多选
            if (this.multiple) {
              // 设置选中项
              treeEl.setCheckedKeys(values)
              // 设置展开项
              this.defaultExpandedKey = [...values]
              this.hiddenLabels = values.map(id => {
                const label = treeEl.getNode(id).data[this.props.label] 
                return {
                  value: id,
                  label,
                }
              })
            } else {
              // 单选
              treeEl.setCurrentKey(values)
              // 设置展开项
              this.defaultExpandedKey = [values]
              this.hiddenLabels = [
                {
                  value: values,
                  label: treeEl.getNode(values).data[this.props.label],
                },
              ]
            }
          }
        })
      },

      remove (id) {
        const removeIndex = this.model.findIndex(item => item === id)
        if (removeIndex !== -1) {
          this.model.splice(removeIndex, 1)
        }
      },

      // // 初始化滚动条
      // initScroll () {
      //   this.$nextTick(() => {
      //     let scrollWrap = document.querySelectorAll('.ej-select-tree-dropdown .el-scrollbar .el-select-dropdown__wrap')[0]
      //     let scrollBar = document.querySelectorAll('.ej-select-tree-dropdown .el-scrollbar .el-scrollbar__bar')
      //     scrollWrap.style.cssText = 'margin: 0px; max-height: none; overflow: hidden;'
      //     scrollBar.forEach(ele => {
      //       ele.style.width = 0
      //     })
      //   })
      // },

      // 清除选中
      clearHandle () {
        this.model = this.multiple ? [] : ''
        this.filterText = ''
        this.$emit('getValue', this.model)
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
        const curNodes = this.$refs.ejSelectOptionTree.getCheckedNodes(true)
        this.model = curNodes.map(item => item[this.props.value])
        this.$emit('getValue', curNodes)
        this.$refs.ejSelect.handleClose()
      },
      // 树单选事件
      handleNodeClick (data) {
        if (!this.multiple) {
          this.model = data[this.props.value]
          this.$emit('getValue', data)
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
  .el-select-dropdown__wrap {
    max-height: 474px;
  }

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
    max-height: 474px;
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
