<template>
  <vab-slot-machine
    ref="awardSlotMachineRef"
    :blocks="blocks"
    :default-config="defaultConfig"
    height="300px"
    :prizes="prizes"
    :slots="slots"
    width="300px"
  />
  <el-button class="machine-button" @click="startCallback">点击抽奖</el-button>
</template>

<script lang="ts" setup>
import { VabSlotMachine } from '/@/plugins/VabAward'

import award_1 from '/@/assets/award_images/award_1.png'
import award_2 from '/@/assets/award_images/award_2.png'

const blocks = [
  { padding: '15px', background: '#ffc27a', borderRadius: 28 },
  { padding: '25px', background: '#ff4a4c', borderRadius: 23 },
  { padding: '15px', background: '#ff625b', borderRadius: 20 },
]
const prizes = [
  {
    background: '#fefaea',
    borderRadius: '10px',
    imgs: [
      {
        width: '40%',
        top: '20%',
        src: award_1,
      },
    ],
  },
  {
    background: '#fefaea',
    borderRadius: '10px',
    imgs: [
      {
        width: '40%',
        top: '30%',
        src: award_2,
      },
    ],
  },
]
const slots = [{ speed: 1 }, { speed: 4 }, { speed: 5 }]
const defaultConfig = {
  rowSpacing: '10px',
  colSpacing: '10px',
}

const awardSlotMachineRef = ref<any>(null)
const startCallback = () => {
  awardSlotMachineRef.value.play()

  setTimeout(() => {
    const res = [
      [9, 9, 6],
      [0, 0, 7],
      [6, 6, 6],
      [8, 8, 8],
    ]
    // 随机取一组数据
    const index = res[Math.trunc(Math.random() * 4)]
    awardSlotMachineRef.value.stop(index)
  }, 3000)
}
</script>

<style lang="scss" scoped>
.machine-button {
  position: absolute;
  bottom: 52px;
  color: var(--el-color-white);
  background: transparent;
  border: 0;
}
</style>
