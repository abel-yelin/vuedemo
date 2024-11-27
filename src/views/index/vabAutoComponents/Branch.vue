<template>
  <vab-card :body-style="{ height: '210px' }" skeleton>
    <template #header>
      <vab-icon icon="donut-chart-fill" />
      分布
    </template>
    <vab-chart :option="option" />
  </vab-card>
</template>

<script lang="ts" setup>
import { useSettingsStore } from '/@/store/modules/settings'

const settingsStore = useSettingsStore()
const { theme } = storeToRefs(settingsStore)
const option = reactive<any>({
  tooltip: {
    trigger: 'item',
  },
  series: [
    {
      name: '访问来源',
      type: 'pie',
      radius: ['40%', '80%'],
      itemStyle: {
        borderRadius: 10,
        borderColor: '#fff',
        borderWidth: 2,
      },
      data: [
        { value: 1048, name: '搜索引擎' },
        { value: 735, name: '直接访问' },
        { value: 580, name: '邮件营销' },
        { value: 484, name: '联盟广告' },
        { value: 300, name: '视频广告' },
      ],
    },
  ],
})

watch(
  theme.value,
  () => {
    option.color = [theme.value.color]
  },
  { immediate: true }
)
</script>
