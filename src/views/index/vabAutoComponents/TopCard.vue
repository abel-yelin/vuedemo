<template>
  <vab-card class="top-card" :class="'top-card-' + background">
    {{ title }}
    <template v-if="$slots.tag">
      <slot name="tag"></slot>
    </template>
    <p>
      <vab-count
        :decimals="countConfig.decimals"
        :duration="countConfig.duration"
        :end-value="countConfig.endValue"
        :prefix="countConfig.prefix"
        :separator="countConfig.separator"
        :start-value="countConfig.startValue"
        :suffix="countConfig.suffix"
      />
    </p>
    <div v-if="icon" class="right-icon">
      <vab-icon :icon="icon" />
    </div>

    <div class="bottom">
      自上周以来
      <vab-icon icon="arrow-up-line" />
      <span>{{ percentage }}</span>
      <template v-if="$slots.chart">
        <slot name="chart"></slot>
      </template>
    </div>
  </vab-card>
</template>

<script lang="ts" setup>
import { random } from 'lodash-es'

defineOptions({
  name: 'TopCard',
})

defineProps({
  background: {
    type: String,
    default: 'white',
  },
  title: {
    type: String,
    default: 'Test',
  },
  icon: {
    type: String,
    default: '',
  },
  percentage: {
    type: String,
    default: '10%',
  },
  countConfig: {
    type: Object,
    default: () => {
      return {
        startValue: 0,
        endValue: random(1000, 20000),
        decimals: 0,
        prefix: '',
        suffix: '',
        separator: ',',
        duration: 8000,
      }
    },
  },
})
</script>

<style lang="scss" scoped>
.top-card {
  position: relative;
  height: 168px !important;

  :deep() {
    .el-tag {
      float: right;
    }
  }

  p {
    font-size: 28px;
  }

  .right-icon {
    position: absolute;
    top: 50%;
    right: 20px;
    width: 60px;
    height: 60px;
    line-height: 60px;
    color: var(--el-color-primary);
    text-align: center;
    background: var(--el-color-primary-light-9);
    border-radius: 50%;
    transform: translateY(-50%);

    i {
      font-size: 35px;
    }
  }

  .bottom {
    .ri-arrow-up-line {
      width: 18px;
      height: 18px;
      margin: 0 3px 0 2px;
      color: var(--el-color-success);
      background: var(--el-color-success-light);
      border-radius: 50%;
      transform: scale(0.8);
    }

    span {
      color: var(--el-color-success);
    }
  }

  &-blue {
    color: var(--el-color-white);
    background: var(--el-color-primary);
    background: linear-gradient(90deg, var(--el-color-primary-light-4), var(--el-color-primary));

    .right-icon {
      color: var(--el-color-primary);
      background: var(--el-color-white);
    }

    .bottom {
      .ri-arrow-up-line {
        color: var(--el-color-primary);
        background: var(--el-color-white);
      }

      span {
        color: var(--el-color-white);
      }
    }
  }
}
</style>
