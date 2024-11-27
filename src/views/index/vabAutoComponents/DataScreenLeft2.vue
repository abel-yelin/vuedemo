<template>
  <vab-chart :option="option" />
</template>

<script lang="ts" setup>
import { random } from 'lodash-es'

defineOptions({
  name: 'DataScreenLeft2',
})

const option = reactive<any>({
  grid: {
    left: '20px',
    right: '20px',
    bottom: '20px',
    top: '20px',
    containLabel: true,
  },
  tooltip: {
    trigger: 'item',
  },
  series: {
    name: '人群画像',
    type: 'pie',
    radius: ['40%', '80%'],
    itemStyle: {
      borderRadius: 10,
      borderColor: '#01ffff',
      borderWidth: 2,
      color: (params: any) => {
        const colorList = ['#385afe', '#95de64', '#ff7a45', '#101e57', '#2c3e50']
        return colorList[params.dataIndex]
      },
    },
    label: {
      show: true,
      color: '#fff',
    },
    data: [
      { value: random(200, 500), name: '学生' },
      { value: random(200, 500), name: '职场青年' },
      { value: random(200, 500), name: '家庭主妇' },
      { value: random(200, 500), name: '退休人员' },
      { value: random(200, 500), name: '企业高管' },
    ],
  },
})

setInterval(() => {
  option.series.data = [
    { value: random(200, 500), name: '学生' },
    { value: random(200, 500), name: '职场青年' },
    { value: random(200, 500), name: '家庭主妇' },
    { value: random(200, 500), name: '退休人员' },
    { value: random(200, 500), name: '企业高管' },
  ]
}, 1000 * 5)
</script>
