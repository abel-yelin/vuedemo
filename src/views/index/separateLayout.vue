<template>
  <div class="separate-layout-container">
    <div class="hidden-sm-and-up">
      <vab-alert title="手机端不支持独立布局演示" type="warning" />
    </div>
    <div class="hidden-xs-only">
      <el-page-header content="独立布局" title="返回上一页" @back="goBack">
        <template #extra>
          <vab-fullscreen />
        </template>
      </el-page-header>
      <vab-alert title="当前页面允许独立于默认布局之外并禁用主题配置，当切换至其他页面时回到默认布局" />
      <tile />
    </div>
  </div>
</template>

<script lang="ts" setup>
import Tile from './tile.vue'
import { layout } from '/@/config/'
import { useSettingsStore } from '/@/store/modules/settings'

defineOptions({
  name: 'SeparateLayout',
})

const settingsStore = useSettingsStore()
const route = useRoute()
const { device, theme } = storeToRefs(settingsStore)

const goBack = async () => {
  await history.back()
}

watch(
  route,
  () => {
    if (device.value === 'mobile') {
      theme.value.layout = 'vertical'
    } else {
      if (route.path === '/separateLayout') theme.value.layout = 'horizontal'
      else {
        if (localStorage.getItem('shop-vite-theme'))
          theme.value.layout = JSON.parse(localStorage.getItem('shop-vite-theme') as string).layout || layout
        else theme.value.layout = layout
      }
    }
  },
  { immediate: true }
)
</script>

<style lang="scss" scoped>
.separate-layout-container {
  :deep() {
    .tile-container {
      min-height: calc(var(--el-container-height) - 150px);
      padding: var(--el-padding) !important;
      background: var(--el-color-white) !important;
      border-radius: var(--el-border-radius-base);
    }
  }
}
</style>
