<template>
  <div class="demo-progress">
    <el-progress :color="colors" :percentage="percentage" type="dashboard" />
    <el-progress :color="colors" :percentage="percentage2" type="dashboard" />
    <div>
      <el-button-group>
        <el-button :icon="Minus" @click="decrease" />
        <el-button :icon="Plus" @click="increase" />
      </el-button-group>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { Minus, Plus } from '@element-plus/icons-vue'

const percentage = ref<any>(10)
const percentage2 = ref<any>(0)

const colors = [
  { color: '#f56c6c', percentage: 20 },
  { color: '#e6a23c', percentage: 40 },
  { color: '#5cb87a', percentage: 60 },
  { color: '#1989fa', percentage: 80 },
  { color: '#6f7ad3', percentage: 100 },
]

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
let timer: ReturnType<typeof setInterval>
onBeforeMount(() => {
  timer = setInterval(() => {
    percentage2.value = (percentage2.value % 100) + 10
  }, 500)
})

onBeforeUnmount(() => {
  clearInterval(timer)
})
</script>

<style scoped>
.demo-progress .el-progress--line {
  width: 350px;
  margin-bottom: 15px;
}

.demo-progress .el-progress--circle {
  margin-right: 15px;
}
</style>
