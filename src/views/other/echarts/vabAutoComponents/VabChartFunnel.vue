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
  name: 'VabChartFunnel',
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
    bottom: 20,
    left: 20,
  },
  tooltip: {
    trigger: 'item',
    formatter: '{a} <br/>{b} : {c}%',
  },
  series: {
    name: '漏斗图',
    type: 'funnel',
    left: '20%',
    top: 20,
    bottom: 20,
    width: '60%',
    min: 0,
    max: 100,
    minSize: '0%',
    maxSize: '100%',
    sort: 'descending',
    gap: 2,
    labelLine: {
      length: 10,
      lineStyle: {
        width: 1,
        type: 'solid',
      },
    },
    emphasis: {
      label: {
        fontSize: 12,
      },
    },
    data: [
      { value: random(0, 100), name: '访问' },
      { value: random(20, 100), name: '咨询' },
      { value: random(40, 100), name: '订单' },
      { value: random(60, 100), name: '点击' },
      { value: random(80, 100), name: '展现' },
    ],
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
      { value: random(0, 100), name: '访问' },
      { value: random(20, 100), name: '咨询' },
      { value: random(40, 100), name: '订单' },
      { value: random(60, 100), name: '点击' },
      { value: random(80, 100), name: '展现' },
    ]
  }, 3000)
})

onBeforeUnmount(() => {
  if (timer) clearInterval(timer)
})
</script>
storeToRefslettimer
