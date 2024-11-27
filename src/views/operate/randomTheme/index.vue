<template>
  <div class="random-theme-container">
    <el-button type="primary" @click="randomTheme">随机换肤</el-button>
    <el-button type="primary" @click="resetTheme">默认主题</el-button>
  </div>
</template>

<script lang="ts" setup>
import { useSettingsStore } from '/@/store/modules/settings'

defineOptions({
  name: 'RandomTheme',
})

const settingsStore = useSettingsStore()
const { theme, device } = storeToRefs(settingsStore)
const { saveTheme, updateTheme, setCssVar } = settingsStore

const shuffle = (val: any, list: any) => list.filter((item: any) => item !== val)[(Math.random() * (list.length - 1)) | 0]

const randomTheme = async () => {
  const loading = $baseLoading()

  setTimeout(() => {
    const themeName = shuffle(theme.value.themeName, ['default', 'plain', 'technology'])
    const columnStyle = shuffle(theme.value.columnStyle, ['vertical', 'horizontal', 'card', 'arrow', 'semicircle'])
    const tabsBarStyle = shuffle(theme.value.tabsBarStyle, ['card', 'smart', 'smooth', 'rect'])
    const showTabsIcon = shuffle(theme.value.showTabsIcon, [true, false])
    const layout =
      device.value === 'desktop' ? shuffle(theme.value.layout, ['horizontal', 'vertical', 'column', 'comprehensive', 'fall']) : 'vertical'
    const _color = shuffle(theme.value.color, [
      '#1e90ff',
      '#4e88f3',
      '#0052d9',
      '#3fb884',
      '#16baa9',
      '#07c160',
      '#009688',
      '#6954f0',
      '#7b40f2',
      '#f01414',
    ])
    const isFollow = shuffle(theme.value.isFollow, [true, false])

    theme.value.themeName = themeName
    theme.value.columnStyle = columnStyle
    theme.value.tabsBarStyle = tabsBarStyle
    theme.value.showTabsIcon = showTabsIcon
    theme.value.layout = layout

    if (themeName === 'technology') {
      theme.value.color = '#4e88f3'
    } else {
      theme.value.color = _color
    }

    if (themeName === 'default') theme.value.isFollow = isFollow
    else theme.value.isFollow = false

    setCssVar()
    updateTheme()
    saveTheme()
    setTimeout(() => {
      loading.close()
      $baseMessage('切换成功', 'success', 'hey')
    }, 1000)
  }, 100)
}

const resetTheme = () => {
  $pub('shop-vite-reset-theme')
}
</script>
