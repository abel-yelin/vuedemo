<template>
  <div class="no-layout-container">
    <el-page-header content="全屏" :title="isFullscreen ? '退出全屏并返回上一页' : '返回上一页'" @back="goBack">
      <template #extra>
        <vab-fullscreen />
      </template>
    </el-page-header>

    <vab-alert title="刷新浏览器自动退出全屏" type="success" />
  </div>
</template>

<script lang="ts" setup>
import { useTabsStore } from '/@/store/modules/tabs'
import { handleActivePath } from '/@/utils/routes'

defineOptions({
  name: 'NoLayout',
})

const tabsStore = useTabsStore()
const route = useRoute()
const { delVisitedRoute } = tabsStore
const { exit, isFullscreen } = useFullscreen()

const goBack = async () => {
  await exit()
  await delVisitedRoute(handleActivePath(route, true))
  await history.back()
}
</script>

<style lang="scss" scoped>
.no-layout-container {
  position: fixed !important;
  inset: 0 !important;
  z-index: calc(var(--el-z-index) + 3) !important;
  padding: var(--el-padding) !important;
  margin: 0 !important;
  border: 0 !important;
  border-radius: 0 !important;
}
</style>
