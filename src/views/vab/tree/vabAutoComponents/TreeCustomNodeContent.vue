<template>
  <div class="custom-tree-container">
    <p>使用 render-content</p>
    <el-tree
      :data="dataSource"
      default-expand-all
      :expand-on-click-node="false"
      node-key="id"
      :render-content="renderContent"
      show-checkbox
    />
    <p>使用 scoped slot</p>
    <el-tree :data="dataSource" default-expand-all :expand-on-click-node="false" node-key="id" show-checkbox>
      <template #default="{ node, data }">
        <span class="custom-tree-node">
          <span>{{ node.label }}</span>
          <span>
            <a @click="append(data)">添加</a>
            <a style="margin-left: 8px" @click="remove(node, data)">删除</a>
          </span>
        </span>
      </template>
    </el-tree>
  </div>
</template>

<script lang="ts" setup>
import type Node from 'element-plus/es/components/tree/src/model/node'

interface Tree {
  id: number
  label: string
  children?: Tree[]
}

let id = 1000

const append = (data: Tree) => {
  const newChild = { id: id++, label: 'test', children: [] }
  if (!data.children) {
    data.children = []
  }
  data.children.push(newChild)
  dataSource.value = [...dataSource.value]
}

const remove = (node: Node, data: Tree) => {
  const parent = node.parent
  const children: Tree[] = parent.data.children || parent.data
  const index = children.findIndex((d) => d.id === data.id)
  children.splice(index, 1)
  dataSource.value = [...dataSource.value]
}

const renderContent = (
  h: any,
  {
    node,
    data,
  }: {
    node: Node
    data: Tree
    store: Node['store']
  }
) => {
  return h(
    'span',
    {
      class: 'custom-tree-node',
    },
    h('span', null, node.label),
    h(
      'span',
      null,
      h(
        'a',
        {
          onClick: () => append(data),
        },
        '添加 '
      ),
      h(
        'a',
        {
          style: 'margin-left: 8px',
          onClick: () => remove(node, data),
        },
        '删除'
      )
    )
  )
}

const dataSource = ref<Tree[]>([
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
])
</script>

<style>
.custom-tree-node {
  display: flex;
  flex: 1;
  align-items: center;
  justify-content: space-between;
  padding-right: 8px;
  font-size: var(--el-font-size-base);
}
</style>
