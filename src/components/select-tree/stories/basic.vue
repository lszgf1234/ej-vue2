<template>
  <div style="width: 800px; margin: 50px auto;">
    <ej-select-tree
      v-model="selOrganizationId"
      :placeholder="placeholder"
      :props="sTProps"
      :options="sTData"
      :accordion="isAccordion"
      :clearable="isClearable"
      @getValue="getValue"/>
  </div>
</template>

<script>
  import {sTData as MockList, sTProps as MockProps} from './mock-data'
  import EjSelectTree from '../select-tree'
  export default {
    components: {
      EjSelectTree,
    },
    data () {
      return {
        selOrganizationId: '207895470398377984',
        placeholder: '请选择机构名称',
        sTData: MockList,
        sTProps: MockProps, // 配置参数（必选）
        isAccordion: true, // 可收起（可选）
        isClearable: true, // 可清空（可选）
      }
    },

    methods: {
      getValue (val) {
        console.log('选中的值是：', val)
      },
    },
  }
</script>
