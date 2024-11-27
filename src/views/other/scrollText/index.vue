<template>
  <div class="scroll-text-container no-transition-container">
    <tiny-scroll-text :class="'vab-scroll-text-' + form.theme" :direction="form.direction" :time="form.time">
      <div v-html="text"></div>
    </tiny-scroll-text>
    <el-form label-position="top" :model="form">
      <el-form-item label="主题配置">
        <el-radio-group v-model="form.theme">
          <el-radio-button v-for="item in themeList" :key="item.label" :label="item.label" :value="item.label">
            <template #default>{{ item.title }}</template>
          </el-radio-button>
        </el-radio-group>
      </el-form-item>
      <el-form-item label="滚动方向配置">
        <el-radio-group v-model="form.direction" @change="handleDirection">
          <el-radio-button v-for="item in directionList" :key="item.label" :label="item.label" :value="item.label">
            <template #default>{{ item.title }}</template>
          </el-radio-button>
        </el-radio-group>
      </el-form-item>
      <el-form-item label="滚动时长配置（s）">
        <el-input-number v-model="form.time" :max="30" :min="0" />
      </el-form-item>
    </el-form>
  </div>
</template>

<script lang="ts" setup>
import { ScrollText as TinyScrollText } from '@opentiny/vue'
import { getList } from '/@/api/description'

defineOptions({
  name: 'ScrollText',
})

const text = ref<string>('')
const themeList = ref<any>([
  { label: 'primary', title: '默认' },
  { label: 'success', title: '成功' },
  { label: 'warning', title: '警告' },
  { label: 'danger', title: '危险' },
  { label: 'info', title: '信息' },
])
const directionList = ref<any>([
  { label: 'left', title: '左' },
  { label: 'right', title: '右' },
  { label: 'up', title: '上' },
  { label: 'down', title: '下' },
])
const form = reactive({
  theme: 'primary',
  direction: 'left',
  time: 25,
})

const handleDirection = (value: any) => {
  if ('left' === value || 'right' === value) form.time = 25
  else form.time = 3
}

const fetchData = async () => {
  const { data } = await getList()
  text.value = data.description
}

onBeforeMount(() => {
  fetchData()
})
</script>

<style lang="scss" scoped>
.scroll-text-container {
  :deep() {
    .tiny-scroll-text {
      position: relative;
      width: 100%;
      padding-right: 15px;
      padding-left: 40px;
      color: var(--el-color-primary);
      background-color: var(--el-color-primary-light-9);
      border: 1px solid var(--el-color-primary);
      border-radius: var(--el-border-radius-base);

      &:before {
        position: absolute;
        left: 15px;
        font-family: 'remixicon', sans-serif !important;
        content: '';
      }

      &__wrapper {
        margin-bottom: var(--el-margin);

        .up {
          div {
            text-overflow: ellipsis;
            word-break: break-all;
            white-space: nowrap;
          }
        }
      }
    }

    .vab-scroll-text {
      &-primary {
        .tiny-scroll-text {
          color: var(--el-color-primary);
          background-color: var(--el-color-primary-light-9);
          border: 1px solid var(--el-color-primary);
        }
      }

      &-success {
        .tiny-scroll-text {
          color: var(--el-color-success);
          background-color: var(--el-color-success-light-9);
          border: 1px solid var(--el-color-success);
        }
      }

      &-warning {
        .tiny-scroll-text {
          color: var(--el-color-warning);
          background-color: var(--el-color-warning-light-9);
          border: 1px solid var(--el-color-warning);
        }
      }

      &-danger {
        .tiny-scroll-text {
          color: var(--el-color-danger);
          background-color: var(--el-color-danger-light-9);
          border: 1px solid var(--el-color-danger);
        }
      }

      &-info {
        .tiny-scroll-text {
          color: var(--el-color-info);
          background-color: var(--el-color-info-light-9);
          border: 1px solid var(--el-color-info);
        }
      }
    }
  }
}
</style>
