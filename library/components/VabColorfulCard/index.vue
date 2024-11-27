<template>
  <el-card
    :body-style="props.bodyStyle"
    class="vab-colorful-card"
    :shadow="props.shadow"
    :style="
      props.style
        ? props.style
        : {
            background: `linear-gradient(120deg, ${props.colorFrom} 10%, ${props.colorTo})`,
          }
    "
  >
    <template v-if="$slots.header" #header>
      <slot name="header"></slot>
    </template>
    <vab-icon v-if="props.icon" :icon="props.icon" />
    <slot></slot>
  </el-card>
</template>

<script lang="ts" setup>
import { ElCard } from 'element-plus'

defineOptions({
  name: 'VabColorfulCard',
})

const props = defineProps({
  ...ElCard.props,
  shadow: {
    type: String,
    default: 'never',
  },
  colorFrom: {
    type: String,
    default: '',
  },
  colorTo: {
    type: String,
    default: '',
  },
  title: {
    type: String,
    default: '',
  },
  icon: {
    type: String,
    default: '',
  },
  style: {
    type: Object,
    default: () => {},
  },
})
</script>

<style lang="scss" scoped>
.vab-colorful-card {
  position: relative;
  min-height: 120px;
  cursor: pointer;

  :deep() {
    .el-card__header {
      color: var(--el-color-white);
    }
  }

  i {
    position: absolute;
    right: 20px;
    font-size: 60px;
    transform: rotate(15deg);
  }
}
</style>
