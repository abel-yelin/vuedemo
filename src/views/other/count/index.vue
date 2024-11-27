<template>
  <div class="count-container">
    <div class="count-text">
      <vab-count
        :decimals="form.decimals"
        :duration="form.duration"
        :end-value="form.endValue"
        :prefix="form.prefix"
        :separator="form.separator"
        :start-value="form.startValue"
        :suffix="form.suffix"
      />
    </div>
    <el-form inline label-width="80px" :model="form">
      <el-form-item label="起始值">
        <el-input-number v-model="form.startValue" :min="0" />
      </el-form-item>
      <el-form-item label="最终值">
        <el-input-number v-model="form.endValue" :min="0" />
      </el-form-item>
      <el-form-item label="持续时间">
        <el-input-number v-model="form.duration" :min="0" />
      </el-form-item>
      <el-form-item label="小数位数">
        <el-input-number v-model="form.decimals" :max="2" :min="0" />
      </el-form-item>
      <el-form-item label="前缀">
        <el-input v-model="form.prefix" clearable />
      </el-form-item>
      <el-form-item label="后缀">
        <el-input v-model="form.suffix" clearable />
      </el-form-item>
    </el-form>
  </div>
</template>

<script lang="ts" setup>
defineOptions({
  name: 'Count',
})

const form = reactive<any>({
  startValue: 0,
  endValue: 999,
  decimals: 0,
  prefix: '',
  suffix: '',
  separator: ',',
  duration: 5000,
})
</script>

<style lang="scss" scoped>
.count-container {
  .count-text {
    height: 80px;
    margin-bottom: calc(var(--el-margin) / 2);
    font-size: 60px;
    font-weight: bold;
    text-align: center;
    background: linear-gradient(to top, #77e0a0, var(--el-color-primary));
    background-clip: text;
    -webkit-text-fill-color: transparent;
  }
}
</style>
