<template>
  <el-row>
    <el-col :span="6">
      <el-statistic title="每日活跃用户" :value="268500" />
    </el-col>
    <el-col :span="6">
      <el-statistic :value="138">
        <template #title>
          <div style="display: inline-flex; align-items: center">
            男女比例
            <el-icon :size="12" style="margin-left: 4px">
              <male />
            </el-icon>
          </div>
        </template>
        <template #suffix>/100</template>
      </el-statistic>
    </el-col>
    <el-col :span="6">
      <el-statistic title="交易总额" :value="172000" />
    </el-col>
    <el-col :span="6">
      <el-statistic title="反馈编号" :value="562">
        <template #suffix>
          <el-icon style="vertical-align: -0.125em">
            <chat-line-round />
          </el-icon>
        </template>
      </el-statistic>
    </el-col>
  </el-row>
</template>

<script lang="ts" setup>
import { ChatLineRound, Male } from '@element-plus/icons-vue'
</script>

<style scoped>
.el-col {
  text-align: center;
}
</style>
