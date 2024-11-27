<template>
  <div class="upload-container no-background-container">
    <vab-card>
      <template #header>基础用法</template>
      <upload-basic />
    </vab-card>
    <vab-card>
      <template #header>覆盖前一个文件</template>
      <upload-limit-cover />
    </vab-card>
    <vab-card>
      <template #header>照片墙</template>
      <upload-photo-wall />
    </vab-card>
    <vab-card>
      <template #header>自定义缩略图</template>
      <upload-custom-thumbnail />
    </vab-card>
    <vab-card>
      <template #header>图片列表缩略图</template>
      <upload-file-list-with-thumbnail />
    </vab-card>
    <vab-card>
      <template #header>上传文件列表控制</template>
      <upload-file-list />
    </vab-card>
    <vab-card>
      <template #header>拖拽上传</template>
      <upload-drag-and-drop />
    </vab-card>
    <vab-card>
      <template #header>手动上传</template>
      <upload-manual />
    </vab-card>
  </div>
</template>

<script lang="ts" setup>
defineOptions({
  name: 'Upload',
})
</script>
