<template>
  <div class="date-time-picker-container no-background-container">
    <vab-card title="日期和时间点">
      <el-date-picker v-model="value1" placeholder="选择日期时间" type="datetime" />
    </vab-card>
    <vab-card title="日期和时间范围">
      <el-date-picker v-model="value2" end-placeholder="结束日期" range-separator="至" start-placeholder="开始日期" type="datetimerange" />
    </vab-card>
    <vab-card title="默认的起始与结束时刻">
      <el-date-picker
        v-model="value3"
        :default-time="value2"
        end-placeholder="结束日期"
        start-placeholder="开始日期"
        type="datetimerange"
      />
    </vab-card>
  </div>
</template>

<script lang="ts" setup>
defineOptions({
  name: 'DateTimePicker',
})
const value1 = ref<string>('')
const value2 = ref<any>([new Date(2000, 10, 10, 10, 10), new Date(2000, 10, 11, 10, 10)])
const value3 = ref<string>('')
</script>
