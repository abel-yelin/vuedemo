<template>
  <div class="infinite-scroll-container no-background-container">
    <vab-card>
      <template #header>基础用法</template>
      <infinite-scroll-basic />
    </vab-card>
    <vab-card>
      <template #header>禁用加载</template>
      <infinite-scroll-disable-loading />
    </vab-card>
  </div>
</template>

<script lang="ts" setup>
defineOptions({
  name: 'InfiniteScroll',
})
</script>
