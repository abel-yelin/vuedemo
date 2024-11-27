<template>
  <div class="award-container no-background-container">
    <el-row :gutter="20">
      <el-col :lg="8" :md="12" :sm="24" :xl="8" :xs="24">
        <vab-card title="大转盘">
          <award-wheel />
        </vab-card>
      </el-col>
      <el-col :lg="8" :md="12" :sm="24" :xl="8" :xs="24">
        <vab-card title="九宫格">
          <award-grid />
        </vab-card>
      </el-col>
      <el-col :lg="8" :md="12" :sm="24" :xl="8" :xs="24">
        <vab-card title="老虎机">
          <award-slot-machine />
        </vab-card>
      </el-col>
    </el-row>
  </div>
</template>

<script lang="ts" setup>
defineOptions({
  name: 'Award',
})
</script>

<style lang="scss" scoped>
.award-container {
  :deep() {
    .el-card__body {
      display: flex;
      align-items: center;
      justify-content: center;
    }
  }
}
</style>
