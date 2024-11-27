<template>
  <div class="switch-container no-background-container">
    <vab-card>
      <template #header>基础用法</template>
      <el-switch v-model="value" active-color="var(--el-color-success)" inactive-color="var(--el-color-warning)" />
    </vab-card>
    <vab-card>
      <template #header>文字描述</template>
      <el-switch v-model="value1" active-text="按月付费" inactive-text="按年付费" />
    </vab-card>
    <vab-card>
      <template #header>禁用状态</template>
      <el-switch v-model="value2" disabled style="margin-right: 10px" />
      <el-switch v-model="value3" disabled />
    </vab-card>
  </div>
</template>

<script lang="ts" setup>
defineOptions({
  name: 'Switch',
})

const value = ref<boolean>(true)
const value1 = ref<boolean>(true)
const value2 = ref<boolean>(true)
const value3 = ref<boolean>(false)
</script>
