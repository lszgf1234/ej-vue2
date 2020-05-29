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
  import {sTData as MockList, sTProps as MockProps} from './mock-data'
  import EjSelectTreeSingleMultiple from '../select-tree-single-multiple'
  export default {
    components: {
      EjSelectTreeSingleMultiple,
    },
    data () {
      return {
        selOrganizationId: ['207895470398376879'], // 单选选中值
        selOrganizationIds: ['203521973110837248', '220234370525564928', '185033672389431296'], // 复选选中值
        placeholder: '请选择机构名称',
        sTData: MockList,
        sTProps: MockProps, // 配置参数（必选）
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
