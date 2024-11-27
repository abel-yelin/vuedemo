<template>
  <el-col :lg="8" :md="12" :sm="24" :xl="6" :xs="24">
    <vab-card :body-style="{ height: '240px' }" skeleton :title="title">
      <vab-chart :option="option" />
    </vab-card>
  </el-col>
</template>

<script lang="ts" setup>
import { useSettingsStore } from '/@/store/modules/settings'

defineOptions({
  name: 'VabGraphicStrokeAnimation',
})

defineProps({
  title: {
    type: String,
    default: '',
  },
})

const settingsStore = useSettingsStore()
const { theme } = storeToRefs(settingsStore)

const option = reactive<any>({
  graphic: {
    elements: [
      {
        type: 'text',
        left: 'center',
        top: 'center',
        style: {
          text: 'Vue Shop Vite',
          fontSize: 40,
          fontWeight: 'bold',
          lineDash: [0, 200],
          lineDashOffset: 0,
          fill: 'transparent',
          stroke: theme.value.color,
          lineWidth: 1,
        },
        keyframeAnimation: {
          duration: 3000,
          loop: false,
          keyframes: [
            {
              percent: 0.7,
              style: {
                fill: 'transparent',
                lineDashOffset: 200,
                lineDash: [200, 0],
              },
            },
            {
              percent: 0.8,
              style: {
                fill: 'transparent',
              },
            },
            {
              percent: 1,
              style: {
                fill: theme.value.color,
              },
            },
          ],
        },
      },
    ],
  },
})

watch(
  theme.value,
  () => {
    setTimeout(() => {
      option.graphic.elements[0].style.stroke = theme.value.color
      option.graphic.elements[0].keyframeAnimation.keyframes[2].style.fill = theme.value.color
    }, 200)
  },
  { immediate: true }
)
</script>
