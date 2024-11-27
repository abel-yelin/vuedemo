<template>
  <el-tree :allow-drag="allowDrag" :allow-drop="allowDrop" :data="data" default-expand-all draggable node-key="id" />
</template>

<script lang="ts" setup>
import type Node from 'element-plus/es/components/tree/src/model/node'
import type { AllowDropType } from 'element-plus/es/components/tree/src/tree.type'

const allowDrop = (draggingNode: Node, dropNode: Node, type: AllowDropType) => {
  if (dropNode.data.label === '二级 3-1') {
    return type !== 'inner'
  } else {
    return true
  }
}

const allowDrag = (draggingNode: Node) => {
  return !draggingNode.data.label.includes('三级 3-1-1')
}

const data = [
  {
    label: '一级 1',
    children: [
      {
        label: '二级 1-1',
        children: [
          {
            label: '三级 1-1-1',
          },
        ],
      },
    ],
  },
  {
    label: '一级 2',
    children: [
      {
        label: '二级 2-1',
        children: [
          {
            label: '三级 2-1-1',
          },
        ],
      },
      {
        label: '二级 2-2',
        children: [
          {
            label: '三级 2-2-1',
          },
        ],
      },
    ],
  },
  {
    label: '一级 3',
    children: [
      {
        label: '二级 3-1',
        children: [
          {
            label: '三级 3-1-1',
          },
        ],
      },
      {
        label: '二级 3-2',
        children: [
          {
            label: '三级 3-2-1',
          },
        ],
      },
    ],
  },
]
</script>
