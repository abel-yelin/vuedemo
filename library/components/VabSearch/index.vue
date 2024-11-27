<template>
  <el-tree-select
    v-if="theme.showSearch"
    v-model="searchValue"
    class="vab-search"
    clearable
    :data="addFieldToTree(routes)"
    default-expand-all
    filterable
    highlight-current
    :prefix-icon="Search"
    @node-click="handleSelect"
  >
    <template #default="{ data }">
      <vab-icon v-if="data.meta && data.meta.icon" :icon="data.meta.icon" />
      <span style="margin-left: 3px">{{ translate(data.meta.title) }}</span>
    </template>
  </el-tree-select>
</template>

<script lang="ts" setup>
import { Search } from '@element-plus/icons-vue'
import { isHashRouterMode } from '/@/config'
import { translate } from '/@/i18n'
import { useRoutesStore } from '/@/store/modules/routes'
import { useSettingsStore } from '/@/store/modules/settings'
import { isExternal } from '/@/utils/validate'

defineOptions({
  name: 'VabSearch',
})

const settingsStore = useSettingsStore()
const { theme } = storeToRefs(settingsStore)
const searchValue = ref<any>('')
const router = useRouter()
const route = useRoute()
const routesStore = useRoutesStore()
const { getRoutes: routes } = storeToRefs(routesStore)

const addFieldToTree = (routes: any) => {
  routes.forEach((node: any) => {
    node.value = node.name
    node.label = translate(node.meta.title)
    if (node.children && node.children.length > 0) addFieldToTree(node.children)
  })
  return routes
}

const handleSelect = (item: any) => {
  nextTick(() => {
    if (!item.children)
      if (isExternal(item.path)) {
        window.open(item.path)
        router.push('/redirect')
        return
      } else if (item.meta.target === '_blank') {
        isHashRouterMode ? window.open(`#${item.path}`) : window.open(item.path)
        router.push('/redirect')
        return
      } else router.push(item.path)
  })
}

watch(
  route,
  () => {
    if (route.fullPath.includes('?')) {
      //处理query传参
      const matched = route.fullPath.match(/\?(.*)$/)
      const name: any = route.name
      if (matched) name.includes('?') ? (searchValue.value = route.name) : (searchValue.value = `${route.name as string}?${matched[1]}`)
      // 详情页显示搜索项
      if (route.meta.hidden && name.includes('Detail')) searchValue.value = ''
    } else searchValue.value = route.name
  },
  {
    immediate: true,
  }
)
</script>

<style lang="scss" scoped>
.vab-search {
  margin-left: var(--el-margin);

  :deep() {
    .el-input {
      width: 150px !important;
    }
  }
}
</style>
