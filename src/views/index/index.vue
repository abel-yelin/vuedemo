<template>
  <div class="index-container no-background-container">
    <el-row :gutter="20">
      <el-col :lg="24" :md="24" :sm="24" :xl="24" :xs="24">
        <page-header />
      </el-col>
      <el-col :lg="6" :md="12" :sm="24" :xl="6" :xs="24">
        <top-card background="blue" :count-config="countConfig1" icon="money-cny-circle-line" percentage="10%" title="总销量" />
      </el-col>
      <el-col :lg="6" :md="12" :sm="24" :xl="6" :xs="24">
        <top-card background="white" percentage="30%" title="活跃用户">
          <template #tag>
            <el-tag type="danger">日</el-tag>
          </template>
          <template #chart>
            <active-users-bar />
          </template>
        </top-card>
      </el-col>
      <el-col :lg="6" :md="12" :sm="24" :xl="6" :xs="24">
        <top-card background="white" icon="money-cny-box-line" percentage="44%" title="总成交" />
      </el-col>
      <el-col :lg="6" :md="12" :sm="24" :xl="6" :xs="24">
        <top-card background="white" icon="passport-line" percentage="10%" title="订单" />
      </el-col>

      <el-col :lg="12" :md="24" :sm="24" :xl="12" :xs="24">
        <pending />
      </el-col>
      <el-col :lg="12" :md="24" :sm="24" :xl="12" :xs="24">
        <version-information />
      </el-col>
      <el-col :lg="24" :md="24" :sm="24" :xl="24" :xs="24">
        <recommendation />
      </el-col>
      <el-col :lg="12" :md="12" :sm="24" :xl="12" :xs="24">
        <develop />
      </el-col>
      <el-col :lg="12" :md="12" :sm="24" :xl="12" :xs="24">
        <authorization />
      </el-col>
    </el-row>
  </div>
</template>

<script lang="ts" setup>
import { random } from 'lodash-es'

defineOptions({
  name: 'Index',
})

const countConfig1 = reactive<any>({
  startValue: 0,
  endValue: random(1000, 20000),
  decimals: 2,
  prefix: '￥',
  suffix: '',
  separator: ',',
  duration: 8000,
})
</script>

<style lang="scss" scoped>
.index-container {
  :deep() {
    .el-card {
      .el-card__header {
        position: relative;

        > div > span {
          display: flex;
          align-items: center;

          i {
            margin-right: 3px;
          }
        }
      }

      .el-card__body {
        position: relative;

        .echarts {
          width: 100%;
          height: 127px;
        }

        .card-footer-tag {
          position: absolute;
          right: var(--el-margin);
          bottom: 15px;
        }
      }
    }
  }
}
</style>
