<template>
  <el-upload ref="upload" action="/uploadFile" :auto-upload="false" :limit="1" :on-exceed="handleExceed">
    <template #trigger>
      <el-button type="primary">选择文件</el-button>
    </template>
    <el-button type="success" @click="submitUpload">上传到服务器</el-button>
    <template #tip>
      <div class="el-upload__tip">限制1个文件，新文件将覆盖旧文件</div>
    </template>
  </el-upload>
</template>

<script lang="ts" setup>
import { genFileId } from 'element-plus'
import type { UploadInstance, UploadProps, UploadRawFile } from 'element-plus'

const upload = ref<UploadInstance>()

const handleExceed: UploadProps['onExceed'] = (files) => {
  upload.value?.clearFiles()
  const file = files[0] as UploadRawFile
  file.uid = genFileId()
  upload.value?.handleStart(file)
}

const submitUpload = () => {
  upload.value?.submit()
}
</script>
