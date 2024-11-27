<template>
  <div class="throttle-debounce-container">
    <el-button v-throttle="throttleClick" type="primary">节流函数</el-button>
    <el-button v-debounce="debounceClick" type="primary">防抖函数</el-button>
  </div>
</template>

<script lang="ts" setup>
defineOptions({
  name: 'ThrottleDebounce',
})

const throttleClick = () => {
  $baseMessage(`节流函数，2秒后允许再次触发`, 'success', 'hey')
}

const debounceClick = () => {
  $baseMessage(`防抖函数，每隔1秒允许触发一次`, 'success', 'hey')
}
</script>
