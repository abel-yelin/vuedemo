<template>
  <el-row>
    <el-col :span="8">
      <el-countdown title="开始抓取" :value="value" />
    </el-col>
    <el-col :span="8">
      <el-countdown format="HH:mm:ss" title="剩余VIP时间" :value="value1" />
      <el-button class="countdown-footer" type="danger" @click="reset">重置</el-button>
    </el-col>
    <el-col :span="8">
      <el-countdown format="DD [天] HH:mm:ss" :value="value2">
        <template #title>
          <div style="display: inline-flex; align-items: center">
            <el-icon :size="12" style="margin-right: 4px">
              <calendar />
            </el-icon>
            直到下个月
          </div>
        </template>
      </el-countdown>
      <div class="countdown-footer">{{ value2.format('YYYY-MM-DD') }}</div>
    </el-col>
  </el-row>
</template>

<script lang="ts" setup>
import dayjs from 'dayjs'
import { Calendar } from '@element-plus/icons-vue'

const value = ref<any>(Date.now() + 1000 * 60 * 60 * 7)
const value1 = ref<any>(Date.now() + 1000 * 60 * 60 * 24 * 2)
const value2 = ref<any>(dayjs().add(1, 'month').startOf('month'))

function reset() {
  value1.value = Date.now() + 1000 * 60 * 60 * 24 * 2
}
</script>

<style scoped>
.el-col {
  text-align: center;
}

.countdown-footer {
  margin-top: 8px;
}
</style>
