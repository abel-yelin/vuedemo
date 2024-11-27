<template>
  <vab-dialog v-model="show" append-to-body class="vab-update" :show-close="false" :show-fullscreen="false" width="410px">
    <template #header></template>
    <div class="vab-update-icon">
      <vab-icon icon="upload-cloud-2-fill" />
    </div>
    <vab-icon class="vab-update-cup" icon="cup-line" />
    <h3>版本更新：</h3>
    <p>
      {{ title }}
      V{{ _version }}
    </p>
    <p>更新时间：{{ lastTime }}</p>
    <template #footer>
      <el-button :loading="loading" type="primary" @click="save">
        {{ button }}
      </el-button>
    </template>
  </vab-dialog>
</template>

<script lang="ts" setup>
import dayjs from 'dayjs'
import { useRegisterSW } from 'virtual:pwa-register/vue'
import { version } from '~/package.json'
import { translate } from '/@/i18n'
import { useSettingsStore } from '/@/store/modules/settings'

defineOptions({
  name: 'VabUpdate',
})

const { getTitle: title } = useSettingsStore()
const button = ref<string>(translate('立即升级'))
const loading = ref<boolean>(false)
const _version = ref<string>(version)
const show = ref<boolean>(false)
const { offlineReady, needRefresh, updateServiceWorker } = useRegisterSW()
const lastTime = dayjs().format('YYYY-MM-DD')

const save = async () => {
  button.value = translate('正在更新')
  loading.value = true
  await updateServiceWorker()
  setTimeout(() => {
    loading.value = false
    button.value = translate('更新完成')
    offlineReady.value = false
    needRefresh.value = false
    setTimeout(() => {
      show.value = false
      //@ts-ignore
      location.reload(true)
    }, 1000 * 3)
  }, 1000 * 7)
}

const handleShow = () => {
  if (offlineReady.value || needRefresh.value) {
    show.value = true
    save()
  }
}

onMounted(() => {
  setTimeout(() => {
    handleShow()
  }, 1000 * 3)
})

watch(
  offlineReady || needRefresh,
  () => {
    handleShow()
  },
  {
    immediate: true,
  }
)

onBeforeMount(() => {
  $sub('update-website', (servicesVersion: string) => {
    if (servicesVersion) _version.value = servicesVersion
    offlineReady.value = true
    needRefresh.value = true
    handleShow()
  })
})
</script>

<style lang="scss" scoped>
.vab-update {
  position: relative;

  &-icon {
    position: absolute;
    top: -50px;
    left: 50%;
    width: 100px;
    height: 100px;
    line-height: 100px;
    text-align: center;
    background: linear-gradient(1deg, var(--el-color-primary-light-1), var(--el-color-primary));
    border-radius: 50%;
    transform: translateX(-50%);

    i {
      font-size: 50px;
      color: var(--el-color-white);
    }
  }

  &-cup {
    position: absolute;
    right: 20px;
    bottom: 70px;
    font-size: 80px;
    -webkit-text-fill-color: transparent;
    background-image: linear-gradient(var(--el-color-primary-light-7), var(--el-color-primary-light-9));
    background-clip: text;
  }
}
</style>

<style lang="scss">
.vab-update {
  &.el-dialog {
    margin-top: 30vh !important;
    border-radius: 15px;

    .el-dialog__body {
      margin: 0 40px 0 40px;
    }

    .el-dialog__footer {
      text-align: center !important;

      .el-button {
        width: 200px;
        margin-bottom: 20px;
        background: var(--el-color-primary);
        border: 0;
        border-radius: 20px;
      }
    }
  }
}
</style>
