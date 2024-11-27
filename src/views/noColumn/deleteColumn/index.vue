<template>
  <div class="delete-column-container">
    <vab-alert v-if="theme.layout == 'column'" title="单栏页面演示" />
    <vab-alert v-else title="当前布局不支持单栏页面演示" type="warning" />
  </div>
</template>

<script lang="ts" setup>
import { useSettingsStore } from '/@/store/modules/settings'

defineOptions({
  name: 'DeleteColumn',
})

const settingsStore = useSettingsStore()
const { theme } = storeToRefs(settingsStore)
</script>
