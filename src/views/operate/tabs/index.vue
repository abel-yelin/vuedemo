<template>
  <div class="tabs-container no-background-container">
    <vab-card title="标签页操作">
      <el-space wrap>
        <el-button type="primary" @click="closeOthersTabs">关闭其他</el-button>
        <el-button type="primary" @click="closeLeftTabs">关闭左侧</el-button>
        <el-button type="primary" @click="closeRightTabs">关闭右侧</el-button>
        <el-button type="primary" @click="closeAllTabs">关闭全部</el-button>
        <el-button type="primary" @click="handleTabRemove(route.path)">关闭当前</el-button>
        <el-button type="primary" @click="handleRefresh">刷新当前</el-button>
      </el-space>
    </vab-card>
    <vab-card title="params传参(支持多开)">
      <el-button type="primary" @click="handleOpenParams">点击跳转</el-button>
    </vab-card>
    <vab-card title="query传参(支持多开)">
      <el-button type="primary" @click="handleOpenQuery">点击跳转</el-button>
    </vab-card>
  </div>
</template>

<script lang="ts" setup>
import { random } from 'lodash-es'
import { useTabsStore } from '/@/store/modules/tabs'
import { handleActivePath } from '/@/utils/routes'

defineOptions({
  name: 'Tabs',
})

const route = useRoute()
const router = useRouter()
const tabStore = useTabsStore()
const { getVisitedRoutes: visitedRoutes } = storeToRefs(tabStore)
const { delVisitedRoute, delOthersVisitedRoutes, delLeftVisitedRoutes, delRightVisitedRoutes, delAllVisitedRoutes } = tabStore
const hoverRoute = ref<any>(null)

const handleTabRemove = async (rawPath: string) => {
  if (isActive(rawPath)) await toLastTab()
  await delVisitedRoute(rawPath)
}

const closeOthersTabs = async () => {
  if (hoverRoute.value) {
    await router.push(hoverRoute.value)
    await delOthersVisitedRoutes(hoverRoute.value.path)
  } else await delOthersVisitedRoutes(handleActivePath(route, true))
}

const closeLeftTabs = async () => {
  if (hoverRoute.value) {
    await router.push(hoverRoute.value)
    await delLeftVisitedRoutes(hoverRoute.value.path)
  } else await delLeftVisitedRoutes(handleActivePath(route, true))
}

const closeRightTabs = async () => {
  if (hoverRoute.value) {
    await router.push(hoverRoute.value)
    await delRightVisitedRoutes(hoverRoute.value.path)
  } else await delRightVisitedRoutes(handleActivePath(route, true))
}

const closeAllTabs = async () => {
  await delAllVisitedRoutes()
  await toLastTab()
}

const toLastTab = async () => {
  const latestView = visitedRoutes.value.findLast((item) => item.path !== handleActivePath(route, true))
  if (latestView) await router.push(latestView)
  else await router.push('/')
}

const isActive = (path: any) => {
  return path === handleActivePath(route, true)
}

const handleRefresh = () => {
  $pub('reload-router-view', 'Tabs')
}

const handleOpenParams = () => {
  router.push(`/operate/dynamicSegment/params/${random(0, 100)}`)
}

const handleOpenQuery = () => {
  router.push(`/operate/dynamicSegment/query?id=${random(0, 100)}`)
}
</script>
