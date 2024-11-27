<template>
  <div class="dashboard-container no-background-container">
    <el-row :gutter="20">
      <el-col :lg="3" :md="12" :sm="24" :xl="3" :xs="24">
        <vab-card class="dashboard-user">
          <vab-icon icon="lllustration/Scenes03" is-custom-svg />
        </vab-card>
      </el-col>
      <el-col :lg="7" :md="12" :sm="24" :xl="7" :xs="24">
        <top-card background="white" icon="bard-line" percentage="14%" title="数据挖掘" />
      </el-col>
      <el-col :lg="7" :md="12" :sm="24" :xl="7" :xs="24">
        <top-card background="white" :count-config="countConfig1" icon="compass-2-line" percentage="32%" title="内存占用" />
      </el-col>
      <el-col :lg="7" :md="12" :sm="24" :xl="7" :xs="24">
        <top-card background="white" :count-config="countConfig2" icon="u-disk-line" percentage="13%" title="硬盘占用" />
      </el-col>
      <el-col :lg="7" :md="12" :sm="24" :xl="7" :xs="24">
        <branch />
      </el-col>
      <el-col :lg="9" :md="12" :sm="24" :xl="9" :xs="24">
        <trend />
      </el-col>
      <el-col :lg="8" :md="24" :sm="24" :xl="8" :xs="24">
        <rank />
      </el-col>
      <el-col :lg="24" :md="24" :sm="24" :xl="24" :xs="24">
        <tabs />
      </el-col>
    </el-row>
  </div>
</template>

<script lang="ts" setup>
import { random } from 'lodash-es'

defineOptions({
  name: 'Dashboard',
})

const countConfig1 = {
  startValue: 0,
  endValue: random(1000, 2000),
  decimals: 0,
  prefix: '',
  suffix: ' KB',
  separator: ',',
  duration: 8000,
}

const countConfig2 = {
  startValue: 0,
  endValue: random(1000, 2000),
  decimals: 0,
  prefix: '',
  suffix: ' GB',
  separator: ',',
  duration: 8000,
}
</script>

<style lang="scss" scoped>
.dashboard-container {
  :deep() {
    .dashboard-user {
      height: 168px !important;

      .el-card__body {
        display: flex;
        align-items: center;
        justify-content: center;

        .vab-icon {
          width: 100%;
          height: 130px;
        }
      }
    }

    .el-card {
      [class*='-echart'] {
        width: 100%;
        height: 170px;
      }
    }
  }
}
</style>
