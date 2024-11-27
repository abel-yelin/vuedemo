<template>
  <div class="test2-container">
    <vab-alert :title="'Query id=' + route.query.id" />
    <vab-json-viewer copyable :expand-depth="5" :value="finalRoute" />
  </div>
</template>

<script lang="ts" setup>
import VabJsonViewer from 'vue-json-viewer'
import { useTabsStore } from '/@/store/modules/tabs'

defineOptions({
  name: 'Query',
})

const route = useRoute()
const tabsStore = useTabsStore()
const { changeTabsMeta } = tabsStore
const finalRoute = reactive<any>({
  name: '',
  path: '',
  query: {},
})

const handleQuery = () => {
  finalRoute.name = route.name
  finalRoute.path = route.path
  finalRoute.query = route.query
  changeTabsMeta({
    title: 'Query',
    meta: {
      title: `Query id=${route.query.id} `,
    },
  })
}

watch(
  finalRoute,
  () => {
    handleQuery()
  },
  {
    immediate: true,
  }
)

onActivated(() => {
  handleQuery()
})
</script>
