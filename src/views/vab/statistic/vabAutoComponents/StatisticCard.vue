<template>
  <el-row :gutter="20">
    <el-col :span="8">
      <div class="statistic-card">
        <el-statistic :value="98500">
          <template #title>
            <div style="display: inline-flex; align-items: center">
              每日活跃用户
              <el-tooltip content="一天内登录该产品的用户数" effect="light">
                <el-icon :size="12" style="margin-left: 4px">
                  <warning />
                </el-icon>
              </el-tooltip>
            </div>
          </template>
        </el-statistic>
        <div class="statistic-footer">
          <div class="footer-item">
            <span>比昨天</span>
            <span class="green">
              24%
              <el-icon>
                <caret-top />
              </el-icon>
            </span>
          </div>
        </div>
      </div>
    </el-col>
    <el-col :span="8">
      <div class="statistic-card">
        <el-statistic :value="693700">
          <template #title>
            <div style="display: inline-flex; align-items: center">
              每月活跃用户
              <el-tooltip content="Number of users who logged into the product in one month" effect="light" placement="top">
                <el-icon :size="12" style="margin-left: 4px">
                  <warning />
                </el-icon>
              </el-tooltip>
            </div>
          </template>
        </el-statistic>
        <div class="statistic-footer">
          <div class="footer-item">
            <span>环比</span>
            <span class="red">
              12%
              <el-icon>
                <caret-bottom />
              </el-icon>
            </span>
          </div>
        </div>
      </div>
    </el-col>
    <el-col :span="8">
      <div class="statistic-card">
        <el-statistic title="今日新增交易" :value="72000">
          <template #title>
            <div style="display: inline-flex; align-items: center">今日新增交易</div>
          </template>
        </el-statistic>
        <div class="statistic-footer">
          <div class="footer-item">
            <span>比昨天</span>
            <span class="green">
              16%
              <el-icon>
                <caret-top />
              </el-icon>
            </span>
          </div>
          <div class="footer-item">
            <el-icon :size="14">
              <arrow-right />
            </el-icon>
          </div>
        </div>
      </div>
    </el-col>
  </el-row>
</template>

<script lang="ts" setup>
import { ArrowRight, CaretBottom, CaretTop, Warning } from '@element-plus/icons-vue'
</script>

<style lang="scss" scoped>
.el-statistic {
  --el-statistic-content-font-size: 28px;
}

.statistic-card {
  height: 100%;
  padding: var(--el-padding);
  background-color: var(--el-bg-color-overlay);
  border-radius: 4px;

  :deep() {
    .el-statistic__head,
    .el-statistic__content {
      display: flex;
      flex-wrap: wrap;
      align-items: center;
      justify-content: center;
    }
  }

  .statistic-footer {
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    justify-content: center;
    margin-top: var(--el-font-size-medium);
    font-size: var(--el-font-size-extra-small);
    color: var(--el-text-color-regular);

    .footer-item {
      display: flex;
      align-items: center;
      justify-content: center;

      span:last-child {
        display: inline-flex;
        align-items: center;
        margin-left: 4px;
      }
    }

    .green {
      color: var(--el-color-success);
    }

    .red {
      color: var(--el-color-error);
    }
  }
}
</style>
