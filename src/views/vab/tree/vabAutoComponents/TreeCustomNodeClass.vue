<template>
  <div class="custom-tree-node-container">
    <el-tree
      :data="data"
      default-expand-all
      :expand-on-click-node="false"
      node-key="id"
      :props="{ class: customNodeClass }"
      show-checkbox
    />
  </div>
</template>

<script lang="ts" setup>
interface Tree {
  id: number
  label: string
  isPenultimate?: boolean
  children?: Tree[]
}

const customNodeClass: any = (data: Tree) => {
  if (data.isPenultimate) {
    return 'is-penultimate'
  }
  return null
}

const data: Tree[] = [
  {
    id: 1,
    label: '一级 1',
    children: [
      {
        id: 4,
        label: '二级 1-1',
        isPenultimate: true,
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
    isPenultimate: true,
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
    isPenultimate: true,
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

<style>
.is-penultimate > .el-tree-node__content {
  color: #626aef;
}

.el-tree-node.is-expanded.is-penultimate > .el-tree-node__children {
  display: flex;
  flex-direction: row;
}

.is-penultimate > .el-tree-node__children > div {
  width: 25%;
}
</style>
