<template>
  <div class="link-container no-background-container">
    <vab-card title="基础用法">
      <el-space wrap>
        <el-link href="https://element.eleme.io" target="_blank">默认链接</el-link>
        <el-link type="primary">主要链接</el-link>
        <el-link type="success">成功链接</el-link>
        <el-link type="warning">警告链接</el-link>
        <el-link type="danger">危险链接</el-link>
        <el-link type="info">信息链接</el-link>
      </el-space>
    </vab-card>
    <vab-card title="禁用状态">
      <el-space wrap>
        <el-link disabled>默认链接</el-link>
        <el-link disabled type="primary">主要链接</el-link>
        <el-link disabled type="success">成功链接</el-link>
        <el-link disabled type="warning">警告链接</el-link>
        <el-link disabled type="danger">危险链接</el-link>
        <el-link disabled type="info">信息链接</el-link>
      </el-space>
    </vab-card>
    <vab-card title="下划线">
      <el-space wrap>
        <el-link :underline="false">无下划线</el-link>
        <el-link>有下划线</el-link>
      </el-space>
    </vab-card>
    <vab-card title="图标">
      <el-space wrap>
        <el-link :icon="Edit">编辑</el-link>
      </el-space>
    </vab-card>
  </div>
</template>

<script lang="ts" setup>
import { Edit } from '@element-plus/icons-vue'

defineOptions({
  name: 'Link',
})
</script>
