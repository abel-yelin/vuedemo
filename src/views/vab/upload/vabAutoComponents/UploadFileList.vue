<template>
  <el-upload v-model:file-list="fileList" action="/uploadFile" :on-change="handleChange">
    <el-button type="primary">点击上传</el-button>
    <template #tip>
      <div class="el-upload__tip">jpg/png 文件需小于500kb</div>
    </template>
  </el-upload>
</template>

<script lang="ts" setup>
import type { UploadProps, UploadUserFile } from 'element-plus'

const fileList = ref<UploadUserFile[]>([
  {
    name: 'food.jpeg',
    url: 'https://fuss10.elemecdn.com/3/63/4e7f3a15429bfda99bce42a18cdd1jpeg.jpeg?imageMogr2/thumbnail/360x360/format/webp/quality/100',
  },
  {
    name: 'food2.jpeg',
    url: 'https://fuss10.elemecdn.com/3/63/4e7f3a15429bfda99bce42a18cdd1jpeg.jpeg?imageMogr2/thumbnail/360x360/format/webp/quality/100',
  },
])

const handleChange: UploadProps['onChange'] = () => {
  fileList.value = fileList.value.slice(-3)
}
</script>
