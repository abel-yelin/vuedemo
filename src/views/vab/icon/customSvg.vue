<template>
  <div class="custom-svg-container">
    <vab-query-form>
      <vab-query-form-top-panel>
        <el-form inline @submit.prevent>
          <el-form-item label="svg大小（px）">
            <el-slider v-model="queryForm.num" :max="100" :min="20" />
          </el-form-item>
        </el-form>
      </vab-query-form-top-panel>
    </vab-query-form>
    <el-row :gutter="20">
      <el-col v-for="(item, index) in iconList" :key="index" :lg="3" :md="6" :sm="8" :xl="3" :xs="12">
        <vab-card>
          <vab-icon
            :icon="item"
            is-custom-svg
            :style="{
              width: queryForm.num + 'px',
              height: queryForm.num + 'px',
            }"
          />
        </vab-card>
      </el-col>
      <el-col :lg="3" :md="6" :sm="8" :xl="3" :xs="12">
        <vab-card>
          <notification
            :style="{
              width: queryForm.num + 'px',
              height: queryForm.num + 'px',
            }"
          />
        </vab-card>
      </el-col>
    </el-row>
  </div>
</template>

<script lang="ts" setup>
import { Notification } from '@element-plus/icons-vue'

defineOptions({
  name: 'CustomSvg',
})

interface QueryFormType {
  num: number
}

const iconList = ref<any>(['vite', 'vab', 'mall-fill', 'article', 'video', 'wenda', 'wtt'])
const queryForm = reactive<QueryFormType>({
  num: 28,
})
</script>

<style lang="scss" scoped>
.custom-svg-container {
  :deep() {
    .el-card__body {
      position: relative;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      padding: calc(var(--el-padding) / 1.4);
      cursor: pointer;

      svg {
        width: 28px;
        height: 28px;
        color: var(--el-color-grey);
        text-align: center;
        pointer-events: none;
        cursor: pointer;
        transition: var(--el-transition);
      }
    }
  }
}
</style>
