<template>
  <div class="context-menu-container">
    <el-button type="primary" @contextmenu="onContextMenu($event)">点击右键触发</el-button>
    <vab-context-menu v-model:show="show" :options="options">
      <vab-context-menu-item :click-close="false" label="测试item动态显示和隐藏" @click="showItem = !showItem" />
      <vab-context-menu-item v-if="showItem" label="单击上面的item显示/隐藏我" />
      <vab-context-menu-separator v-if="showItem" />
      <vab-context-menu-item :click-close="false" :label="itemText" @click="changeLabelText" />
      <vab-context-menu-group label="group菜单">
        <vab-context-menu-item label="item1" @click="onMenuClick(1)" />
        <vab-context-menu-item label="item2" @click="onMenuClick(2)" />
      </vab-context-menu-group>
      <vab-context-menu-item icon="ri-24-hours-fill" label="item带图标" />
      <vab-context-menu-group icon="ri-archive-line" label="group菜单带图标">
        <vab-context-menu-item icon="ri-4k-line" label="item1" @click="onMenuClick(1)" />
        <vab-context-menu-item icon="ri-account-box-line" label="item1" @click="onMenuClick(2)" />
      </vab-context-menu-group>
    </vab-context-menu>
  </div>
</template>

<script lang="ts" setup>
import { VabContextMenu, VabContextMenuGroup, VabContextMenuItem, VabContextMenuSeparator } from '/@/plugins/VabContextMenu'

defineOptions({
  name: 'ContextMenu',
})

const show = ref<any>(false)
const showItem = ref<any>(true)
const itemText = ref<any>('item动态改变label')

const options = reactive<any>({ minWidth: 200, x: 500, y: 200 })

const onContextMenu = (e: MouseEvent) => {
  e.preventDefault()
  options.x = e.x
  options.y = e.y
  show.value = true
}

const changeLabelText = () => {
  itemText.value = itemText.value == '我的label改变了' ? 'item动态改变label' : '我的label改变了'
}

const onMenuClick = (value: any) => {
  $baseMessage(`您点击了子菜单${value}`, 'success', 'hey')
}
</script>

<style lang="scss">
.mx-context-menu {
  --mx-menu-background: var(--el-color-white);
  --mx-menu-hover-background: var(--el-color-primary-light-9);
  --mx-menu-active-background: var(--el-color-primary-light-9);
  --mx-menu-open-background: var(--el-color-primary-light-9);
  --mx-menu-open-hover-background: var(--el-color-primary-light-9);
  --mx-menu-divider: var(--el-border-color);
  --mx-menu-text: var(--el-color-grey);
  --mx-menu-hover-text: var(--el-color-primary);
  --mx-menu-active-text: var(--el-color-primary);
  --mx-menu-open-text: var(--el-color-primary);
  --mx-menu-open-hover-text: var(--el-color-primary);
  --mx-menu-disabled-text: var(--el-color-grey);
  --mx-menu-icon-size: 16px;
  --mx-menu-shadow-color: rgba(0, 0, 0, 0.1);
  --mx-menu-background-radius: var(--el-border-radius-base);
  --mx-menu-shortcut-background: var(--el-color-white);
  --mx-menu-shortcut-background-hover: var(--el-color-white);
  --mx-menu-shortcut-background-active: var(--el-color-white);
  --mx-menu-shortcut-background-open: var(--el-color-white);
  --mx-menu-shortcut-background-disabled: var(--el-color-white);
  --mx-menu-shortcut-text: var(--el-color-grey);
  --mx-menu-shortcut-text-hover: var(--el-color-primary);
  --mx-menu-shortcut-text-active: var(--el-color-primary);
  --mx-menu-shortcut-text-open: var(--el-color-primary);
  --mx-menu-shortcut-text-disabled: var(--el-color-grey);
  --mx-menu-focus-color: var(--el-color-primary);
  --mx-menu-placeholder-width: 24px;

  &-item {
    height: 32px;
    line-height: 32px;

    .mx-right-arrow {
      width: 12px;
      height: 12px;
    }
  }
}
</style>
