<template>
  <div class="transition-container no-transition-container">
    <el-button>
      <el-checkbox v-model="checked" label="循环播放" @change="handleChange" />
    </el-button>
    <el-button @click="show = !show">
      {{ show ? '点击隐藏' : '点击显示' }}
    </el-button>

    <div style="display: flex; flex-wrap: wrap; margin-top: 20px">
      <transition name="el-fade-in-linear">
        <div v-show="show" class="transition-box">fade-in-linear</div>
      </transition>
      <transition name="el-fade-in">
        <div v-show="show" class="transition-box">fade-in</div>
      </transition>

      <transition name="el-zoom-in-center">
        <div v-show="show" class="transition-box">zoom-in-center</div>
      </transition>

      <transition name="el-zoom-in-top">
        <div v-show="show" class="transition-box">zoom-in-top</div>
      </transition>

      <transition name="el-zoom-in-bottom">
        <div v-show="show" class="transition-box">zoom-in-bottom</div>
      </transition>
    </div>
  </div>
</template>

<script lang="ts" setup>
const show = ref<boolean>(true)
const checked = ref<boolean>(false)
let timer: ReturnType<typeof setInterval>

const handleChange = (value: any) => {
  if (value)
    timer = setInterval(() => {
      show.value = !show.value
    }, 1500)
  else clearTimeout(timer)
}

onDeactivated(() => {
  if (timer) clearInterval(timer)
})
</script>

<style>
.transition-box {
  width: 200px;
  height: 100px;
  padding: 40px 20px;
  margin-right: 20px;
  margin-bottom: 10px;
  color: var(--el-color-white);
  text-align: center;
  background-color: var(--el-color-primary);
  border-radius: var(--el-border-radius-base);
}
</style>
