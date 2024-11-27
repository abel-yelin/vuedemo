<template>
  <div class="login-container" :style="{ background: background, backgroundSize: '100%' }">
    <div v-show="theme.showLanguage || theme.showColorPicker || theme.showDark" class="login-right-tools">
      <el-checkbox v-model="show" @change="handleShow">{{ translate('必应壁纸') }}</el-checkbox>
      <vab-language v-show="theme.showLanguage" />
      <vab-color-picker v-show="theme.showColorPicker" />
      <vab-dark v-show="theme.showDark" />
    </div>
    <slot></slot>
    <vab-icon class="login-background" icon="background" is-custom-svg />
    <vab-footer />
  </div>
</template>

<script lang="ts" setup>
import { translate } from '/@/i18n'
import { useBingStore } from '/@/store/modules/bing'
import { useSettingsStore } from '/@/store/modules/settings'

defineOptions({
  name: 'LoginContainer',
})

const settingsStore = useSettingsStore()
const { theme } = storeToRefs(settingsStore)
const show = ref<boolean>(false)
const bingStore = useBingStore()
const { backgroundList } = storeToRefs(bingStore)
const background = ref<string | undefined>('linear-gradient(to top, var(--el-color-primary), var(--el-color-primary-light-3))')

const handleShow = () => {
  if (show.value) background.value = `url(${backgroundList.value[0]})!important`
  else background.value = 'linear-gradient(to top, var(--el-color-primary), var(--el-color-primary-light-3))'
}
</script>

<style lang="scss" scoped>
.login-container {
  position: relative;
  display: flex;
  height: calc(var(--vh, 1vh) * 100);

  .login-right-tools {
    position: fixed;
    top: var(--el-margin);
    right: var(--el-margin);
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: calc(var(--el-padding) / 2);
    background: var(--el-color-white);
    border: 1px solid var(--el-border-color);
    border-radius: var(--el-border-radius-base);

    :deep() {
      .vab-language,
      .vab-color-picker,
      .vab-dark,
      .el-checkbox {
        margin: 0 calc(var(--el-padding) / 2) 0 calc(var(--el-padding) / 2) !important;
      }
    }
  }

  @media (max-width: 696px) {
    .login-right-tools,
    .login-background {
      display: none;
    }

    :deep() {
      .login-form {
        width: 90vw !important;
        margin: auto !important;

        .left-img {
          display: none !important;
        }

        .el-form--default {
          width: 100% !important;
          margin-right: auto !important;
          margin-left: auto !important;
        }
      }
    }
  }

  @media (min-width: 696px) and (max-width: 999px) {
    .login-right-tools,
    .login-background {
      display: none;
    }

    :deep() {
      .login-form {
        width: 90vw !important;
        margin: auto !important;

        .el-form--default {
          width: 50% !important;
        }
      }
    }
  }

  :deep() {
    @keyframes identifier {
      100% {
        opacity: 1;
        transform: translate(0);
      }
    }

    .login-form {
      position: relative;
      z-index: 1;
      display: flex;
      align-items: center;
      justify-content: space-between;
      width: 1000px;
      padding: 4.5vh;
      margin: auto;
      overflow: hidden;
      background: var(--el-mask-color);
      background-size: 100% 100%;
      border: 1px solid var(--el-border-color);
      border-radius: 15px;
      opacity: 0;
      transition: var(--el-transition);
      transform: translateY(30px);
      animation: identifier 0.3s ease-in-out 0.15s forwards;

      .left-img {
        width: 50%;
        opacity: 0;
        transform: translateX(-60px);
        animation: identifier 0.35s ease-in-out 0.15s forwards;
      }

      * {
        transition: var(--el-transition);
      }

      .el-form--default {
        width: 45%;

        .title {
          font-size: 54px;
          font-weight: 500;
          color: var(--el-color-grey);
        }

        .title-tips {
          margin-top: 29px;
          font-size: 26px;
          font-weight: 400;
          color: var(--el-color-grey);
        }

        .login-btn {
          width: 100%;
          height: 50px;
        }

        .el-form-item {
          margin: 20px 0;

          &__error {
            position: absolute;
            font-size: var(--el-font-size-extra-small);
            line-height: 18px;
            color: var(--el-color-error);
          }

          .el-input {
            width: 100%;
            height: 48px;
            line-height: 48px;
          }
        }

        .code {
          position: absolute;
          top: 4px;
          right: 4px;
          cursor: pointer;
          border-radius: var(--el-border-radius-base);
        }

        .phone-code {
          position: absolute;
          top: 8px;
          right: 10px;
          width: 120px;
          height: 32px;
          font-size: var(--el-font-size-base);
          color: var(--el-color-white);
          cursor: pointer;
          user-select: none;
          border-radius: 3px;
        }
      }
    }

    .vab-footer {
      position: fixed;
      right: 0;
      bottom: 0;
      left: 0;
      background: transparent;
      border: 0;
    }
  }

  .login-background {
    position: fixed;
    right: 0;
    bottom: 0;
    left: 0;
    z-index: 0;
    width: 100vw;
    height: 35vh;
    pointer-events: none;
  }
}
</style>
