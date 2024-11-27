<template>
  <div class="vab-right-tools">
    <vab-search v-show="!isHorizontal" class="hidden-xs-only" />
    <div class="vab-right-tools-draggable">
      <vab-dark v-show="theme.showDark" :style="!isHorizontal ? '' : { marginLeft: 'var(--el-margin)' }" />
      <vab-color-picker v-show="theme.showColorPicker" />
      <vab-theme v-show="theme.showTheme && routeName !== 'SeparateLayout'" />
      <vab-error-log class="hidden-xs-only" />
      <vab-font-size v-show="theme.showFontSize" />
      <vab-lock v-show="theme.showLock" />
      <vab-notice v-show="theme.showNotice" />
      <vab-language v-show="theme.showLanguage" />
      <vab-fullscreen v-show="theme.showFullScreen" />
      <vab-refresh v-show="theme.showRefresh" />
    </div>
    <vab-avatar />
  </div>
</template>

<script lang="ts" setup>
import Sortable from 'sortablejs'
import { useSettingsStore } from '/@/store/modules/settings'

defineOptions({
  name: 'VabRightTools',
})

defineProps({
  isHorizontal: {
    type: Boolean,
    default: false,
  },
})

const route = useRoute()
const settingsStore = useSettingsStore()
const { theme, device } = storeToRefs(settingsStore)
const routeName = ref<any>(route.name)

let sortable: any
const handleTabDrag = () => {
  if (theme.value.rightToolsDrag && device.value != 'mobile') {
    const toolsElement = document.querySelector('.vab-right-tools-draggable') as HTMLElement | null

    if (toolsElement)
      sortable = new Sortable(toolsElement, {
        animation: 150,
        easing: 'cubic-bezier(1, 0, 0, 1)',
      })
  }
}

watch(
  route,
  () => {
    routeName.value = route.name
  },
  { immediate: true }
)

onMounted(() => {
  nextTick(() => {
    handleTabDrag()
  })
})

watch(
  theme.value,
  () => {
    if (theme.value.rightToolsDrag) handleTabDrag()
    else sortable && sortable.destroy()
  },
  {
    immediate: true,
  }
)
</script>

<style lang="scss" scoped>
.vab-right-tools {
  display: flex;
  align-items: center;
  justify-content: flex-end;

  &-draggable {
    display: flex;
    align-items: center;
    justify-content: flex-end;
  }
}
</style>
