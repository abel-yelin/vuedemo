<template>
  <div class="demo-progress">
    <el-progress :percentage="50" />
    <el-progress :format="format" :percentage="100" />
    <el-progress :percentage="100" status="success" />
    <el-progress :percentage="100" status="warning" />
    <el-progress :percentage="50" status="exception" />
  </div>
</template>

<script lang="ts" setup>
const format = (percentage: any) => (percentage === 100 ? 'Full' : `${percentage}%`)
</script>

<style scoped>
.demo-progress .el-progress--line {
  width: 350px;
  margin-bottom: 15px;
}
</style>
