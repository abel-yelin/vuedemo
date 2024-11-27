<template>
  <el-upload action="/uploadFile" drag multiple>
    <el-icon class="el-icon--upload">
      <upload-filled />
    </el-icon>
    <div class="el-upload__text">
      将文件拖拽至此处或
      <em>点击上传</em>
    </div>
    <template #tip>
      <div class="el-upload__tip">jpg/png 文件需小于500kb</div>
    </template>
  </el-upload>
</template>

<script lang="ts" setup>
import { UploadFilled } from '@element-plus/icons-vue'
</script>
