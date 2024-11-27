<template>
  <vab-chart :option="option" />
</template>

<script lang="ts" setup>
import { graphic } from 'echarts/core'
import { random } from 'lodash-es'

defineOptions({
  name: 'DataScreenRight2',
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
      boundaryGap: false,
      splitLine: {
        show: false,
      },
      axisLabel: {
        color: '#eee',
      },
      data: ['一月', '二月', '三月', '四月', '五月', '六月'],
    },
  ],
  yAxis: [
    {
      type: 'value',
      name: '销售额',
      axisLabel: {
        formatter: '{value} 万元',
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
    {
      type: 'value',
      name: '增长率',
      smooth: true,
      showAllSymbol: false,
      symbol: 'circle',
      symbolSize: 2,
      axisLabel: {
        formatter: '{value} %',
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
  series: [
    {
      name: '销售额',
      type: 'bar',
      data: [random(20, 50), random(20, 50), random(20, 50), random(20, 50), random(20, 50), random(20, 50)],
      itemStyle: {
        borderRadius: [10, 10, 0, 0],
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
    },
    {
      name: '增长率',
      type: 'line',
      yAxisIndex: 1,
      smooth: true,
      showAllSymbol: false,
      symbol: 'circle',
      symbolSize: 2,
      lineStyle: {
        color: '#00b3f4',
      },
      itemStyle: {
        color: '#00b3f4',
      },
      tooltip: {
        show: true,
      },
      areaStyle: {
        color: new graphic.LinearGradient(
          0,
          0,
          0,
          1,
          [
            {
              offset: 0,
              color: 'rgba(0,179,244,0.3)',
            },
            {
              offset: 1,
              color: 'rgba(0,179,244,0)',
            },
          ],
          false
        ),
        shadowColor: 'rgba(0,179,244, 0.9)',
        shadowBlur: 20,
      },
      data: [random(0, 100), random(0, 100), random(0, 100), random(0, 100), random(0, 100), random(0, 100)],
    },
  ],
})

setInterval(() => {
  option.series[0].data = [random(20, 50), random(20, 50), random(20, 50), random(20, 50), random(20, 50), random(20, 50)]
  option.series[1].data = [random(0, 100), random(0, 100), random(0, 100), random(0, 100), random(0, 100), random(0, 100)]
}, 1000 * 5)
</script>
