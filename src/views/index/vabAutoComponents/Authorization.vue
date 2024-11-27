<template>
  <vab-card :body-style="{ height: '222px' }" skeleton>
    <template #header>
      <vab-icon icon="bar-chart-2-line" />
      授权数
      <el-tag class="card-header-tag" type="warning">周</el-tag>
    </template>
    <vab-chart :option="option" />
    <div class="bottom">
      <span>
        授权数:
        <vab-count
          :decimals="countConfig.decimals"
          :duration="countConfig.duration"
          :end-value="countConfig.endValue"
          :prefix="countConfig.prefix"
          :separator="countConfig.separator"
          :start-value="countConfig.startValue"
          :suffix="countConfig.suffix"
        />
        <el-tag class="card-footer-tag" type="success">倒计时 {{ n }}s</el-tag>
      </span>
    </div>
  </vab-card>
</template>

<script lang="ts" setup>
import { graphic } from 'echarts/core'
import { pull, random, sample } from 'lodash-es'
import { useSettingsStore } from '/@/store/modules/settings'
import { lightenColor } from '/@/utils/lightenColor'

defineOptions({
  name: 'Authorization',
})

const settingsStore = useSettingsStore()
const { theme } = storeToRefs(settingsStore)
let timer: ReturnType<typeof setInterval>
const n = ref<number>(5)
const countConfig = reactive<any>({
  startValue: 0,
  endValue: random(1000, 20000),
  decimals: 0,
  prefix: '',
  suffix: '',
  separator: ',',
  duration: 8000,
})
const option = reactive<any>({
  tooltip: {
    trigger: 'axis',
    extraCssText: 'z-index:1',
  },
  grid: {
    top: '5%',
    left: '2%',
    right: '4%',
    bottom: '0%',
    containLabel: true,
  },
  xAxis: {
    type: 'category',
    data: ['0时', '4时', '8时', '12时', '16时', '20时', '24时'],
    axisTick: {
      alignWithLabel: true,
    },
  },

  yAxis: {
    type: 'value',
  },

  series: {
    name: '授权数',
    type: 'bar',
    barWidth: '60%',
    data: [10, 52, 20, 33, 39, 33, 22],
    itemStyle: {
      borderRadius: [2, 2, 0, 0],
      color: new graphic.LinearGradient(0, 0, 1, 0, [
        { offset: 0, color: lightenColor(theme.value.color, 50) },
        { offset: 1, color: theme.value.color },
      ]),
    },
  },
})

watch(
  theme.value,
  () => {
    option.series.itemStyle.color = new graphic.LinearGradient(0, 0, 1, 0, [
      { offset: 0, color: lightenColor(theme.value.color, 50) },
      { offset: 1, color: theme.value.color },
    ])
  },
  { immediate: true }
)

onMounted(() => {
  timer = setInterval(() => {
    if (n.value > 0) {
      n.value--
    } else {
      option.series.type = sample(pull(['bar', 'line', 'scatter'], option.series.type))
      n.value = 5
    }
  }, 1000)
})

onBeforeUnmount(() => {
  if (timer) clearInterval(timer)
})
</script>

<style lang="scss" scoped>
:deep() {
  .echarts {
    height: 140px !important;
  }
}

.bottom {
  padding-top: var(--el-padding);
  margin-top: 5px;
  text-align: left;
  border-top: 1px solid var(--el-border-color);
}
</style>
