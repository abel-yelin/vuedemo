<template>
  <div class="icon-selector-container">
    <el-popover v-model:visible="visible" popper-class="icon-selector-popper">
      <template #reference>
        <el-button>
          <vab-icon :icon="icon" />
          <span>图标选择器</span>
          <vab-icon icon="arrow-down-s-line" />
        </el-button>
      </template>
      <vab-icon-selector @handle-icon="handleIcon" />
    </el-popover>
  </div>
</template>

<script lang="ts" setup>
defineOptions({
  name: 'IconSelector',
})
const icon = ref<string>('24-hours-fill')
const visible = ref<boolean>(false)

const handleIcon = (item: string) => {
  icon.value = item
  visible.value = false
}
</script>
