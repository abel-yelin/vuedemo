<template>
  <vab-chart :option="option" />
</template>

<script lang="ts" setup>
import { graphic } from 'echarts/core'
import { random } from 'lodash-es'

defineOptions({
  name: 'DataScreenLeft1',
})

const option = reactive<any>({
  grid: {
    left: '0',
    right: '0',
    bottom: '0',
    top: '10px',
    containLabel: true,
  },
  tooltip: {
    trigger: 'axis',
  },
  xAxis: {
    show: false,
    type: 'value',
    axisLabel: {
      color: '#eee',
    },
    boundaryGap: false,
    splitLine: {
      show: false,
    },
  },
  yAxis: [
    {
      type: 'category',
      inverse: true,
      data: ['访客数量', '订单数量', 'GPT模型数量', 'Claude模型数'],
      axisLine: {
        show: false,
      },
      axisTick: {
        show: false,
      },
      splitLine: {
        show: false,
      },
      axisLabel: {
        color: '#eee',
      },
    },
  ],
  series: {
    name: '',
    type: 'bar',
    zlevel: 1,
    itemStyle: {
      borderRadius: 10,
      color: new graphic.LinearGradient(0, 0, 1, 0, [
        {
          offset: 0,
          color: 'rgb(57,89,255,1)',
        },
        {
          offset: 1,
          color: 'rgb(46,200,207,1)',
        },
      ]),
    },
    barWidth: 15,
    data: [random(100, 2000), random(100, 2000), random(100, 2000), random(100, 2000)],
    label: {
      show: true,
      position: 'inside',
      color: '#fff',
    },
  },
})

setInterval(() => {
  option.series.data = [random(100, 2000), random(100, 2000), random(100, 2000), random(100, 2000)]
}, 1000 * 5)
</script>
