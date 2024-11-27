<template>
  <div class="rate-container no-background-container">
    <vab-card>
      <template #header>基础用法</template>
      <el-rate v-model="value1" />
    </vab-card>
    <vab-card>
      <template #header>辅助文字</template>
      <el-rate v-model="value2" show-text />
    </vab-card>
    <vab-card>
      <template #header>只读</template>
      <el-rate v-model="value3" disabled score-template="{value}" show-score text-color="var(--el-color-warning)" />
    </vab-card>
  </div>
</template>

<script lang="ts" setup>
defineOptions({
  name: 'Rate',
})

const value1 = ref<any>(null)
const value2 = ref<any>(null)
const value3 = ref<any>(3.7)
</script>
