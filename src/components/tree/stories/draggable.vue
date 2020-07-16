<template>
  <ej-tree :data="data"
            collapse-icon="classic"
            show-line
            draggable
            :default-expanded-ids="['0','00001']"
            :allow-drop="allowDrop"
            :allow-drag="allowDrag"
            @node-click="onHandleNodeClick"
            ref="tree" />
</template>

<script>
  import {
    Message,
  } from 'element-ui'

  export default {
    data () {
      return {
        data: [
          {
            id: '-1',
            label: '我的文档',
            iconClass: 'folder',
            children: [
              {
                id: '0',
                label: '照片',
                iconClass: 'folder',
                children: [
                  {id: '00001', label: '朋友', iconClass: 'file'},
                  {id: '00002', label: '同事', iconClass: 'file'},
                ],
              },
              {
                id: '1',
                label: '文档',
                iconClass: 'folder',
                children: [
                  {id: '10001', label: 'intel', iconClass: 'file'},
                  {id: '10002', label: '游戏', iconClass: 'file'},
                ],
              },
              {id: '2', label: '不可拖拽节点', iconClass: 'file', draggable: false},
              {id: '3', label: '不可以放置子节点', iconClass: 'file', dropForbidden: ['inner']},
            ],
          },
        ],
      }
    },
    methods: {
      onHandleNodeClick ({data, node}) {
        console.log(`当前点击了${data.label}节点`)
      },
      allowDrag (node) {
        const {data: {draggable}} = node
        return draggable !== false
      },
      allowDrop (draggingNode, dropNode, type) {
        const {data: {dropForbidden = []}} = dropNode
        return !dropForbidden.includes(type)
      },
    },
    mounted () {
      this.$refs['tree'].setCurrentNode(this.data[0].children[0])
      let currentNode = this.$refs['tree'].getCurrentTreeData()
      console.log(currentNode)
    },
  }
</script>

<style lang="scss">
  .ej-tree {

    .folder {
      background-color: wheat;
    }

    .file {
      background-color: lightskyblue;
    }
  }
</style>
