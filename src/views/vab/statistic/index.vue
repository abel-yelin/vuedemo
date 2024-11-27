<template>
  <div class="statistic-container no-background-container">
    <vab-card>
      <template #header>基础用法</template>
      <statistic-basic />
    </vab-card>
    <vab-card>
      <template #header>倒计时</template>
      <statistic-countdown />
    </vab-card>
    <vab-card>
      <template #header>卡片</template>
      <statistic-card />
    </vab-card>
  </div>
</template>

<script lang="ts" setup>
defineOptions({
  name: 'Statistic',
})
</script>
