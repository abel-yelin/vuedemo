<template>
  <div class="demo-progress">
    <el-progress :percentage="0" type="circle" />
    <el-progress :percentage="25" type="circle" />
    <el-progress :percentage="100" status="success" type="circle" />
    <el-progress :percentage="70" status="warning" type="circle" />
    <el-progress :percentage="50" status="exception" type="circle" />
  </div>
</template>

<style scoped>
.demo-progress .el-progress--line {
  width: 350px;
  margin-bottom: 15px;
}

.demo-progress .el-progress--circle {
  margin-right: 15px;
}
</style>
