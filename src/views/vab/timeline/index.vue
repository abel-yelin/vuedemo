<template>
  <div class="timeline-container no-background-container">
    <el-row :gutter="20">
      <el-col :lg="8" :md="12" :sm="12" :xl="8" :xs="24">
        <vab-card>
          <template #header>常规风格</template>

          <el-timeline>
            <el-timeline-item v-for="(item, index) in activities" :key="index" :color="item.color" :timestamp="item.timestamp">
              <template v-if="!item.color" #dot>
                <vab-icon v-if="item.icon" :icon="item.icon" />
                <vab-dot v-if="item.waver" :type="item.waver" />
              </template>
              <vab-card v-if="item.card">
                {{ item.content }}
              </vab-card>
              <template v-else>
                {{ item.content }}
              </template>
            </el-timeline-item>
          </el-timeline>
        </vab-card>
      </el-col>
      <el-col :lg="8" :md="12" :sm="12" :xl="8" :xs="24">
        <vab-card>
          <template #header>卡片风格</template>

          <el-timeline>
            <el-timeline-item v-for="(item, index) in activities" :key="index" :color="item.color" :timestamp="item.timestamp">
              <template v-if="!item.color" #dot>
                <vab-icon v-if="item.icon" :icon="item.icon" />
                <vab-dot v-if="item.waver" :type="item.waver" />
              </template>
              <div class="vab-info-card" :class="{ ['vab-info-card-' + item.cardType]: true }">
                {{ item.content }}
              </div>
            </el-timeline-item>
          </el-timeline>
        </vab-card>
      </el-col>
    </el-row>
  </div>
</template>

<script lang="ts" setup>
defineOptions({
  name: 'Timeline',
})

const activities = ref<any>([
  {
    content: '支持使用默认图标',
    timestamp: '2021-04-12 20:46',
    icon: 'account-circle-line',
    cardType: 'warning',
  },
  {
    content: '支持使用默认图标',
    timestamp: '2021-04-18 20:46',
    icon: 'archive-line',
    cardType: 'error',
  },
  {
    content: '支持自定义颜色',
    timestamp: '2021-04-03 20:46',
    color: '#13ce66',
    cardType: 'success',
  },
  {
    content: '支持默认颜色',
    timestamp: '2021-04-03 20:46',
    color: '#e4e7ed',
  },
  {
    content: '支持success闪动',
    timestamp: '2021-04-05 20:46',
    waver: 'success',
  },
  {
    content: '支持error闪动',
    timestamp: '2021-04-05 20:46',
    waver: 'error',
  },
])
</script>

<style lang="scss" scoped>
.timeline-container {
  :deep() {
    .el-timeline-item__dot {
      [class*='ri'] {
        width: 12px;
        height: 12px;
        margin-left: -3px;
        background: var(--el-color-white);
      }

      .vab-dot {
        left: -1px;
        width: 12px;
        height: 12px;
        margin: auto !important;
      }
    }

    .el-card {
      .el-card__header {
        position: relative;

        .card-header-radio {
          position: absolute;
          top: 20px;
          right: var(--el-margin);
        }
      }
    }
  }

  .vab-info-card {
    position: relative;
    width: 80%;
    padding: var(--el-padding);
    color: var(--el-color-grey);
    background: var(--el-border-color);
    border-radius: calc(var(--el-border-radius-base) + 2px);

    &:after {
      position: absolute;
      top: 8px;
      left: -10px;
      width: 0;
      height: 0;
      overflow: hidden;
      content: '';
      border-color: var(--el-border-color) transparent transparent;
      border-style: solid dashed dashed;
      border-width: 10px;
    }

    &-success {
      color: var(--el-color-white);
      background: var(--el-color-success);

      &:after {
        border-color: var(--el-color-success) transparent transparent;
      }
    }

    &-error {
      color: var(--el-color-white);
      background: var(--el-color-error);

      &:after {
        border-color: var(--el-color-error) transparent transparent;
      }
    }

    &-warning {
      color: var(--el-color-white);
      background: var(--el-color-warning);

      &:after {
        border-color: var(--el-color-warning) transparent transparent;
      }
    }
  }
}
</style>
