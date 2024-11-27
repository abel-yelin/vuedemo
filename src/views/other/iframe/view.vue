<template>
  <div class="iframe-container">
    <iframe :src="url"></iframe>
  </div>
</template>

<script lang="ts" setup>
import { useTabsStore } from '/@/store/modules/tabs'

const tabsStore = useTabsStore()
const { changeTabsMeta } = tabsStore
const route = useRoute()

defineOptions({
  name: 'Iframe',
})

const url = ref<any>('')

const handleIframe = () => {
  url.value = `https://${route.query.url}`
  const meta = { ...route.meta, ...route.query }
  nextTick(() => {
    changeTabsMeta({
      title: 'Iframe',
      meta,
    })
  })
}

watch(
  route,
  () => {
    handleIframe()
  },
  { immediate: true }
)
</script>

<style lang="scss" scoped>
.iframe-container {
  iframe {
    width: 100%;
    height: var(--el-container-height);
    border: 0;
  }
}
</style>
