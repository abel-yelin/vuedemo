<template>
  <div class="demo-image">
    <div v-for="fit in fits" :key="fit" class="block">
      <span class="demonstration">{{ fit }}</span>
      <el-image :fit="fit" :src="url" />
    </div>
  </div>
</template>

<script lang="ts" setup>
import type { ImageProps } from 'element-plus'

const fits = ref<ImageProps['fit'][]>(['fill', 'contain', 'cover', 'none', 'scale-down'])
const url = ref<string>('https://fuss10.elemecdn.com/e/5d/4a731a90594a4af544c0c25941171jpeg.jpeg')
</script>

<style lang="scss" scoped>
:deep() {
  .el-image {
    width: 100px;
    height: 100px;
  }

  @media (max-width: 768px) {
    .el-image {
      width: 50px;
      height: 50px;
    }
  }
}

.demo-image {
  .block {
    box-sizing: border-box;
    display: inline-block;
    width: 20%;
    padding: 30px 0;
    text-align: center;
    vertical-align: top;
    border-right: solid 1px var(--el-border-color);

    &:last-child {
      border-right: none;
    }
  }

  .demonstration {
    display: block;
    margin-bottom: 20px;
    font-size: 14px;
    color: var(--el-text-color-secondary);
  }
}
</style>
