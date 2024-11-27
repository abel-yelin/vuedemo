<template>
  <div class="guid-container">
    <el-button type="primary" @click="handleOpen('primary')">打开页面引导（主题色）</el-button>
    <el-button plain type="primary" @click="handleOpen('default')">打开页面引导（默认）</el-button>

    <el-tour v-model="open" :type="type">
      <el-tour-step v-for="step in steps" :key="step" :description="step.description" :target="step.target" :title="step.title" />
    </el-tour>
  </div>
</template>

<script lang="ts" setup>
defineOptions({
  name: 'Guide',
})

const open = ref<boolean>(true)
const type = ref<any>('primary')
const steps = ref<any>([
  {
    target: '.vab-buy',
    title: '购买源码',
    description: '这里是购买源码',
  },
  {
    target: '.vab-dark',
    title: '暗黑模式',
    description: '这里是暗黑模式',
  },
  {
    target: '.vab-color-picker',
    title: '配色',
    description: '这里是配色',
  },
  {
    target: '.ri-t-shirt-line',
    title: '主题配置',
    description: '这里是主题配置',
  },
  {
    target: '.vab-lock i',
    title: '锁屏',
    description: '这里是锁屏',
  },
  {
    target: '.ri-notification-2-line',
    title: '通知',
    description: '这里是通知',
  },
  {
    target: '.ri-translate-2',
    title: '国际化',
    description: '这里是国际化',
  },
  {
    target: '.vab-fullscreen',
    title: '全屏',
    description: '这里是全屏',
  },
  {
    target: '.ri-refresh-line',
    title: '刷新',
    description: '这里是刷新',
  },
  {
    target: '.vab-tabs-more-icon',
    title: '操作',
    description: '这里是操作',
  },
  {
    target: '.vab-buy',
    title: '购买源码',
    description: '这里是购买源码',
  },
])

const handleOpen = (value: string) => {
  open.value = true
  type.value = value
}

onActivated(() => {
  open.value = true
})
</script>
