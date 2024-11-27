<template>
  <el-col :lg="8" :md="12" :sm="24" :xl="6" :xs="24">
    <vab-card :body-style="{ height: '240px' }" skeleton :title="title">
      <vab-chart :option="option" />
    </vab-card>
  </el-col>
</template>

<script lang="ts" setup>
import { registerMap } from 'echarts/core'

defineOptions({
  name: 'VabChartChinaMap',
})

defineProps({
  title: {
    type: String,
    default: '',
  },
})

const option = reactive<any>({
  grid: {
    top: 20,
    right: 20,
    bottom: 40,
    left: 40,
  },
})

const getMap = async () => {
  const { data } = await axios({
    //url: 'static/json/china.json',
    url: 'https://unpkg.com/echarts@4.9.0/map/json/china.json',
    method: 'get',
  })

  setTimeout(() => {
    registerMap('china', data)
    option.geo = {
      map: 'china',
      type: 'map',
      zoom: 1.2,
      roam: true,
    }
  }, 500)
}

onBeforeMount(() => {
  getMap()
})
</script>
