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
  name: 'VabChartTreemap',
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
    bottom: 60,
    left: 40,
  },
  tooltip: {
    trigger: 'item',
  },
  series: {
    type: 'treemap',
    data: [
      {
        name: 'nodeA',
        value: random(0, 10),
        children: [
          {
            name: 'nodeAa',
            value: random(0, 10),
          },
          {
            name: 'nodeAb',
            value: random(0, 10),
          },
        ],
      },
    ],
  },
})

watch(
  theme.value,
  () => {
    setTimeout(() => {
      option.color = [theme.value.color]
    }, 200)
  },
  { immediate: true }
)

onMounted(() => {
  timer = setInterval(() => {
    option.series.data = [
      {
        name: 'nodeA',
        value: random(0, 10),
        children: [
          {
            name: 'nodeAa',
            value: random(0, 10),
          },
          {
            name: 'nodeAb',
            value: random(0, 10),
          },
        ],
      },
    ]
  }, 3000)
})

onBeforeUnmount(() => {
  if (timer) clearTimeout(timer)
})
</script>
