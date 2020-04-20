<template>
  <div class="ej-select-tree">
    <el-select ref="ejSelect" :value="selValue" :placeholder="placeholder" :clearable="clearable" @clear="clearHandle" class="select-tree">
      <el-option :value="valueId" :label="selValue" class="selectTree">
        <el-tree id="tree-option"
          ref="ejSelectOptionTree"
          :data="treeData"
          :props="treeProps"
          :node-key="nodeKey"
          :default-expanded-keys="defaultExpandedKey"
          :expand-on-click-node="false"
          @node-click="handleNodeClick">
        </el-tree>
      </el-option>
    </el-select>
  </div>
</template>

<script>
  import Vue from 'vue'
  import {Select, Option, Tree} from 'element-ui'
  import QUERY_ORGANIZATION_LIST from './grapgql/query_organization_list.gql'
  export default {
    name: 'EjSelectTree',

    components: {
      [Select.name]: Select,
      [Option.name]: Option,
      [Tree.name]: Tree,
    },

    props: {
      /* 初始值 */
      value: {
        type: String,
        default: '',
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
      treeProps: {
        type: Object,
        default: () => ({
          value: 'organizationId',
          label: 'organizationName',
          children: 'children',
        }),
      },
      nodeKey: {
        type: String,
        default: 'organizationId',
      },
    },

    data () {
      return {
        treeData: [],
        valueId: '',
        selValue: '',
        defaultExpandedKey: [],
      }
    },

    watch: {
      value () {
        this.valueId = this.value ? this.value : ''
      },
    },

    created () {
      Vue.prototype.$apollo = {
        query () {return this},
        mutate () {return this},
        then () {return this},
        catch () {return this},
      }
      this.getOrganizationList()
    },

    mounted () {
      this.valueId = this.value ? this.value : ''
    },

    methods: {
      getOrganizationList () {
        this.$apollo.query({
          query: QUERY_ORGANIZATION_LIST,
          client: 'ucClient',
          fetchPolicy: 'no-cache',
        }).then(data => {
          if (data) {
            let curData = data.data.data
            if (curData) {
              this.treeData = this.covertChildrenData(curData)
              if (this.treeData.length > 0) {
                this.$nextTick(function () {
                  this.$refs.ejSelectOptionTree.setCurrentKey(this.valueId)
                  this.selValue = this.valueId ? this.$refs.ejSelectOptionTree.getNode(this.valueId).data[this.organProps.label] : ''
                  this.defaultExpandedKey = this.valueId ? [this.valueId] : []
                })
              }
              this.$nextTick(() => {
                let scrollWrap = document.querySelectorAll('.el-scrollbar .el-select-dropdown__wrap')[0]
                let scrollBar = document.querySelectorAll('.el-scrollbar .el-scrollbar__bar')
                scrollWrap.style.cssText = 'margin: 0px; max-height: none; overflow: hidden;'
                scrollBar.forEach(ele => {
                  ele.style.width = 0
                })
              })
            }
          }
        })
      },
      covertChildrenData (rows) {
        function exists (rows, parentId) {
          for (var i = 0; i < rows.length; i++) {
            if (rows[i].organizationId === parentId.toString()) return true
          }
          return false
        }
        let nodes = []
        // get the top level nodes
        for (var j = 0; j < rows.length; j++) {
          let row = rows[j]
          if (!exists(rows, row.parentId)) {
            nodes.push(row)
          }
        }
        let parentNode = []
        for (var i = 0; i < nodes.length; i++) {
          parentNode.push(nodes[i])
        }
        while (parentNode.length) {
          let node = parentNode.shift()
          for (var x = 0; x < rows.length; x++) {
            let rowC = rows[x]
            if (rowC.parentId.toString() === node.organizationId) {
              if (node.children) {
                node.children.push(rowC)
              } else {
                node.children = [rowC]
              }
              parentNode.push(rowC)
            }
          }
        }
        return nodes
      },
      // 清除选中
      clearHandle () {
        this.selValue = ''
        this.valueId = null
        this.defaultExpandedKey = []
        this.clearSelected()
        this.$emit('getValue', [])
      },
      /* 清空选中样式 */
      clearSelected () {
        let allNode = document.querySelectorAll('#tree-option .el-tree-node')
        allNode.forEach((element) => element.classList.remove('is-current'))
      },
      handleNodeClick (node) {
        this.selValue = node[this.organProps.label]
        this.valueId = node[this.organProps.value]
        this.$emit('getValue', this.valueId)
        this.defaultExpandedKey = []
        this.$refs.ejSelect.handleClose()
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
          margin-top: 5px;
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

    // .el-tree >>>.is-current .el-tree-node__label{
    //   color: #409EFF;
    //   font-weight: 700;
    // }

    // .el-tree >>>.is-current .el-tree-node__children .el-tree-node__label{
    //   color:#606266;
    //   font-weight: normal;
    // }

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