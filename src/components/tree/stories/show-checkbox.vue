<template>
  <ej-tree :data="data"
            show-checkbox
            :default-expanded-ids="['0','00001']"
            @node-click="onHandleNodeClick"
            @check-change="onHandleCheckChange"
            ref="tree"
            style="width: 30%;" />
</template>

<script>
  export default {
    data () {
      return {
        data: [
          {
            id: '-1',
            label: '我的文档',
            children: [
              {id: '2', label: '这是一条很长很长很长的数据，这是一条很长很长很长的数据，这是一条很长很长很长的数据，这是一条很长很长很长的数据'},
              {id: '3', label: 'about'},
              {
                id: '0',
                label: '照片',
                children: [
                  {id: '00001', label: '朋友'},
                  {id: '00002', label: '同事'},
                  {id: '00003', label: '这是一条很长很长很长的数据，这是一条很长很长很长的数据，这是一条很长很长很长的数据，这是一条很长很长很长的数据'},
                ],
              },
              {
                id: '1',
                label: '文档',
                children: [
                  {id: '10001', label: 'intel'},
                  {id: '10002', label: '游戏'},
                ],
              },
            ],
          },
        ],
      }
    },
    methods: {
      onHandleNodeClick ({data, node}) {
        console.log(`当前点击了${data.label}节点`)
      },
      onHandleCheckChange () {
        console.log(arguments, 'onHandleCheckChange')
      },
    },
    mounted () {
      this.$refs['tree'].setCurrentNode(this.data[0].children[0])
      let currentNode = this.$refs['tree'].getCurrentTreeData()
      console.log(currentNode)
    },
  }
</script>
