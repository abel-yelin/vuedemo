<template>
  <div class="demo-progress">
    <el-progress :indeterminate="true" :percentage="50" />
    <el-progress :format="format" :indeterminate="true" :percentage="100" />
    <el-progress :duration="5" :indeterminate="true" :percentage="100" status="success" />
    <el-progress :duration="1" :indeterminate="true" :percentage="100" status="warning" />
    <el-progress :indeterminate="true" :percentage="50" status="exception" />
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
