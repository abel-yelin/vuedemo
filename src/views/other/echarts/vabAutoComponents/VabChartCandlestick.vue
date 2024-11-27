<template>
  <el-col :lg="8" :md="12" :sm="24" :xl="6" :xs="24">
    <vab-card :body-style="{ height: '240px' }" skeleton :title="title">
      <vab-chart :option="option" />
    </vab-card>
  </el-col>
</template>

<script lang="ts" setup>
import { random } from 'lodash-es'
import { useSettingsStore } from '/@/store/modules/settings'

defineOptions({
  name: 'VabChartCandlestick',
})

defineProps({
  title: {
    type: String,
    default: '',
  },
})

const settingsStore = useSettingsStore()
const { theme } = storeToRefs(settingsStore)
let timer: ReturnType<typeof setInterval>

const option = reactive<any>({
  grid: {
    top: 20,
    right: 20,
    bottom: 40,
    left: 40,
  },
  tooltip: {
    trigger: 'item',
  },
  xAxis: {
    data: ['2017-10-24', '2017-10-25', '2017-10-26', '2017-10-27'],
  },
  yAxis: {},
  series: {
    type: 'candlestick',
    data: [
      [random(50, 100), random(50, 100), random(50, 100), random(50, 100)],
      [random(50, 100), random(50, 100), random(50, 100), random(50, 100)],
      [random(50, 100), random(50, 100), random(50, 100), random(50, 100)],
      [random(50, 100), random(50, 100), random(50, 100), random(50, 100)],
    ],
    itemStyle: {
      color: theme.value.color,
      borderColor: theme.value.color,
      color0: '#f2637b',
      borderColor0: '#f2637b',
    },
  },
})

watch(
  theme.value,
  () => {
    option.series.itemStyle.color = theme.value.color
    option.series.itemStyle.borderColor = theme.value.color
  },
  { immediate: true }
)

onMounted(() => {
  timer = setInterval(() => {
    option.series.data = [
      [random(50, 100), random(50, 100), random(50, 100), random(50, 100)],
      [random(50, 100), random(50, 100), random(50, 100), random(50, 100)],
      [random(50, 100), random(50, 100), random(50, 100), random(50, 100)],
      [random(50, 100), random(50, 100), random(50, 100), random(50, 100)],
    ]
  }, 3000)
})

onBeforeUnmount(() => {
  if (timer) clearInterval(timer)
})
</script>
