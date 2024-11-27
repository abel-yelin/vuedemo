<template>
  <el-col :lg="8" :md="12" :sm="24" :xl="6" :xs="24">
    <vab-card :body-style="{ height: '240px' }" skeleton :title="title">
      <vab-chart
        :option="option"
        @click="handleClick"
        @contextmenu="handleContextMenu"
        @dblclick="handleDbClick"
        @mousedown="handleMouseDown"
        @mousemove="handleMouseMove"
        @mouseout="handleMouseOut"
        @mouseover="handleMouseOver"
        @mouseup="handleMouseUp"
      />
    </vab-card>
  </el-col>
</template>

<script lang="ts" setup>
import { random } from 'lodash-es'
import { useSettingsStore } from '/@/store/modules/settings'

defineOptions({
  name: 'VabChartBar',
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
    type: 'category',
    data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
  },
  yAxis: {
    type: 'value',
  },
  series: {
    data: [random(50, 200), random(50, 200), random(50, 200), random(50, 200), random(50, 200), random(50, 200), random(50, 200)],
    type: 'bar',
  },
})

watch(
  theme.value,
  () => {
    option.color = [theme.value.color]
  },
  { immediate: true }
)

const handleClick = (event: any) => {
  $baseMessage(`鼠标【点击】事件，name：${event.name}`, 'success', 'hey')
}
const handleContextMenu = (event: any) => {
  $baseMessage(`鼠标【右键】事件，name：${event.name}`, 'success', 'hey')
}

const handleDbClick = (event: any) => {
  $baseMessage(`鼠标【双击事件，name：${event.name}`, 'success', 'hey')
}

const handleMouseDown = (event: any) => {
  $baseMessage(`鼠标【按下】事件，name：${event.name}`, 'success', 'hey')
}

const handleMouseMove = (event: any) => {
  $baseMessage(`鼠标【移动】事件，name：${event.name}`, 'success', 'hey')
}

const handleMouseOut = (event: any) => {
  $baseMessage(`鼠标【移出】事件，name：${event.name}`, 'success', 'hey')
}

const handleMouseOver = (event: any) => {
  $baseMessage(`鼠标【移入】事件，name：${event.name}`, 'success', 'hey')
}

const handleMouseUp = (event: any) => {
  $baseMessage(`鼠标【松开】事件，name：${event.name}`, 'success', 'hey')
}

onMounted(() => {
  timer = setInterval(() => {
    option.series.data = [
      random(50, 100),
      random(10, 100),
      random(10, 100),
      random(10, 100),
      random(10, 100),
      random(50, 100),
      random(50, 200),
    ]
  }, 3000)
})

onBeforeUnmount(() => {
  if (timer) clearInterval(timer)
})
</script>
