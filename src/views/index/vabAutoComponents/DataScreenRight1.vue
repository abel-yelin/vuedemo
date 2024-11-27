<template>
  <vab-chart :option="option" />
</template>

<script lang="ts" setup>
import { graphic } from 'echarts/core'
import { random } from 'lodash-es'

defineOptions({
  name: 'DataScreenRight1',
})

const option = reactive<any>({
  grid: {
    left: '0',
    right: '0',
    bottom: '20px',
    top: '40px',
    containLabel: true,
  },
  tooltip: {
    trigger: 'axis',
  },
  xAxis: [
    {
      type: 'category',
      axisLine: {
        show: true,
        lineStyle: {
          color: '#00a1ff',
        },
      },
      splitLine: {
        show: false,
      },
      axisLabel: {
        color: '#eee',
      },
    },
  ],
  yAxis: [
    {
      type: 'value',
      axisLabel: {
        color: '#eee',
      },
      axisLine: {
        show: true,
        lineStyle: {
          color: '#00a1ff',
        },
      },
      splitLine: {
        show: false,
      },
    },
  ],
  series: {
    symbolSize: 10,
    itemStyle: {
      color: new graphic.LinearGradient(
        0,
        0,
        0,
        1,
        [
          {
            offset: 0,
            color: '#2fc4d1',
          },
          {
            offset: 1,
            color: 'rgba(0,179,244, 0.9)',
          },
        ],
        false
      ),
      shadowColor: 'rgba(0,179,244, 0.9)',
      shadowBlur: 20,
    },
    data: [
      [random(1, 20), random(1, 20)],
      [random(1, 20), random(1, 20)],
      [random(1, 20), random(1, 20)],
      [random(1, 20), random(1, 20)],
      [random(1, 20), random(1, 20)],
      [random(1, 20), random(1, 20)],
      [random(1, 20), random(1, 20)],
      [random(1, 20), random(1, 20)],
      [random(1, 20), random(1, 20)],
      [random(1, 20), random(1, 20)],
      [random(1, 20), random(1, 20)],
      [random(1, 20), random(1, 20)],
      [random(1, 20), random(1, 20)],
      [random(1, 20), random(1, 20)],
      [random(1, 20), random(1, 20)],
      [random(1, 20), random(1, 20)],
      [random(1, 20), random(1, 20)],
      [random(1, 20), random(1, 20)],
      [random(1, 20), random(1, 20)],
      [random(1, 20), random(1, 20)],
      [random(1, 20), random(1, 20)],
      [random(1, 20), random(1, 20)],
      [random(1, 20), random(1, 20)],
    ],
    type: 'scatter',
  },
})

setInterval(() => {
  option.series.data = [
    [random(1, 20), random(1, 20)],
    [random(1, 20), random(1, 20)],
    [random(1, 20), random(1, 20)],
    [random(1, 20), random(1, 20)],
    [random(1, 20), random(1, 20)],
    [random(1, 20), random(1, 20)],
    [random(1, 20), random(1, 20)],
    [random(1, 20), random(1, 20)],
    [random(1, 20), random(1, 20)],
    [random(1, 20), random(1, 20)],
    [random(1, 20), random(1, 20)],
    [random(1, 20), random(1, 20)],
    [random(1, 20), random(1, 20)],
    [random(1, 20), random(1, 20)],
    [random(1, 20), random(1, 20)],
    [random(1, 20), random(1, 20)],
    [random(1, 20), random(1, 20)],
    [random(1, 20), random(1, 20)],
    [random(1, 20), random(1, 20)],
    [random(1, 20), random(1, 20)],
    [random(1, 20), random(1, 20)],
    [random(1, 20), random(1, 20)],
    [random(1, 20), random(1, 20)],
  ]
}, 1000 * 5)
</script>
