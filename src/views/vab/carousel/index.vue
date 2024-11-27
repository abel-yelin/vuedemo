<template>
  <div class="carousel-container no-background-container">
    <el-row :gutter="20">
      <el-col :lg="12" :md="12" :sm="24" :xl="12" :xs="24">
        <vab-card title="基础用法">
          <carousel-basic />
        </vab-card>
        <vab-card title="指示器">
          <carousel-indicator />
        </vab-card>
        <vab-card title="切换箭头">
          <carousel-arrows />
        </vab-card>
        <vab-card title="卡片模式">
          <carousel-card />
        </vab-card>
        <vab-card title="垂直排列">
          <carousel-vertical />
        </vab-card>
      </el-col>
    </el-row>
  </div>
</template>

<script lang="ts" setup>
defineOptions({
  name: 'Carousel',
})
</script>
