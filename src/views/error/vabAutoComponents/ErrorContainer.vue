<template>
  <div class="error-container">
    <div class="error-content">
      <div class="pic-error">
        <vab-icon class="error-svg" :icon="icon" is-custom-svg />
      </div>
      <div class="bullshit">
        <div class="bullshit-oops">{{ oops }}</div>
        <div class="bullshit-headline">{{ headline }}</div>
        <div class="bullshit-info">{{ info }}</div>
        <router-link v-slot="{ navigate }" custom to="/">
          <el-button type="primary" @click="navigate">{{ btn }}</el-button>
        </router-link>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
defineOptions({
  name: 'ErrorContainer',
})

defineProps({
  oops: {
    type: String,
    default: '',
  },
  headline: {
    type: String,
    default: '',
  },
  info: {
    type: String,
    default: '',
  },
  btn: {
    type: String,
    default: '',
  },
  icon: {
    type: String,
    default: '',
  },
})
</script>

<style lang="scss">
.error-container {
  @media (max-width: 768px) {
    .error-content {
      flex-direction: column !important;
      padding-top: 6.5vh;

      .pic-error {
        height: 200px !important;
      }
    }
  }

  .error-content {
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;
    max-width: 1000px;
    height: calc(var(--el-container-height) - 40px);
    margin: auto;

    .pic-error {
      flex-basis: 65%;
      height: 300px;
      opacity: 0;
      transform: translateX(-60px);
      animation: identifier 0.5s ease-in-out 0.2s forwards;

      .error-svg {
        width: 100%;
        height: 100%;
      }
    }

    .bullshit {
      flex-basis: 35%;
      opacity: 0;
      transform: translateY(50px);
      animation: slideUp 0.5s ease-in-out 0.2s forwards;

      &-oops {
        margin-bottom: var(--el-margin);
        font-size: calc(var(--el-font-size-extra-large) + 6px);
        font-weight: bold;
        color: var(--el-color-primary);
      }

      &-headline {
        margin-bottom: 10px;
        font-size: var(--el-font-size-large);
        font-weight: bold;
        color: var(--el-color-grey);
      }

      &-info {
        margin-bottom: 30px;
        font-size: var(--el-font-size-extra-small);
        color: var(--el-color-grey);
      }

      @keyframes identifier {
        100% {
          opacity: 1;
          transform: translateX(0);
        }
      }

      @keyframes slideUp {
        100% {
          opacity: 1;
          transform: translateY(20px);
        }
      }
    }
  }
}

#app {
  > .error-container {
    > .error-content {
      height: calc(var(--vh, 1vh) * 100);
    }
  }
}
</style>
