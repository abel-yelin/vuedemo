<template>
  <el-upload action="/uploadFile" :auto-upload="false" list-type="picture-card">
    <el-icon>
      <plus />
    </el-icon>

    <template #file="{ file }">
      <div>
        <img alt="" class="el-upload-list__item-thumbnail" :src="file.url" />
        <span class="el-upload-list__item-actions">
          <span class="el-upload-list__item-preview" @click="handlePictureCardPreview(file)">
            <el-icon><zoom-in /></el-icon>
          </span>
          <span v-if="!disabled" class="el-upload-list__item-delete">
            <el-icon><download /></el-icon>
          </span>
          <span v-if="!disabled" class="el-upload-list__item-delete">
            <el-icon><delete /></el-icon>
          </span>
        </span>
      </div>
    </template>
  </el-upload>

  <vab-dialog v-model="dialogVisible" append-to-body>
    <img alt="Preview Image" :src="dialogImageUrl" style="width: 100%" />
  </vab-dialog>
</template>

<script lang="ts" setup>
import { Delete, Download, Plus, ZoomIn } from '@element-plus/icons-vue'

import type { UploadFile } from 'element-plus'

const dialogImageUrl = ref<string | undefined>('')
const dialogVisible = ref<boolean>(false)
const disabled = ref<boolean>(false)

const handlePictureCardPreview = (file: UploadFile) => {
  dialogImageUrl.value = file.url
  dialogVisible.value = true
}
</script>
