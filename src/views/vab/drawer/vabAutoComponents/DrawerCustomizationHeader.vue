<template>
  <el-button type="primary" @click="visible = true">打开</el-button>
  <el-drawer v-model="visible" append-to-body :show-close="false" size="288px">
    <template #header="{ close, titleId, titleClass }">
      <span :id="titleId" :class="titleClass">自定义头部</span>
      <el-button :icon="CircleCloseFilled" type="danger" @click="close">关闭</el-button>
    </template>
    这是抽屉内容
  </el-drawer>
</template>

<script lang="ts" setup>
import { CircleCloseFilled } from '@element-plus/icons-vue'

const visible = ref<boolean>(false)
</script>
