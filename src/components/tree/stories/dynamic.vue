<template>
  <ej-tree :data="data"
           :contextmenu="contextMenu"
           :default-expanded-ids="defaultExpandedIds"
           show-line
            collapse-icon="classic"
            class="dynamic-tree"
            @node-click="onNodeClick"
            @more-click="onMoreClick"
            @command="onCommand"
            style="width: 30%;">
    <template #default="{node, data}">
      <el-tooltip effect="dark" :content="`${data.label}${data.subLabel ? `(${data.subLabel})` : ''}`" placement="top" popper-class="tree-tooltip">
        <div class="node-label">
          <!-- <ej-icon :icon="data.icon" /> -->
          {{ data.label }}<div class="node-label__subLabel" v-if="data.subLabel">({{ data.subLabel }})</div>
        </div>
      </el-tooltip>
    </template>
    <template #morePrefix="{ node, data }">
      <span class="node-operate">查看详情</span>
    </template>
  </ej-tree>
</template>

<script>
  import {
    Tooltip as ElTooltip,
  } from 'element-ui'

  import EjIcon from '../../icon'

  export default {
    components: {
      ElTooltip,

      EjIcon,
    },
    data () {
      return {
        data: [
          {
            id: '0',
            label: '北京市',
            subLabel: '首都',
            icon: 'folder',
            children: [
              {
                id: '00001',
                label: '北京市',
                subLabel: '直辖市',
                icon: 'folder',
                children: [
                  {id: '000010001', label: '朝阳区', subLabel: '主城区', icon: 'file'},
                  {id: '000010002', label: '海淀区', disabled: true, icon: 'file'},
                  {id: '000010003', label: '东城区', icon: 'file'},
                ],
              },
            ],
          },
          {
            id: '1',
            label: '天津市',
            type: 'c-government',
            icon: 'folder',
            children: [
              {
                id: '000001',
                label: '北京市',
                subLabel: '直辖市',
                icon: 'folder',
                children: [
                  {id: '0000100001', label: '朝阳区', subLabel: '主城区', icon: 'file'},
                  {id: '0000100002', label: '海淀区', disabled: true, icon: 'file'},
                  {id: '0000100003', label: '东城区', icon: 'file'},
                ],
              },
            ],
          },
          {
            id: '2',
            label: '这是一条很长很长很长的数据，这是一条很长很长很长的数据，这是一条很长很长很长的数据，这是一条很长很长很长的数据',
            icon: 'folder',
            children: [
              {id: '2000100001', label: '这是一条很长很长很长的数据，这是一条很长很长很长的数据，这是一条很长很长很长的数据，这是一条很长很长很长的数据', icon: 'file'},
            ],
          },
        ],
        contextMenu: [
          {command: 'check', label: '查看'},
          {command: 'remove', label: '删除', disabled: true},
        ],
        defaultExpandedIds: ['000010001'],
      }
    },
    methods: {
      onNodeClick ({data, node}) {
        console.log(`当前点击的节点为${data.label}`)
      },
      onMoreClick ({data, node}) {
        console.log(`${data.label}的更多操作列表`, node)
      },
      onCommand ({commands, data}) {
        console.log(`${data.label}的当前操作是： ${commands}`)
      },
    },
  }
</script>

<style lang="scss">
  .dynamic-tree {
    .node-label {
      &__subLabel {
        @apply inline-block;

        margin-left: 10px;
        font-size: 12px;
        color: #ccc;
        line-height: 12px;
        height: 12px;
      }
    }

    .el-tree-node__more {
      font-size: 0;
    }

    .node-operate {
      font-size: 12px;
    }
  }
</style>
