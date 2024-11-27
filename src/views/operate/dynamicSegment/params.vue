<template>
  <div class="params-container">
    <vab-alert :title="'Params id=' + id" />
    <vab-json-viewer copyable :expand-depth="5" :value="finalRoute" />
  </div>
</template>

<script lang="ts" setup>
import VabJsonViewer from 'vue-json-viewer'
import { useTabsStore } from '/@/store/modules/tabs'

defineOptions({
  name: 'Params',
})

const route = useRoute()
const tabsStore = useTabsStore()
const { changeTabsMeta } = tabsStore
const id = ref<string>('')
const finalRoute = reactive<any>({
  name: '',
  path: '',
  params: {
    id: '111',
  },
})

const handleParams = () => {
  const _route: any = route.matched[0].children.find((item) => item.name === 'Params')
  id.value = route.path.substring(route.path.lastIndexOf('/') + 1, route.path.length)
  finalRoute.name = _route.name
  finalRoute.path = _route.path
  finalRoute.params.id = id.value

  changeTabsMeta({
    title: 'Params',
    meta: {
      title: `Params id=${id.value}`,
    },
  })
}

watch(
  finalRoute,
  () => {
    handleParams()
  },
  {
    immediate: true,
  }
)
</script>
