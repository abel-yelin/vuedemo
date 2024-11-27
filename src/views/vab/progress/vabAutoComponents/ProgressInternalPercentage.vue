<template>
  <div class="demo-progress">
    <el-progress :percentage="70" :stroke-width="26" :text-inside="true" />
    <el-progress :percentage="100" status="success" :stroke-width="24" :text-inside="true" />
    <el-progress :percentage="80" status="warning" :stroke-width="22" :text-inside="true" />
    <el-progress :percentage="50" status="exception" :stroke-width="20" :text-inside="true" />
  </div>
</template>

<style scoped>
.demo-progress .el-progress--line {
  width: 350px;
  margin-bottom: 15px;
}
</style>
