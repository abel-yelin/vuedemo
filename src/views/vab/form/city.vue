<template>
  <div class="city-container no-background-container">
    <vab-card title="行政区划（分类）">
      <vab-city v-model="cityCode" />
    </vab-card>
    <vab-card title="行政区划（默认）">
      <el-cascader v-model="area" clearable filterable :options="areaOptions" :props="{ label: 'name', value: 'code' }" />
    </vab-card>
  </div>
</template>

<script lang="ts" setup>
import { getList } from '/@/api/area'

defineOptions({
  name: 'City',
})

const area = ref<any>([])
const areaOptions = ref<any>([])
const cityCode = ref<string>('110000')

const fetchData = async () => {
  const {
    data: { list },
  } = await getList()
  areaOptions.value = list
}

onBeforeMount(() => {
  fetchData()
})
</script>
