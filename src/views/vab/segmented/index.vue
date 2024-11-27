<template>
  <div class="segmented-container no-background-container">
    <vab-card title="基础用法">
      <segmented-basic />
    </vab-card>
    <vab-card title="禁用状态">
      <segmented-disabled />
    </vab-card>
    <vab-card title="Block 分段选择器">
      <segmented-block />
    </vab-card>
    <vab-card title="自定义内容">
      <segmented-custom-content />
    </vab-card>
    <vab-card title="自定义样式">
      <segmented-custom-style />
    </vab-card>
  </div>
</template>

<script lang="ts" setup>
defineOptions({
  name: 'Segmented',
})
</script>
