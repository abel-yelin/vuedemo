<template>
  <el-carousel height="180px" :interval="4000" type="card">
    <el-carousel-item v-for="item in 3" :key="item">
      <h3>{{ item }}</h3>
    </el-carousel-item>
  </el-carousel>
</template>

<style lang="scss" scoped>
:deep() {
  .el-carousel__item {
    display: flex;
    align-items: center;
    justify-content: center;

    h3 {
      color: var(--el-color-white);
      text-align: center;
      opacity: 0.75;
    }

    &:nth-child(2n) {
      background-color: var(--el-color-success);
    }

    &:nth-child(2n + 1) {
      background-color: var(--el-color-primary);
    }
  }
}
</style>
