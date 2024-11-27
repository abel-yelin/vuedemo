<template>
  <div class="time-picker-container no-background-container">
    <vab-card title="固定时间点">
      <el-time-select v-model="value" end="18:30" placeholder="选择时间" start="08:30" step="00:15" />
    </vab-card>
    <vab-card title="固定时间范围">
      <el-time-select v-model="startTime" end="18:30" placeholder="开始时间" start="08:30" step="00:15" style="margin-right: 10px" />
      <el-time-select v-model="endTime" end="18:30" :min-time="startTime" placeholder="结束时间" start="08:30" step="00:15" />
    </vab-card>

    <vab-card title="任意时间点">
      <el-time-picker v-model="value" placeholder="任意时间点" />
    </vab-card>
  </div>
</template>

<script lang="ts" setup>
defineOptions({
  name: 'Timepicker',
})

const value = ref<string>('')
const startTime = ref<string>('')
const endTime = ref<string>('')
</script>

<style scoped>
.time-picker-container {
  :deep() {
    .el-select {
      width: 165px;
    }
  }
}
</style>
