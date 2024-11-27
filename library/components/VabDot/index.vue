<template>
  <span :class="'vab-dot vab-dot-' + type"></span>
</template>

<script lang="ts" setup>
defineOptions({
  name: 'VabDot',
})

defineProps({
  type: {
    values: ['primary', 'success', 'warning', 'danger'],
    type: String,
    default: 'primary',
  },
})
</script>

<style lang="scss" scoped>
/** 
  * @name: vab-dot
  * @description: vab圆点动画
  * @author: sundan
  * @date: 2024-08-05 22:53:00
  */
.vab-dot {
  position: relative;
  display: inline-block;
  width: 6px;
  height: 6px;
  margin-right: 3px;
  vertical-align: middle;
  border-radius: 50%;

  @keyframes vabDot {
    0% {
      opacity: 0.6;
      transform: scale(0.8);
    }
    to {
      opacity: 0;
      transform: scale(2.4);
    }
  }

  &::after {
    position: absolute;
    top: 0;
    left: 0;
    box-sizing: border-box;
    display: block;
    width: 100%;
    height: 100%;
    content: '';
    border-radius: 50%;
    animation: vabDot 1.2s ease-in-out infinite;
  }

  @mixin set-color($color) {
    &-#{$color} {
      background: var(--el-color-#{$color});

      &::after {
        background: var(--el-color-#{$color});
      }
    }
  }

  @include set-color(primary);
  @include set-color(success);
  @include set-color(warning);
  @include set-color(error);
  @include set-color(danger);
}
</style>
