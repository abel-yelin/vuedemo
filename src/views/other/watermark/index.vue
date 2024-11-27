<template>
  <div class="watermark-container no-background-container">
    <vab-card title="全局水印">
      <el-button type="primary" @click="setWatermark(title)">添加全局水印</el-button>
      <el-button type="primary" @click="setCustomWatermark">添加自定义全局水印</el-button>
      <el-button type="danger" @click="setWatermark('')">移除全局水印</el-button>
    </vab-card>

    <vab-card title="局部自定义配置水印">
      <div class="wrapper">
        <el-watermark
          class="watermark"
          :content="config.content"
          :font="config.font"
          :gap="config.gap"
          :offset="config.offset"
          :rotate="config.rotate"
          :z-index="config.zIndex"
        />
        <el-form class="form" label-position="top" label-width="50px" :model="config">
          <el-form-item label="Content">
            <el-input v-model="config.content" />
          </el-form-item>
          <el-form-item label="Color">
            <el-color-picker v-model="config.font.color" show-alpha />
          </el-form-item>
          <el-form-item label="FontSize">
            <el-slider v-model="config.font.fontSize" />
          </el-form-item>
          <el-form-item label="zIndex">
            <el-slider v-model="config.zIndex" />
          </el-form-item>
          <el-form-item label="Rotate">
            <el-slider v-model="config.rotate" :max="180" :min="-180" />
          </el-form-item>
          <el-form-item label="Gap">
            <el-space>
              <el-input-number v-model="config.gap[0]" controls-position="right" />
              <el-input-number v-model="config.gap[1]" controls-position="right" />
            </el-space>
          </el-form-item>
          <el-form-item label="Offset">
            <el-space>
              <el-input-number v-model="config.offset[0]" controls-position="right" placeholder="offsetLeft" />
              <el-input-number v-model="config.offset[1]" controls-position="right" placeholder="offsetTop" />
            </el-space>
          </el-form-item>
        </el-form>
      </div>
    </vab-card>

    <vab-card title="局部基础水印">
      <el-watermark :content="config.content">
        <div style="height: 200px"></div>
      </el-watermark>
    </vab-card>

    <vab-card title="局部多行水印">
      <el-watermark :content="['Vite 4.x', 'Vue Shop Vite']">
        <div style="height: 200px"></div>
      </el-watermark>
    </vab-card>

    <vab-card title="局部图片水印">
      <el-watermark :height="30" image="https://element-plus.org/images/element-plus-logo.svg" :width="130">
        <div style="height: 200px"></div>
      </el-watermark>
    </vab-card>
  </div>
</template>

<script lang="ts" setup>
import { ElMessageBox } from 'element-plus'
import { useSettingsStore } from '/@/store/modules/settings'
import Watermark from '/@/utils/watermark'

defineOptions({
  value: 'Watermark',
})
const settingsStore = useSettingsStore()
const { title } = storeToRefs(settingsStore)

const setWatermark = (value: string) => {
  //@ts-ignore
  Watermark.set(value)
}
const setCustomWatermark = () => {
  ElMessageBox.prompt('请输入自定义水印', '温馨提示', {
    confirmButtonText: '确定',
    cancelButtonText: '取消',
    draggable: true,
  })
    .then(({ value }) => {
      if (value) setWatermark(value)
    })
    .catch(() => {})
}

const config = reactive<any>({
  content: 'Vue shop Vite',
  font: {
    fontSize: 16,
    color: 'rgba(0, 0, 0, 0.15)',
  },
  zIndex: -1,
  rotate: -22,
  gap: [100, 100] as [number, number],
  offset: [] as unknown as [number, number],
})
</script>

<style lang="scss" scoped>
.watermark-container {
  :deep() {
    .el-button {
      margin-right: 10px;
      margin-bottom: 10px;
    }

    .el-button + .el-button {
      margin-right: 10px;
      margin-left: 0;
    }
  }

  .wrapper {
    display: flex;

    .watermark {
      display: flex;
      flex: auto;
    }

    .demo {
      flex: auto;

      img {
        position: relative;
        z-index: 10;
        width: 100%;
        max-width: 300px;
      }
    }

    .form {
      width: 330px;
      padding-left: 20px;
      margin-left: 20px;
      border-left: 1px solid var(--el-border-color);
    }
  }
}
</style>
