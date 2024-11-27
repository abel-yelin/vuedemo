<template>
  <el-alert
    :center="props.center"
    :closable="props.closable"
    :close-text="props.closeText"
    :description="props.description"
    :effect="props.effect"
    :show-icon="props.showIcon"
    :title="props.title"
    :type="props.type"
    v-bind="$attrs"
  >
    <template v-if="props.title || $slots.title" #title>
      <slot name="title">
        {{ props.title }}
      </slot>
    </template>
    <template v-if="$slots.default || props.description" #default>
      <slot name="default">
        {{ props.description }}
      </slot>
    </template>
  </el-alert>
</template>

<script lang="ts" setup>
import { ElAlert } from 'element-plus'

defineOptions({
  name: 'VabAlert',
})

const props = defineProps({
  ...ElAlert.props,
  closable: {
    type: Boolean,
    default: false,
  },
})
</script>
