<template>
  <el-row :gutter="20">
    <el-col :span="24">
      <el-segmented v-model="value1" disabled :options="options" style="margin-bottom: var(--el-margin)" />
    </el-col>
    <el-col :span="24">
      <el-segmented v-model="value2" :options="options" />
    </el-col>
  </el-row>
</template>

<script lang="ts" setup>
const value1 = ref<string>('Mon')
const value2 = ref<string>('Mon')
const options = [
  {
    label: '周一',
    value: 'Mon',
    disabled: true,
  },
  {
    label: '周二',
    value: 'Tue',
  },
  {
    label: '周三',
    value: 'Wed',
    disabled: true,
  },
  {
    label: '周四',
    value: 'Thu',
  },
  {
    label: '周五',
    value: 'Fri',
    disabled: true,
  },
  {
    label: '周六',
    value: 'Sat',
  },
  {
    label: '周日',
    value: 'Sun',
  },
]
</script>
