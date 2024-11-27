<template>
  <div class="errorLog-container auto-height-container">
    <vab-error-log-content />
  </div>
</template>

<script lang="ts" setup>
defineOptions({
  name: 'ErrorLog',
})
</script>

<style lang="scss" scoped>
:deep() {
  .vab-data-empty {
    min-height: calc(var(--el-container-height) - 105px) !important;
  }
}
</style>
