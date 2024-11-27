<template>
  <el-button type="primary" @click="drawer = true">打开</el-button>

  <el-drawer v-model="drawer" append-to-body size="288px" :with-header="false">
    <span>我是内容</span>
  </el-drawer>
</template>

<script lang="ts" setup>
const drawer = ref<boolean>(false)
</script>
