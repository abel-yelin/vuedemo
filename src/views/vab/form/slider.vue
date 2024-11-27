<template>
  <div class="slider-container no-background-container">
    <vab-card>
      <template #header>基础用法</template>
      <span class="demonstration">默认</span>
      <el-slider v-model="value1" />
      <span class="demonstration">自定义初始值</span>
      <el-slider v-model="value2" />
      <span class="demonstration">隐藏 Tooltip</span>
      <el-slider v-model="value3" :show-tooltip="false" />
      <span class="demonstration">格式化 Tooltip</span>
      <el-slider v-model="value4" :format-tooltip="formatTooltip" />
      <span class="demonstration">禁用</span>
      <el-slider v-model="value5" disabled />
    </vab-card>
    <vab-card>
      <template #header>离散值</template>
      <span class="demonstration">不显示间断点</span>
      <el-slider v-model="value6" :step="10" />
      <span class="demonstration">显示间断点</span>
      <el-slider v-model="value7" show-stops :step="10" />
    </vab-card>
    <vab-card>
      <template #header>带有输入框</template>
      <el-slider v-model="value8" show-input />
    </vab-card>
    <vab-card>
      <template #header>范围选择</template>
      <el-slider v-model="value9" :max="10" range show-stops />
    </vab-card>
    <vab-card>
      <template #header>竖向模式</template>
      <el-slider v-model="value10" height="200px" vertical />
    </vab-card>
  </div>
</template>

<script lang="ts" setup>
defineOptions({
  name: 'Slider',
})

const value1 = ref<any>(0)
const value2 = ref<any>(50)
const value3 = ref<any>(36)
const value4 = ref<any>(48)
const value5 = ref<any>(42)
const value6 = ref<any>(0)
const value7 = ref<any>(0)
const value8 = ref<any>(0)
const value9 = ref<any>([4, 8])
const value10 = ref<any>(0)

const formatTooltip = (value: number) => {
  return value / 100
}
</script>
