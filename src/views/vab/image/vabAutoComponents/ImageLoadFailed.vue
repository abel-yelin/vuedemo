<template>
  <div class="demo-image__error">
    <div class="block">
      <span class="demonstration">Default</span>
      <el-image />
    </div>
    <div class="block">
      <span class="demonstration">Custom</span>
      <el-image>
        <template #error>
          <div class="image-slot">
            <el-icon>
              <icon-picture />
            </el-icon>
          </div>
        </template>
      </el-image>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { Picture as IconPicture } from '@element-plus/icons-vue'
</script>

<style scoped>
.demo-image__error .block {
  box-sizing: border-box;
  display: inline-block;
  width: 49%;
  padding: 30px 0;
  text-align: center;
  vertical-align: top;
  border-right: solid 1px var(--el-border-color);
}

.demo-image__error .demonstration {
  display: block;
  margin-bottom: 20px;
  font-size: 14px;
  color: var(--el-text-color-secondary);
}

.demo-image__error .el-image {
  width: 100%;
  max-width: 300px;
  height: 200px;
  max-height: 200px;
  padding: 0 5px;
}

.demo-image__error .image-slot {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 100%;
  font-size: 30px;
  color: var(--el-text-color-secondary);
  background: var(--el-fill-color-light);
}

.demo-image__error .image-slot .el-icon {
  font-size: 30px;
}
</style>
