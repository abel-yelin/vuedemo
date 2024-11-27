<template>
  <div class="progress-container no-background-container">
    <vab-card>
      <template #header>直线进度条</template>
      <progress-linear-progress-bar />
    </vab-card>
    <vab-card>
      <template #header>进度条内显示百分比标识</template>
      <progress-linear-progress-bar />
    </vab-card>
    <vab-card>
      <template #header>自定义进度条的颜色</template>
      <progress-custom-color />
    </vab-card>
    <vab-card>
      <template #header>环形进度条</template>
      <progress-circular-progress-bar />
    </vab-card>
    <vab-card>
      <template #header>仪表盘形进度条</template>
      <progress-dashboard-progress-bar />
    </vab-card>
    <vab-card>
      <template #header>自定义内容</template>
      <progress-customized-content />
    </vab-card>
    <vab-card>
      <template #header>动画进度条</template>
      <progress-indeterminate-progress />
    </vab-card>
    <vab-card>
      <template #header>条纹进度条</template>
      <progress-striped-progress />
    </vab-card>
  </div>
</template>

<script lang="ts" setup>
defineOptions({
  name: 'Progress',
})
</script>
