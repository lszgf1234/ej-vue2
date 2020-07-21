<template>
  <div style="width: 800px; margin: 50px auto;">
    <ej-select-tree-single-multiple
      v-model="selOrganizationId"
      :placeholder="placeholder"
      :props="sTProps"
      :options="sTData"
      :clearable="isClearable"
      @getValue="getValue"/>
  </div>
</template>

<script>
  import {sTData as MockList, sTData1 as MockList1, sTProps as MockProps} from './mock-data'
  import EjSelectTreeSingleMultiple from '../select-tree-single-multiple'
  export default {
    components: {
      EjSelectTreeSingleMultiple,
    },
    data () {
      return {
        // 使用 MockList1 的参数
        selOrganizationId: '211426023974244352', // 单选选中值
        selOrganizationIds: ['211443326623289344', '227126110759030784', '229550199461253120'], // 复选选中值

        // 使用 MockList 的参数
        // selOrganizationId: '207895470398376879', // 单选选中值
        // selOrganizationIds: ['203521973110837248', '220234370525564928', '185033672389431296'], // 复选选中值
        
        placeholder: '请选择机构名称',
        sTData: [],
        sTProps: MockProps, // 配置参数（必选）
        isClearable: true, // 可清空（可选）
      }
    },

    created () {
      // console.log(999, MockList1)
      this.sTData = this.covertChildrenData(MockList1)
    },

    methods: {
      getValue (val) {
        console.log('选中的值是：', val)
      },
      // 将数据转换成带children的（通过parentId）
      covertChildrenData (rows) {
        function exists (rows, parentId) {
          for (var i = 0; i < rows.length; i++) {
            if (rows[i].id === parentId) return true
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
          nodes[i].level = 0
          parentNode.push(nodes[i])
        }
        while (parentNode.length) {
          let node = parentNode.shift()
          for (var x = 0; x < rows.length; x++) {
            let rowC = rows[x]
            if (rowC.parentId === node.id) {
              rowC.level = node.level + 1
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
    },
  }
</script>
