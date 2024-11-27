<template>
  <div class="goods-statistics-container no-background-container">
    <el-row :gutter="20">
      <el-col :span="24">
        <vab-card>
          日期选择&nbsp;
          <el-date-picker v-model="datetimerange" type="datetimerange" />
        </vab-card>
      </el-col>
      <el-col :lg="6" :md="12" :sm="24" :xl="6" :xs="24">
        <goods-card
          background="white"
          :count-config="{
            startValue: 0,
            endValue: random(1000, 2000),
            decimals: 0,
            prefix: '',
            suffix: '',
            separator: ',',
            duration: 8000,
          }"
          icon="numbers-line"
          :icon-style="{
            color: 'var(--el-color-primary)',
            background: 'var(--el-color-primary-light-9)',
          }"
          percentage="24%"
          title="订单数量"
        />
      </el-col>
      <el-col :lg="6" :md="12" :sm="24" :xl="6" :xs="24">
        <goods-card
          background="white"
          :count-config="{
            startValue: 0,
            endValue: random(10000, 200000),
            decimals: 0,
            prefix: '',
            suffix: '',
            separator: ',',
            duration: 8000,
          }"
          icon="money-cny-circle-line"
          :icon-style="{
            color: 'var(--el-color-success)',
            background: 'var(--el-color-success-light-9)',
          }"
          percentage="4%"
          title="销售额"
        />
      </el-col>
      <el-col :lg="6" :md="12" :sm="24" :xl="6" :xs="24">
        <goods-card
          background="white"
          :count-config="{
            startValue: 0,
            endValue: random(0, 10),
            decimals: 0,
            prefix: '',
            suffix: '',
            separator: ',',
            duration: 800,
          }"
          icon="numbers-line"
          :icon-style="{
            color: 'var(--el-color-warning)',
            background: 'var(--el-color-warning-light-9)',
          }"
          percentage="1%"
          title="退单数量"
        />
      </el-col>
      <el-col :lg="6" :md="12" :sm="24" :xl="6" :xs="24">
        <goods-card
          background="white"
          :count-config="{
            startValue: 0,
            endValue: random(0, 1000),
            decimals: 0,
            prefix: '',
            suffix: '',
            separator: ',',
            duration: 800,
          }"
          icon="money-cny-circle-line"
          :icon-style="{
            color: 'var(--el-color-danger)',
            background: 'var(--el-color-danger-light-9)',
          }"
          percentage="1%"
          title="退单总额"
        />
      </el-col>
      <el-col :span="24">
        <vab-card>
          <el-row :gutter="20">
            <el-col :span="8">
              <el-statistic title="基本账户(元)" :value="random(100000, 200000)" />
            </el-col>
            <el-col :span="8">
              <el-statistic title="手续费账户(元)" :value="random(1000, 20000)" />
            </el-col>
            <el-col :span="8">
              <el-statistic title="运营账户(元)" :value="random(100000, 200000)" />
            </el-col>
            <el-col :span="24">
              <transactions />
            </el-col>
          </el-row>
        </vab-card>
      </el-col>
    </el-row>
  </div>
</template>

<script lang="ts" setup>
import { random } from 'lodash-es'

defineOptions({
  name: 'GoodsStatistics',
})

const datetimerange = ref<[Date, Date]>()
</script>
