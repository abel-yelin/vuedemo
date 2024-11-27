<template>
  <div class="step-form-container">
    <el-row :gutter="20">
      <el-col
        :lg="{ span: 10, offset: 7 }"
        :md="{ span: 20, offset: 2 }"
        :sm="{ span: 20, offset: 2 }"
        :xl="{ span: 10, offset: 7 }"
        :xs="24"
      >
        <el-steps :active="active" align-center class="steps">
          <el-step description="填写转账信息" title="第1步" />
          <el-step description="确认转账信息" title="第2步" />
          <el-step description="完成" title="第3步" />
        </el-steps>
        <step1 v-if="active === 0" @change-step="handleSetStep" />
        <step2 v-if="active === 1" :info-data="form" @change-step="handleSetStep" />
        <step3 v-if="active === 2" :info-data="form" @change-step="handleSetStep" />
      </el-col>
    </el-row>
  </div>
</template>

<script lang="ts" setup>
defineOptions({
  name: 'StepForm',
})

const active = ref<any>(0)
const form = reactive<any>({})

const handleSetStep = (_active: any, _form: any) => {
  active.value = _active
  if (_form) Object.assign(form, _form)
}
</script>

<style lang="scss" scoped>
.step-form-container {
  :deep() {
    .el-steps {
      margin: var(--el-margin) auto calc(var(--el-margin) * 2) auto;

      .el-step__title.is-process {
        color: var(--el-color-primary);
      }

      .el-step__description.is-process {
        color: var(--el-color-primary);
      }

      .el-step__head {
        &.is-process {
          color: var(--el-color-primary);
          border-color: var(--el-color-primary);

          .el-step__icon.is-text {
            color: var(--el-color-primary);
            border: 1px solid;
          }

          .el-step__line {
            height: 1px;
          }
        }

        &.is-wait {
          .el-step__icon.is-text {
            border: 1px solid;
          }

          .el-step__line {
            height: 1px;
          }
        }

        &.is-finish {
          .el-step__icon.is-text {
            color: var(--el-color-white);
            background: var(--el-color-primary);
          }

          .el-step__line {
            height: 1px;
            background: var(--el-color-primary);
          }
        }
      }
    }
  }
}
</style>
