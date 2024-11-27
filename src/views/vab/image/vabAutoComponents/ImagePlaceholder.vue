<template>
  <div class="demo-image__placeholder">
    <div class="block">
      <span class="demonstration">Default</span>
      <el-image :src="src" />
    </div>
    <div class="block">
      <span class="demonstration">Custom</span>
      <el-image :src="src">
        <template #placeholder>
          <div class="image-slot">
            Loading
            <span class="dot">...</span>
          </div>
        </template>
      </el-image>
    </div>
  </div>
</template>

<script lang="ts" setup>
const src = ref<string>('https://cube.elemecdn.com/6/94/4d3ea53c084bad6931a56d5158a48jpeg.jpeg')
</script>

<style scoped>
.demo-image__placeholder .block {
  box-sizing: border-box;
  display: inline-block;
  width: 49%;
  padding: 30px 0;
  text-align: center;
  vertical-align: top;
  border-right: solid 1px var(--el-border-color);
}

.demo-image__placeholder .demonstration {
  display: block;
  margin-bottom: 20px;
  font-size: var(--el-font-size-base);
  color: var(--el-text-color-secondary);
}

.demo-image__placeholder .el-image {
  max-width: 300px;
  max-height: 200px;
  padding: 0 5px;
}

.demo-image__placeholder.image-slot {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 100%;
  font-size: 14px;
  color: var(--el-text-color-secondary);
  background: var(--el-fill-color-light);
}

.demo-image__placeholder .dot {
  overflow: hidden;
  animation: dot 2s infinite steps(3, start);
}
</style>
