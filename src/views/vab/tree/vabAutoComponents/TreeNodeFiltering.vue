<template>
  <el-input v-model="filterText" placeholder="请输入查询条件" style="margin-bottom: 10px" />

  <el-tree ref="treeRef" :data="data" default-expand-all :filter-node-method="filterNode" :props="defaultProps" />
</template>

<script lang="ts" setup>
import { ElTree } from 'element-plus'

interface Tree {
  [key: string]: any
}

const filterText = ref<string>('')
const treeRef = ref<InstanceType<typeof ElTree>>()

const defaultProps = {
  children: 'children',
  label: 'label',
}

watch(filterText, (value) => {
  treeRef.value?.filter(value)
})

const filterNode = (value: string, data: Tree) => {
  if (!value) return true
  return data.label.includes(value)
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
