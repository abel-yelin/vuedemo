<template>
  <el-segmented v-model="value" block :options="options" />
</template>
<script lang="ts" setup>
const value = ref<string>('周一')
const options = ['周一', '周二', '周三', '周四', '周五', '周六', '周日']
</script>
