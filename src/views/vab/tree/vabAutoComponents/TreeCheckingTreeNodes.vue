<template>
  <el-tree ref="treeRef" :data="data" default-expand-all highlight-current node-key="id" :props="defaultProps" show-checkbox />

  <div style="margin-top: 20px">
    <el-button type="primary" @click="getCheckedNodes">按节点获取</el-button>
    <el-button type="primary" @click="getCheckedKeys">按键获取</el-button>
    <el-button type="primary" @click="setCheckedNodes">按节点设置</el-button>
    <el-button type="primary" @click="setCheckedKeys">按键设置</el-button>
    <el-button type="warning" @click="resetChecked">重置</el-button>
  </div>
</template>

<script lang="ts" setup>
import { ElTree } from 'element-plus'
import type Node from 'element-plus/es/components/tree/src/model/node'

interface Tree {
  id: number
  label: string
  children?: Tree[]
}

const treeRef = ref<InstanceType<typeof ElTree>>()

const getCheckedNodes = () => {
  $baseMessage(treeRef.value?.getCheckedNodes(false, false), 'success', 'hey')
}

const getCheckedKeys = () => {
  $baseMessage(treeRef.value?.getCheckedKeys(false), 'success', 'hey')
}

const setCheckedNodes = () => {
  treeRef.value?.setCheckedNodes(
    [
      {
        id: 5,
        label: '二级 2-1',
      },
      {
        id: 9,
        label: '三级 1-1-1',
      },
    ] as Node[],
    false
  )
}

const setCheckedKeys = () => {
  treeRef.value?.setCheckedKeys([3], false)
}

const resetChecked = () => {
  treeRef.value?.setCheckedKeys([], false)
}

const defaultProps = {
  children: 'children',
  label: 'label',
}

const data: Tree[] = [
  {
    id: 1,
    label: '一级 1',
    children: [
      {
        id: 4,
        label: '二级 1-1',
        children: [
          {
            id: 9,
            label: '三级 1-1-1',
          },
          {
            id: 10,
            label: '三级 1-1-2',
          },
        ],
      },
    ],
  },
  {
    id: 2,
    label: '一级 2',
    children: [
      {
        id: 5,
        label: '二级 2-1',
      },
      {
        id: 6,
        label: '二级 2-2',
      },
    ],
  },
  {
    id: 3,
    label: '一级 3',
    children: [
      {
        id: 7,
        label: '二级 3-1',
      },
      {
        id: 8,
        label: '二级 3-2',
      },
    ],
  },
]
</script>

<style lang="scss" scoped>
:deep() {
  .el-button {
    margin-right: 10px;
    margin-bottom: 10px;
  }

  .el-button + .el-button {
    margin-right: 10px;
    margin-left: 0;
  }
}
</style>
