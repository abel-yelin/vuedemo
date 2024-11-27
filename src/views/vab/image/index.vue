<template>
  <div class="image-container no-background-container">
    <vab-card>
      <template #header>基础用法</template>
      <image-basic-usage />
    </vab-card>
    <vab-card>
      <template #header>占位内容</template>
      <image-placeholder />
    </vab-card>
    <vab-card>
      <template #header>加载失败</template>
      <image-load-failed />
    </vab-card>
    <vab-card>
      <template #header>懒加载</template>
      <image-lazy-load />
    </vab-card>
    <vab-card>
      <template #header>图片预览</template>
      <image-preview />
    </vab-card>
  </div>
</template>

<script lang="ts" setup>
defineOptions({
  name: 'Image',
})
</script>
