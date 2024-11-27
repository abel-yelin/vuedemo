<template>
  <div class="application-container">
    <vab-alert v-if="(!development && protocol) || (development && pwaDev)" :title="title" />
    <vab-alert v-else title="开发环境或非https协议下暂不支持安装PWA应用" type="warning" />
    <el-button id="installRef" :disabled="disabled" type="primary">点击安装</el-button>
  </div>
</template>

<script lang="ts" setup>
import { pwaDev } from '/@/config'

defineOptions({
  name: 'Application',
})

const development = import.meta.env.DEV
const protocol = globalThis.location.protocol === 'https:'
const disabled = ref(true)
const title = ref<string>(
  '点击安装前需手动按下键盘Ctrl（Command） + Shift + R 强制刷新当前页面，如果无法安装，PC端请点击浏览器地址栏右侧安装按钮进行安装，手机端请点击添加到主屏幕进行安装，仅支持Edge、Chrome、Safari'
)

const isPwaInstalled = () => {
  if (
    globalThis.matchMedia('(display-mode: standalone)').matches ||
    // @ts-ignore
    globalThis.navigator.standalone ||
    document.referrer.includes('android-app://')
  )
    return true
  return false
}

onMounted(() => {
  if (isPwaInstalled()) title.value = '已在PWA桌面应用打开'
  globalThis.addEventListener('beforeinstallprompt', (deferredPrompt: any) => {
    disabled.value = false
    document.querySelector('#installRef')!.addEventListener('click', () => {
      if (deferredPrompt) {
        deferredPrompt.prompt()
        deferredPrompt.userChoice.then(() => {
          //@ts-ignore
          location.reload(true)
        })
      } else {
        $baseAlert(
          '未获取到安装指令，请按下键盘Ctrl（Command） + Shift + R 强制刷新当前页面后重试，如果无法安装，PC端请点击浏览器地址栏右侧安装按钮进行安装，手机端请点击添加到主屏幕进行安装，仅支持Edge、Chrome、Safari',
          () => {
            //@ts-ignore
            location.reload(true)
          }
        )
      }
    })
  })
})
</script>
