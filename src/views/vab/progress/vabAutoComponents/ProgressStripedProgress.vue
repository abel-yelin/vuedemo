<template>
  <div class="demo-progress">
    <el-progress :percentage="50" striped :stroke-width="15" />
    <el-progress :percentage="30" status="warning" striped striped-flow :stroke-width="15" />
    <el-progress :duration="10" :percentage="100" status="success" striped striped-flow :stroke-width="15" />
    <el-progress :duration="duration" :percentage="percentage" status="exception" striped striped-flow :stroke-width="15" />
    <el-button-group>
      <el-button :icon="Minus" @click="decrease" />
      <el-button :icon="Plus" @click="increase" />
    </el-button-group>
  </div>
</template>

<script lang="ts" setup>
import { Minus, Plus } from '@element-plus/icons-vue'

const percentage = ref<number>(70)
const duration = computed(() => Math.floor(percentage.value / 10))

const increase = () => {
  percentage.value += 10
  if (percentage.value > 100) {
    percentage.value = 100
  }
}
const decrease = () => {
  percentage.value -= 10
  if (percentage.value < 0) {
    percentage.value = 0
  }
}
</script>

<style scoped>
.demo-progress .el-progress--line {
  width: 350px;
  margin-bottom: 15px;
}
</style>
