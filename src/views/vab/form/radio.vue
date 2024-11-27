<template>
  <div class="radio-container no-background-container">
    <vab-card>
      <template #header>基础用法</template>
      <el-radio v-model="radio" label="备选项1" value="1" />
      <el-radio v-model="radio" label="备选项2" value="2" />
    </vab-card>
    <vab-card>
      <template #header>禁用状态</template>
      <el-radio v-model="radio2" disabled label="禁用" value="1" />
      <el-radio v-model="radio2" disabled label="选中且禁用" value="2" />
    </vab-card>
    <vab-card>
      <template #header>单选框组</template>
      <el-radio-group v-model="radio3">
        <el-radio label="备选项1" value="1" />
        <el-radio label="备选项2" value="2" />
        <el-radio label="备选项3" value="3" />
      </el-radio-group>
    </vab-card>
    <vab-card>
      <template #header>按钮样式</template>
      <el-radio-group v-model="radio4">
        <el-radio-button v-for="city in cities" :key="city" :label="city" :value="city" />
      </el-radio-group>
    </vab-card>
    <vab-card>
      <template #header>带有边框</template>
      <el-radio v-model="radio5" border label="备选项1" value="1" />
      <el-radio v-model="radio5" border label="备选项2" value="2" />
    </vab-card>
  </div>
</template>

<script lang="ts" setup>
defineOptions({
  name: 'Radio',
})

const radio = ref<string>('1')
const radio2 = ref<string>('1')
const radio3 = ref<any>('1')
const cities = ref<any>(['上海', '北京', '广州', '深圳'])
const radio4 = ref<string>('上海')
const radio5 = ref<string>('1')
</script>
