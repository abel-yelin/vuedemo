<template>
  <el-segmented v-model="value" :options="options">
    <template #default="{ item }">
      <div style="padding: calc(var(--el-padding) / 3)">
        <el-icon size="20">
          <component :is="item.icon" v-if="item && typeof item === 'object' && item.icon" />
        </el-icon>
        <div v-if="item && typeof item === 'object' && item.label">{{ item && item.label }}</div>
      </div>
    </template>
  </el-segmented>
</template>
<script lang="ts" setup>
import { Apple, Cherry, Grape, Orange, Pear } from '@element-plus/icons-vue'

const value = ref<string>('Apple')

const options = ref<any>([
  {
    label: '苹果',
    value: 'Apple',
    icon: Apple,
  },
  {
    label: '樱桃',
    value: 'Cherry',
    icon: Cherry,
  },
  {
    label: '葡萄',
    value: 'Grape',
    icon: Grape,
  },
  {
    label: '橘子',
    value: 'Orange',
    icon: Orange,
  },
  {
    label: '梨',
    value: 'Pear',
    icon: Pear,
  },
])
</script>
