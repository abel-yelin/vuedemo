<template>
  <div class="dynamic-meta-container no-background-container">
    <vab-card>
      <template #header>
        动态logo
        <el-tag class="card-header-tag" type="danger">New</el-tag>
      </template>
      <el-button type="primary" @click="handleChangeLogo('vab')">修改logo</el-button>
      <el-button type="warning" @click="handleChangeLogo('vite')">重置</el-button>
    </vab-card>
    <vab-card title="动态标题">
      <el-space wrap>
        <el-button type="primary" @click="handleMeta('DynamicMeta', { title: 'vab-demo' })">标题变更为 vab-demo</el-button>
        <el-button type="warning" @click="handleMeta('DynamicMeta', { title: '动态Meta' })">重置</el-button>
      </el-space>
    </vab-card>
    <vab-card title="动态徽章">
      <el-space wrap>
        <el-select v-model="badgeType" placeholder="徽章类型" style="min-width: 95px" @change="handleBadgeType('DynamicMeta')">
          <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value" />
        </el-select>
        <el-badge :hidden="hidden" style="margin-right: 10px" :type="badgeType" :value="badge">
          <el-button :type="badgeType" @click="handleBadge('DynamicMeta')">{{ badgeType }} 徽章+ 1</el-button>
        </el-badge>
        <el-button type="warning" @click="resetBadge('DynamicMeta', { badge: '0' })">徽章清零</el-button>
        <el-button type="danger" @click="removeBadge('DynamicMeta', { badge: false })">移除徽章</el-button>
      </el-space>
    </vab-card>
    <vab-card title="动态图标">
      <el-popover v-model:visible="visible" popper-class="icon-selector-popper" :width="305">
        <template #reference>
          <el-button>
            <vab-icon :icon="icon" />
            修改图标
            <vab-icon icon="arrow-down-s-line" />
          </el-button>
        </template>
        <vab-icon-selector @handle-icon="handleIcon" />
      </el-popover>
      <el-button type="warning" @click="handleResetIcon()">重置</el-button>
    </vab-card>
    <vab-card title="动态高亮菜单">
      <el-space wrap>
        <el-button type="primary" @click="handleActiveMenu('/operate/tabs')">高亮菜单至多标签</el-button>
        <el-button type="warning" @click="handleActiveMenu('/operate/dynamicMeta')">重置</el-button>
      </el-space>
    </vab-card>
  </div>
</template>

<script lang="ts" setup>
import { useRoutesStore } from '/@/store/modules/routes'
import { useSettingsStore } from '/@/store/modules/settings'
import { useTabsStore } from '/@/store/modules/tabs'
import getPageTitle from '/@/utils/pageTitle'

defineOptions({
  name: 'DynamicMeta',
})

const route = useRoute()
const tabsStore = useTabsStore()
const routesStore = useRoutesStore()
const settingsStore = useSettingsStore()
const { changeTabsMeta } = tabsStore
const { changeActiveMenu, changeMenuMeta } = routesStore
const { changeLogo } = settingsStore
const badge = ref<number>(0)
const icon = ref<any>(route.meta.icon)
const hidden = ref<boolean>(false)
const favicon = useFavicon()
const visible = ref<boolean>(false)
const badgeType = ref<any>('success')
const options = [
  {
    value: 'primary',
    label: 'primary',
  },
  {
    value: 'success',
    label: 'success',
  },
  {
    value: 'warning',
    label: 'warning',
  },
  {
    value: 'danger',
    label: 'danger',
  },
]

const handleBadge = (name: any) => {
  badge.value = badge.value + 1
  hidden.value = false
  changeMenuMeta({
    name,
    meta: {
      badge: badge.value,
      badgeType: badgeType.value,
    },
  })
}

const handleBadgeType = (name: any) => {
  changeMenuMeta({
    name,
    meta: {
      badgeType: badgeType.value,
    },
  })
}

const resetBadge = (name: any, meta: any) => {
  badge.value = 0
  hidden.value = false
  changeMenuMeta({ name, meta })
}

const removeBadge = (name: any, meta: any) => {
  badge.value = 0
  hidden.value = true
  changeMenuMeta({ name, meta })
}

const handleMeta = (name: any, meta: { title: string }) => {
  if (meta.title) useTitle().value = getPageTitle(meta.title)
  changeMenuMeta({ name, meta })
  changeTabsMeta({ name, meta })
}

const handleIcon = (item: any) => {
  icon.value = item
  changeMenuMeta({ name: 'DynamicMeta', meta: { icon: item } })
  changeTabsMeta({ name: 'DynamicMeta', meta: { icon: item } })
  visible.value = false
}

const handleResetIcon = () => {
  const _icon = route.meta.icon
  icon.value = _icon
  changeMenuMeta({ name: 'DynamicMeta', meta: { icon: _icon } })
  changeTabsMeta({ name: 'DynamicMeta', meta: { icon: _icon } })
}

const handleChangeLogo = (logo: string) => {
  changeLogo(logo)
  switch (logo) {
    case 'vab': {
      favicon.value = 'favicon-vab.ico'
      $baseMessage('logo修改成功，为保持页面美观，5秒后将重置为默认logo', 'warning', 'hey')
      setTimeout(() => {
        handleChangeLogo('vite')
      }, 5 * 1000)

      break
    }
    case 'vite': {
      favicon.value = 'favicon.ico'
      localStorage.removeItem('logo')
      break
    }
  }
}

const handleActiveMenu = (activeMenu: string) => {
  changeActiveMenu(activeMenu)
}
</script>
