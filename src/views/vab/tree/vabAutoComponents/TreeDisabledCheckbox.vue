<template>
  <el-tree :data="data" :props="defaultProps" show-checkbox />
</template>

<script lang="ts" setup>
const defaultProps = {
  children: 'children',
  label: 'label',
  disabled: 'disabled',
}

const data = [
  {
    id: 1,
    label: '一级 1',
    children: [
      {
        id: 3,
        label: '二级 2-1',
        children: [
          {
            id: 4,
            label: '三级 3-1-1',
          },
          {
            id: 5,
            label: '三级 3-1-2',
            disabled: true,
          },
        ],
      },
      {
        id: 2,
        label: '二级 2-2',
        disabled: true,
        children: [
          {
            id: 6,
            label: '三级 3-2-1',
          },
          {
            id: 7,
            label: '三级 3-2-2',
            disabled: true,
          },
        ],
      },
    ],
  },
]
</script>
