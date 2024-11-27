<template>
  <div class="scroll-top-container">
    <el-affix :offset="152">
      <el-button type="primary">下次打开页面时可以自动跳转至您当前滚动条的记录位置</el-button>
    </el-affix>
    <ul>
      <li v-for="item in 200" :key="item">Vue Shop Vite - {{ item }}</li>
    </ul>
  </div>
</template>

<script lang="ts" setup>
defineOptions({
  name: 'ScrollTop',
})
</script>

<style lang="scss" scoped>
.scroll-top-container {
  li {
    line-height: calc(var(--el-margin) * 1.5);
  }
}
</style>
