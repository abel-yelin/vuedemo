<template>
  <div class="echarts-container no-background-container">
    <el-row :gutter="20">
      <el-col :span="24">
        <vab-card>
          <el-form class="demo-form-inline" :inline="true">
            <el-form-item label="换肤">
              <vab-color-picker />
            </el-form-item>
          </el-form>
        </vab-card>
      </el-col>
      <vab-graphic-stroke-animation title="文字描边" />
      <vab-chart-bar title="柱状图（带全部事件）" />
      <vab-chart-line title="折线图" />
      <vab-chart-pie title="饼状图" />
      <vab-chart-scatter title="散点图" />
      <vab-chart-radar title="雷达图" />
      <vab-chart-gauge title="仪表图" />
      <vab-chart-theme-river title="河流流向图" />
      <vab-chart-funnel title="漏斗图" />
      <vab-chart-candlestick title="K线图" />
      <vab-chart-treemap title="矩形树图" />
      <vab-chart-sunburst title="旭日图" />
      <vab-chart-china-map title="中国地图" />
      <vab-chart-world-map title="世界地图" />
    </el-row>
  </div>
</template>

<script lang="ts" setup>
defineOptions({
  name: 'ECharts',
})
</script>

<style lang="scss" scoped>
.echarts-container {
  :deep() {
    .el-form-item {
      margin-bottom: 0;

      .vab-color-picker {
        margin-left: 0 !important;
      }
    }

    .el-card {
      .echarts {
        width: 100%;
        height: 200px;
      }
    }
  }
}
</style>
