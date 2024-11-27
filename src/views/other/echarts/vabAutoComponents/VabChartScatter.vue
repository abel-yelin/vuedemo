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
  name: 'VabChartScatter',
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
  xAxis: {},
  yAxis: {},
  tooltip: {
    trigger: 'item',
  },
  series: {
    symbolSize: 10,
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
    ],
    type: 'scatter',
  },
})

watch(
  theme.value,
  () => {
    option.color = [theme.value.color]
  },
  { immediate: true }
)

onMounted(() => {
  timer = setInterval(() => {
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
    ]
  }, 3000)
})

onBeforeUnmount(() => {
  if (timer) clearInterval(timer)
})
</script>
