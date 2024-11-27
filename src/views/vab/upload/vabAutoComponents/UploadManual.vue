<template>
  <el-upload ref="uploadRef" action="/uploadFile" :auto-upload="false">
    <template #trigger>
      <el-button type="primary">选择文件</el-button>
    </template>

    <el-button type="success" @click="submitUpload">上传到服务器</el-button>

    <template #tip>
      <div class="el-upload__tip">jpg/png 文件需小于500kb</div>
    </template>
  </el-upload>
</template>

<script lang="ts" setup>
import type { UploadInstance } from 'element-plus'

const uploadRef = ref<UploadInstance>()

const submitUpload = () => {
  uploadRef.value?.submit()
}
</script>
