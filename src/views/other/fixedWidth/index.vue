<template>
  <div class="fixed-width-container no-background-container">
    <div class="fixed-width-box hidden-sm-and-up" style="width: 100%">
      <vab-alert title="手机端不支持定宽演示" type="warning" />
    </div>
    <div class="fixed-width-box hidden-xs-only">
      <el-tabs v-model="activeName" @tab-click="handleClick">
        <el-tab-pane label="按数值" name="first">
          <el-form :model="queryForm1" style="width: 600px" @submit.prevent>
            <el-form-item label="数值(800px - 1500px)">
              <el-slider v-model="queryForm1.count" :max="1500" :min="800" show-input @change="handleChange1" />
            </el-form-item>
            <el-form-item label="是否居中">
              <el-switch v-model="queryForm1.isChecked" @change="handleChecked" />
            </el-form-item>
          </el-form>
        </el-tab-pane>
        <el-tab-pane label="按百分比" name="second">
          <el-form :model="queryForm2" style="width: 600px" @submit.prevent>
            <el-form-item label="百分比(50% - 100%)">
              <el-slider v-model="queryForm2.count" :max="100" :min="50" show-input @change="handleChange2" />
            </el-form-item>
            <el-form-item label="是否居中">
              <el-switch v-model="queryForm1.isChecked" @change="handleChecked" />
            </el-form-item>
          </el-form>
        </el-tab-pane>
      </el-tabs>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { useSettingsStore } from '/@/store/modules/settings'

defineOptions({
  name: 'FixedWidth',
})
const settingsStore = useSettingsStore()
const { device } = storeToRefs(settingsStore)
const activeName = ref<string>('first')
const queryForm1 = reactive<any>({
  count: 1200,
  isChecked: true,
})
const queryForm2 = reactive<any>({
  count: 80,
  isChecked: true,
})

const handleClick = (tab: any) => {
  if (tab.index == 0) {
    queryForm1.count = 1200
    handleChange1(1200)
  }

  if (tab.index == 1) {
    queryForm2.count = 80
    handleChange2(80)
  }

  handleChecked(true)
}

const handleChange1 = (value: any) => {
  const el = ref<HTMLElement | null>(null)
  useCssVar('--el-fixed-width', el).value = `${value}px`
}

const handleChange2 = (value: any) => {
  const el = ref<HTMLElement | null>(null)
  useCssVar('--el-fixed-width', el).value = `${value}%`
}

const handleChecked = (value: any) => {
  const el = ref<HTMLElement | null>(null)
  if (value) useCssVar('--el-fixed-width-margin', el).value = 'auto'
  else useCssVar('--el-fixed-width-margin', el).value = '0'
}

onMounted(() => {
  if (device.value == 'mobile') {
    handleChange2(100)
  } else {
    handleClick({
      index: 0,
    })
  }
})
</script>

<style lang="scss">
:root {
  --el-fixed-width: 1200px;
  --el-fixed-width-margin: auto;
}

.fixed-width-container + .vab-footer {
  width: var(--el-fixed-width);
  margin: var(--el-fixed-width-margin);
}
</style>

<style lang="scss" scoped>
.fixed-width-container {
  .fixed-width-box {
    width: var(--el-fixed-width);
    min-height: var(--el-container-height);
    padding: var(--el-padding);
    margin: var(--el-fixed-width-margin);
    margin-bottom: var(--el-margin);
    background-color: var(--el-color-white);
    border: 1px solid var(--el-border-color);
    border-radius: var(--el-border-radius-base);
  }
}
</style>
