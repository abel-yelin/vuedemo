<template>
  <div class="demo-progress">
    <el-progress :percentage="50">
      <el-button text>Content</el-button>
    </el-progress>
    <el-progress :percentage="50" status="exception" :stroke-width="20" :text-inside="true">
      <span>Content</span>
    </el-progress>
    <el-progress :percentage="100" status="success" type="circle">
      <el-button circle :icon="Check" type="success" />
    </el-progress>
    <el-progress :percentage="80" type="dashboard">
      <template #default="{ percentage }">
        <span class="percentage-value">{{ percentage }}%</span>
        <span class="percentage-label">Progressing</span>
      </template>
    </el-progress>
  </div>
</template>

<script lang="ts" setup>
import { Check } from '@element-plus/icons-vue'
</script>

<style scoped>
.percentage-value {
  display: block;
  margin-top: 10px;
  font-size: 28px;
}

.percentage-label {
  display: block;
  margin-top: 10px;
  font-size: var(--el-font-size-extra-small);
}

.demo-progress .el-progress--line {
  width: 350px;
  margin-bottom: 15px;
}

.demo-progress .el-progress--circle {
  margin-right: 15px;
}
</style>
