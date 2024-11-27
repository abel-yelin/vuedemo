<template>
  <el-row :gutter="20">
    <el-col :span="24">
      <el-segmented v-model="value1" :options="options" size="large" style="margin-bottom: var(--el-margin)" />
    </el-col>
    <el-col :span="24">
      <el-segmented v-model="value2" :options="options" size="default" style="margin-bottom: var(--el-margin)" />
    </el-col>
    <el-col :span="24">
      <el-segmented v-model="value3" :options="options" size="small" />
    </el-col>
  </el-row>
</template>

<script lang="ts" setup>
const value1 = ref<string>('周一')
const value2 = ref<string>('周一')
const value3 = ref<string>('周一')
const options = ['周一', '周二', '周三', '周四', '周五', '周六', '周日']
</script>
