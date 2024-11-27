<template>
  <div class="pane-split-container no-background-container auto-height-container">
    <el-row :gutter="20">
      <el-col :span="24">
        <vab-card class="auto-height-card hidden-sm-and-up">
          <vab-alert title="手机端不支持面板分割演示" type="warning" />
        </vab-card>
        <vab-card class="auto-height-card hidden-xs-only">
          <vab-pane-split ratio="2/3" @resize="resize">
            <template #one>
              <div class="pane-split-left">A</div>
            </template>
            <template #two>
              <vab-pane-split class="pane-split-right" horizontal @resize="resize">
                <template #one>
                  <div class="pane-split-up">B</div>
                </template>
                <template #two>
                  <div class="pane-split-down">C</div>
                </template>
              </vab-pane-split>
            </template>
          </vab-pane-split>
        </vab-card>
      </el-col>
    </el-row>
  </div>
</template>

<script lang="ts" setup>
defineOptions({
  name: 'PaneSplit',
})

const resize = () => {
  // console.log('resize')
  // 监听panel大小变化
}
</script>

<style lang="scss" scoped>
.pane-split-container {
  width: 100%;
  height: calc(var(--el-container-height) - var(--el-padding)) !important;

  @mixin panel {
    display: flex;
    align-items: center;
    justify-content: center;
    height: 100%;
    font-size: var(--el-font-size-extra-large);
    font-weight: bold;
    color: var(--el-color-white);
    user-select: none;
  }

  .pane-split-left {
    background-color: var(--el-color-primary);
    @include panel;
  }

  .pane-split-right {
    .pane-split-up {
      @include panel;
      background-color: var(--el-color-warning);
    }

    .pane-split-down {
      @include panel;
      background-color: var(--el-color-success);
    }
  }
}
</style>
