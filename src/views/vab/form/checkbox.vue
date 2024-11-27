<template>
  <div class="checkbox-container no-background-container">
    <vab-card title="基础用法">
      <el-checkbox v-model="checked">备选项1</el-checkbox>
    </vab-card>
    <vab-card title="禁用状态">
      <el-checkbox v-model="checked1" disabled>备选项1</el-checkbox>
      <el-checkbox v-model="checked2" disabled>备选项2</el-checkbox>
    </vab-card>
    <vab-card title="多选框组">
      <el-checkbox-group v-model="checkList">
        <el-checkbox label="复选框 A" value="复选框 A" />
        <el-checkbox label="复选框 B" value="复选框 B" />
        <el-checkbox label="复选框 C" value="复选框 C" />
        <el-checkbox disabled label="禁用" value="禁用" />
        <el-checkbox disabled label="选中且禁用" value="选中且禁用" />
      </el-checkbox-group>
    </vab-card>
    <vab-card title="可选项目数量的限制">
      <el-checkbox-group v-model="checkedCities" :max="2" :min="1">
        <el-checkbox v-for="city in cities" :key="city" :label="city" :value="city" />
      </el-checkbox-group>
    </vab-card>
    <vab-card title="按钮样式">
      <el-checkbox-group v-model="checkboxGroup1">
        <el-checkbox-button v-for="city in cities" :key="city" :label="city" :value="city" />
      </el-checkbox-group>
    </vab-card>
    <vab-card title="带有边框">
      <el-checkbox v-model="checked3" border label="备选项1" />
      <el-checkbox v-model="checked4" border label="备选项2" />
    </vab-card>
  </div>
</template>

<script lang="ts" setup>
defineOptions({
  name: 'Checkbox',
})

const checked = ref<boolean>(true)
const checked1 = ref<boolean>(false)
const checked2 = ref<boolean>(true)
const checkList = ref<any>(['选中且禁用', '复选框 A'])
const checkedCities = ref<any>(['上海', '北京'])
const cities = ref<any>(['上海', '北京', '广州', '深圳'])
const checkboxGroup1 = ref<any>(['上海'])
const checked3 = ref<boolean>(true)
const checked4 = ref<boolean>(false)
</script>
