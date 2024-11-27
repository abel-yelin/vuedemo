<template>
  <div class="dialog-container">
    <el-form label-position="top" :model="form" style="max-width: 380px">
      <el-form-item label="标题">
        <el-input v-model="form.title" style="width: 345px" />
      </el-form-item>
      <el-form-item label="内容">
        <el-input v-model="form.content" style="width: 345px" type="textarea" />
      </el-form-item>
      <el-form-item v-if="'technology' != theme.themeName" label="主题配置">
        <el-radio-group v-model="form.theme" @change="handleDialogTheme">
          <el-radio-button v-for="item in themeList" :key="item.label" :label="item.label" :value="item.label" @change="handleOpen">
            <template #default>{{ item.title }}</template>
          </el-radio-button>
        </el-radio-group>
      </el-form-item>
      <el-form-item label="基础配置">
        <el-checkbox v-model="form.showFullscreen" label="开启全屏按钮" />
        <el-checkbox v-model="form.draggable" class="hidden-xs-only" label="开启拖拽" />
        <el-checkbox v-model="form.modal" label="开启遮罩" />
        <el-checkbox v-model="form.fullscreen" label="全屏显示弹窗" />
        <el-checkbox v-model="form.animated" label="开启动画" />
      </el-form-item>
      <el-form-item label="其他配置">
        <el-checkbox v-model="form.alignCenter" label="开启垂直水平居中" />
        <el-checkbox v-model="form.center" label="开启header、footer居中" />
        <el-checkbox v-model="form.closeOnClickModal" label="开启点击遮罩关闭" />
        <el-checkbox v-model="form.closeOnPressEscape" label="开启ESC按键关闭" />
        <el-checkbox v-model="form.openInTab" label="在内容页弹框（不影响tab页切换，不推荐）" @change="handleOpenInTab" />
      </el-form-item>
      <el-form-item class="hidden-xs-only" label="弹窗宽度（30% - 60%）">
        <el-slider v-model="form.width" :disabled="form.fullscreen" :max="60" :min="30" style="width: 345px" />
      </el-form-item>
      <el-form-item label="弹窗距离顶部（15vh - 30vh）">
        <el-slider v-model="form.top" :disabled="form.alignCenter" :max="30" :min="15" style="width: 345px" />
      </el-form-item>
      <el-form-item label="操作">
        <el-button type="primary" @click="handleOpen">打开弹窗</el-button>
        <el-button type="warning" @click="handleReset">重置</el-button>
      </el-form-item>
    </el-form>

    <vab-dialog
      v-model="dialogVisible"
      :align-center="form.alignCenter"
      :animated="form.animated"
      :append-to-body="form.appendToBoy"
      :center="form.center"
      :close-on-click-modal="form.closeOnClickModal"
      :close-on-press-escape="form.closeOnPressEscape"
      :destroy-on-close="true"
      :draggable="form.draggable"
      :fullscreen="form.fullscreen"
      :lock-scroll="form.lockScroll"
      :modal="form.modal"
      :open-in-tab="form.openInTab"
      :show-fullscreen="form.showFullscreen"
      :theme="form.theme"
      :title="form.title"
      :top="form.top + 'vh'"
      :width="form.width + '%'"
    >
      {{ form.content }}
      <template #footer>
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="dialogVisible = false">确 定</el-button>
      </template>
    </vab-dialog>
  </div>
</template>

<script lang="ts" setup>
import { useSettingsStore } from '/@/store/modules/settings'

defineOptions({
  name: 'Dialog',
})

const settingsStore = useSettingsStore()
const { theme } = storeToRefs(settingsStore)
const form = reactive<any>({
  showFullscreen: true,
  animated: true,
  draggable: true,
  width: 30,
  title: '温馨提示',
  content: '昨夜西风凋碧树，独上高楼，望尽天涯路',
  alignCenter: false,
  modal: true,
  fullscreen: false,
  center: false,
  closeOnClickModal: false,
  closeOnPressEscape: false,
  theme: 'default',
  top: 15,
  appendToBoy: true,
  openInTab: false,
  lockScroll: true,
})
const dialogVisible = ref<any>(false)
const themeList = ref<any>([
  { label: 'default', title: '默认' },
  { label: 'plain', title: '简约' },
  { label: 'primary', title: '主题色' },
])

const handleDialogTheme = (val: any) => {
  form.theme = val
}

const handleOpen = () => {
  dialogVisible.value = true
}

const handleReset = () => {
  form.showFullscreen = true
  form.animated = true
  form.draggable = true
  form.width = 30
  form.title = '温馨提示'
  form.content = '昨夜西风凋碧树，独上高楼，望尽天涯路'
  form.alignCenter = false
  form.modal = true
  form.center = false
  form.closeOnClickModal = false
  form.closeOnPressEscape = false
  form.theme = 'default'
}

const handleOpenInTab = (val: any) => {
  form.openInTab = val
  form.appendToBoy = !val
  form.lockScroll = true
}

let timer: ReturnType<typeof setInterval>
onActivated(() => {
  if (theme.value.themeName === 'technology') form.theme = 'default'

  timer = setTimeout(() => {
    dialogVisible.value = true
  }, 1000)
})

onDeactivated(() => {
  if (timer) clearTimeout(timer)
})
</script>
timer
