<template>
  <div id="workbench-container" class="workbench-container vab-data-fullscreen">
    <div class="hidden-sm-and-up" style="padding: 20px">
      <vab-alert title="手机端不支持工作台演示" type="warning" />
    </div>
    <div class="hidden-xs-only">
      <workbench-header
        :style="{
          height: headerContentHeight,
          'line-height': headerContentHeight,
        }"
      />
      <div style="padding: 30px 40px 0 40px">
        <h1>TODO</h1>
      </div>
    </div>
    <vab-theme-setting />
  </div>
</template>

<script lang="ts" setup>
defineOptions({
  name: 'DataScreen',
})

const headerContentHeight = ref<any>('60px')

onMounted(() => {
  setTimeout(() => {
    $baseMessage('点击右上角【全屏】按钮使用效果更佳', 'success', 'hey')
  }, 1000)
  document.querySelectorAll('body')[0].className = ''
})
</script>

<style lang="scss" scoped>
#workbench-container.workbench-container.vab-data-fullscreen {
  overflow: auto;
  color: #fff;
  background: #01022e !important;

  :deep() {
    .vab-theme-setting {
      background: #01022e;
      border: 1px solid #101f58;

      section {
        > div {
          &:nth-child(1),
          &:nth-child(2),
          &:nth-child(3),
          &:nth-child(4) {
            display: none;
          }
        }
      }
    }
  }
}
</style>
