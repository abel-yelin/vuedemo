<template>
  <div class="slider-verify-container">
    <el-button type="primary" @click="onShow">开始验证</el-button>
    <vab-slider-verify :imgs="imgs" :show="isShow" @close="onClose" @fail="onFail" @success="onSuccess" />
  </div>
</template>

<script lang="ts" setup>
import VabSliderVerify from 'vue3-puzzle-vcode'
import landscape from '/@/assets/common_images/landscape.jpg'

defineOptions({
  name: 'SliderVerify',
})

const isShow = ref<any>(false)

const imgs = ref<any>(['https://res.hc-cdn.com/tiny-vue-web-doc/3.10.5.20230903162611/static/images/mountain.png', landscape])

const onShow = () => {
  isShow.value = true
}

const onClose = () => {
  isShow.value = false
}

const onSuccess = () => {
  $baseMessage('验证成功', 'success', 'hey')
  onClose()
}

const onFail = () => {
  $baseMessage('验证失败，请重试', 'error', 'hey')
}
</script>

<style lang="scss">
.vue-puzzle-vcode {
  z-index: var(--el-z-index);
  background-color: rgba(0, 0, 0, 0.25);
  backdrop-filter: blur(2.5px);

  .vue-auth-box_ {
    background: var(--el-color-white);
    border-radius: var(--el-border-radius-base);

    .auth-body_ {
      border-radius: var(--el-border-radius-base);

      .reset_ {
        width: 25px;
      }

      .info-box_ {
        background-color: var(--el-color-success);

        &.fail {
          background-color: var(--el-color-danger);
        }
      }
    }

    .auth-control_ {
      border-radius: var(--el-border-radius-base);

      .range-box {
        background-color: var(--el-border-color);
        border-radius: var(--el-border-radius-base);
        box-shadow: none;
      }

      .range-slider {
        background: var(--el-color-primary);

        .range-btn {
          background: var(--el-color-white);
          box-shadow: 0 0 4px var(--el-border-color);

          > div {
            border: solid 1px var(--el-color-primary);
          }

          &:hover {
            > div:first-child {
              border-right-color: var(--el-color-primary);
            }

            > div:nth-child(2) {
              border-right-color: var(--el-color-primary);
            }

            > div:nth-child(3) {
              border-left-color: var(--el-color-primary);
            }
          }
        }
      }
    }
  }
}
</style>
