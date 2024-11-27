<template>
  <div class="drawer-container no-background-container">
    <vab-card title="基础用法">
      <drawer-basic-usage />
    </vab-card>
    <vab-card title="不添加标题">
      <drawer-no-title />
    </vab-card>
    <vab-card title="自定义内容">
      <drawer-customization-content />
    </vab-card>
    <vab-card title="自定义头部">
      <drawer-customization-header />
    </vab-card>
    <vab-card title="嵌套抽屉">
      <drawer-nested-drawer />
    </vab-card>
  </div>
</template>

<script lang="ts" setup>
defineOptions({
  name: 'Drawer',
})
</script>
