<template>
  <div class="share-container">
    <el-form label-position="top" :model="form" @submit.prevent>
      <el-form-item label="URL">
        <el-input v-model="form.url" clearable />
      </el-form-item>
      <el-form-item label="二维码">
        <vab-qr-code :dot-scale="0.5" :logo-src="logoUrl" :text="form.url" />
      </el-form-item>
      <el-form-item label="操作">
        <el-button native-type="submit" type="primary" @click="startShare">分享</el-button>
        <el-button native-type="submit" type="primary" @click="copy">拷贝</el-button>
        <el-button type="warning" @click="reset">重置</el-button>
        <el-button type="danger" @click="clear">清空</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script lang="ts" setup>
import logoUrl from '/@/assets/avatar.svg'
import VabQrCode from '/@/plugins/VabQrCode'
import clip from '/@/utils/clipboard'

defineOptions({
  name: 'Share',
})

const { share } = useShare()

function startShare() {
  share({
    title: 'Vue shop Vite',
    url: 'https://vuejs-core.cn/shop-vite',
  })
}

const form = reactive<any>({
  url: 'https://vuejs-core.cn/shop-vite',
})

const copy = () => {
  clip(form.url)
}

const reset = () => {
  form.url = 'https://vuejs-core.cn/shop-vite'
}

const clear = () => {
  form.url = ''
}
</script>

<style lang="scss" scoped>
.share-container {
  :deep() {
    .el-form-item__content {
      .el-input {
        width: 300px;
      }

      img {
        border: 1px solid var(--el-border-color);
        border-radius: var(--el-border-radius-base);
      }
    }
  }
}
</style>
