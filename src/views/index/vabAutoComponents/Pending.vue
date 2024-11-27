<template>
  <vab-card class="pending">
    <template #header>
      <vab-icon icon="ball-pen-line" />
      待处理
      <el-badge class="pending-count" :value="6" />
    </template>
    <el-row :gutter="20">
      <el-col :lg="12" :md="12" :sm="24" :xl="12" :xs="24">
        <vab-colorful-card :body-style="{ height: '100%' }" :style="style1">
          <div class="parting-line parting-line-danger"></div>
          <span class="pending-title pending-title-danger">
            订单预警
            <span>产品爆单，请及时处理</span>
          </span>
          <el-tag size="small">完成中</el-tag>
          <span class="pending-tips">预警原因：用户投诉发货不及时</span>
        </vab-colorful-card>
      </el-col>
      <el-col :lg="12" :md="12" :sm="24" :xl="12" :xs="24">
        <vab-colorful-card :body-style="{ height: '100%' }" :style="style2">
          <div class="parting-line parting-line-primary"></div>
          <span class="pending-title pending-title-primary">
            售后工单
            <span>用户张*给予五星好评</span>
          </span>
          <el-tag size="small" type="danger">未完成</el-tag>
          <span class="pending-tips">订单号：12345689654321</span>
        </vab-colorful-card>
      </el-col>
    </el-row>
  </vab-card>
</template>

<script lang="ts" setup>
const colorFrom1 = ref<string>('rgba(240,2,20,0.098)')
const colorTo1 = ref<string>('var(--el-color-white)')
const colorFrom2 = ref<string>('var(--el-color-primary-light-9)')
const colorTo2 = ref<string>('var(--el-color-white)')
const style1 = {
  background: `linear-gradient(to right,${colorFrom1.value}, ${colorTo1.value}) no-repeat`,
  border: 0,
  height: '135.19px',
}
const style2 = {
  background: `linear-gradient(to right,${colorFrom2.value}, ${colorTo2.value}) no-repeat`,
  border: 0,
  height: '135.19px',
}
</script>

<style lang="scss" scoped>
.pending {
  .pending-count {
    --el-badge-size: 16px;
    margin-left: 3px;
  }

  :deep() {
    sup {
      top: -1px;
    }

    .el-tag {
      margin-right: 5px;
    }

    .el-card__body {
      padding-bottom: 0;
    }

    .parting-line {
      float: left;
      width: 10px;
      height: calc(100% - 50px);
      margin-top: 15px;
      margin-right: 20px;
      border-radius: 10px;

      &-danger {
        background: var(--el-color-danger);
      }

      &-primary {
        background: var(--el-color-primary);
      }
    }

    .pending-title {
      display: block;
      margin-top: 12px;
      font-size: var(--el-font-size-medium);
      font-weight: bold;
      line-height: 38px;

      span {
        font-size: var(--el-font-size-extra-small);
        font-weight: normal;
      }

      &-danger {
        color: var(--el-color-danger);
      }

      &-primary {
        color: var(--el-color-primary);
      }
    }

    .pending-tips {
      font-size: var(--el-font-size-extra-small);
      color: var(--el-color-grey);
    }
  }
}
</style>
