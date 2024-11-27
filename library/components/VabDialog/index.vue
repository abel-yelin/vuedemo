<template>
  <el-dialog
    v-model="dialogVisible"
    :align-center="props.alignCenter"
    :append-to="props.appendTo"
    :append-to-body="props.appendToBody"
    :before-close="props.beforeClose"
    :center="props.center"
    :class="{
      ['vab-dialog-' + props.theme]: true,
      'open-in-tab': props.openInTab,
    }"
    :close-on-click-modal="props.closeOnClickModal"
    :close-on-press-escape="props.closeOnPressEscape"
    :destroy-on-close="props.destroyOnClose"
    :draggable="props.draggable"
    :fullscreen="isFullscreen"
    :lock-scroll="props.lockScroll"
    :modal="props.modal"
    :modal-class="props.modalClass"
    :open-delay="props.openDelay"
    :overflow="props.overflow"
    :show-close="props.showClose"
    :style="{
      transition: props.animated ? 'all 0.3s cubic-bezier(0.645, 0.045, 0.355, 1),transform 0s' : '',
    }"
    :top="props.top"
    :width="props.width"
    v-bind="$attrs"
  >
    <template #header>
      <slot name="header">
        <div class="el-dialog__title" @dblclick="setFullscreen">{{ props.title }}</div>
      </slot>
      <button v-if="props.showClose" class="el-dialog__headerbtn" type="button" @click="closeDialog">
        <el-icon class="el-dialog__close">
          <close />
        </el-icon>
      </button>
      <button v-if="props.showFullscreen" class="el-dialog__headerbtn" style="right: 51px" type="button" @click="setFullscreen">
        <vab-icon class="el-dialog__close el-dialog__fullscreen" :icon="isFullscreen ? 'fullscreen-exit-fill' : 'fullscreen-fill'" />
      </button>
    </template>
    <div v-loading="props.loading">
      <slot></slot>
    </div>
    <template #footer>
      <slot name="footer"></slot>
    </template>
  </el-dialog>
</template>

<script lang="ts" setup>
import { Close } from '@element-plus/icons-vue'
import { ElDialog } from 'element-plus'

defineOptions({
  name: 'VabDialog',
})

const props = defineProps({
  ...ElDialog.props,
  modelValue: {
    type: Boolean,
    default: false,
  },
  showFullscreen: {
    type: Boolean,
    default: true,
  },
  fullscreen: {
    type: Boolean,
    default: false,
  },
  loading: {
    type: Boolean,
    default: false,
  },
  animated: {
    type: Boolean,
    default: true,
  },
  closeOnClickModal: {
    type: Boolean,
    default: false,
  },
  closeOnPressEscape: {
    type: Boolean,
    default: false,
  },
  theme: {
    type: String,
    default: 'default', //支持default、plain、primary三种
  },
  draggable: {
    type: Boolean,
    default: true,
  },
  openInTab: {
    type: Boolean,
    default: false,
  },
})
const emit = defineEmits(['update:modelValue'])

const dialogVisible = useVModel(props, 'modelValue', emit)
const isFullscreen = ref<any>(false)

const closeDialog = () => {
  dialogVisible.value = false
  isFullscreen.value = false
}

const setFullscreen = () => {
  isFullscreen.value = !isFullscreen.value
}

watch(
  props,
  () => {
    isFullscreen.value = props.fullscreen
  },
  {
    immediate: true,
  }
)
</script>

<style lang="scss">
.el-overlay:has(.open-in-tab) {
  position: absolute;

  .el-overlay-dialog {
    position: absolute;
  }
}
</style>
