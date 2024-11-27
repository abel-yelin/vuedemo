<template>
  <div>
    <vab-chart :option="option" />
  </div>
</template>

<script lang="ts" setup>
import { graphic } from 'echarts/core'
import { pull, random, sample } from 'lodash-es'
import { useSettingsStore } from '/@/store/modules/settings'
import { lightenColor } from '/@/utils/lightenColor'

const settingsStore = useSettingsStore()
const { theme } = storeToRefs(settingsStore)
let timer: ReturnType<typeof setInterval>

const option = reactive<any>({
  grid: {
    left: '20px',
    top: '5px',
    right: '20px',
    bottom: 0,
  },
  xAxis: {
    type: 'category',
    data: ['00:00', '1:00', '2:00', '3:00', '4:00', '5:00'],
    boundaryGap: false,
  },
  yAxis: {
    type: 'value',
    splitLine: {
      show: false,
    },
    axisTick: {
      show: false,
    },
    axisLine: {
      show: false,
    },
    axisLabel: {
      show: false,
    },
  },
  series: {
    barWidth: 18,
    name: '',
    type: 'bar',
    data: [random(50, 100), random(10, 100), random(10, 100), random(10, 100), random(10, 100), random(50, 100)],
    itemStyle: {
      color: new graphic.LinearGradient(0, 0, 1, 0, [
        { offset: 0, color: lightenColor(theme.value.color, 20) },
        { offset: 1, color: theme.value.color },
      ]),
    },
  },
})

watch(
  theme.value,
  () => {
    option.series.itemStyle.color = new graphic.LinearGradient(0, 0, 1, 0, [
      { offset: 0, color: lightenColor(theme.value.color, 20) },
      { offset: 1, color: theme.value.color },
    ])
  },
  { immediate: true }
)

onMounted(() => {
  timer = setInterval(() => {
    option.series.data = [random(50, 100), random(10, 100), random(10, 100), random(10, 100), random(10, 100), random(50, 100)]
    option.series.type = sample(pull(['bar', 'line'], option.series.type))
  }, 3000)
})

onBeforeUnmount(() => {
  if (timer) clearInterval(timer)
})
</script>

<style lang="scss" scoped>
:deep() {
  .echarts {
    position: absolute;
    right: 10px;
    bottom: 22px;
    width: calc(100% - 160px) !important;
    height: 60px !important;
  }
}
</style>
