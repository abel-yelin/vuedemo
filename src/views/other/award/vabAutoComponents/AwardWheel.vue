<template>
  <vab-award-wheel
    ref="awardWheelRef"
    :blocks="blocks"
    :buttons="buttons"
    height="300px"
    :prizes="prizes"
    width="300px"
    @end="endCallback"
    @start="startCallback"
  />
</template>

<script lang="ts" setup>
import { random } from 'lodash-es'
import award_1 from '/@/assets/award_images/award_1.png'
import award_2 from '/@/assets/award_images/award_2.png'
import blockImg from '/@/assets/award_images/block.png'
import buttonImg from '/@/assets/award_images/button.png'
import { VabAwardWheel } from '/@/plugins/VabAward'

const blocks = [
  {
    padding: '35px',
    imgs: [
      {
        src: blockImg,
        width: '100%',
      },
    ],
    rotate: true,
  },
]
const prizes = [
  {
    fonts: [{ text: '10金币', top: '10%', fontColor: '#ff6642', fontSize: 12 }],
    background: '#fefaea',
    imgs: [
      {
        src: award_2,
        width: '20px',
        top: '35px',
      },
    ],
  },
  {
    fonts: [{ text: '0.1元', top: '10%', fontColor: '#ff6642', fontSize: 12 }],
    background: '#ffe358',
    imgs: [
      {
        src: award_1,
        width: '20px',
        top: '35px',
      },
    ],
  },
  {
    fonts: [{ text: '20金币', top: '10%', fontColor: '#ff6642', fontSize: 12 }],
    background: '#fefaea',
    imgs: [
      {
        src: award_2,
        width: '20px',
        top: '35px',
      },
    ],
  },
  {
    fonts: [{ text: '0.2元', top: '10%', fontColor: '#ff6642', fontSize: 12 }],
    background: '#ffe358',
    imgs: [
      {
        src: award_1,
        width: '20px',
        top: '35px',
      },
    ],
  },
  {
    fonts: [{ text: '30金币', top: '10%', fontColor: '#ff6642', fontSize: 12 }],
    background: '#fefaea',
    imgs: [
      {
        src: award_2,
        width: '20px',
        top: '35px',
      },
    ],
  },
  {
    fonts: [{ text: '0.3元', top: '10%', fontColor: '#ff6642', fontSize: 12 }],
    background: '#ffe358',
    imgs: [
      {
        src: award_1,
        width: '20px',
        top: '35px',
      },
    ],
  },
]
const buttons = [
  {
    radius: '35%',
    imgs: [
      {
        src: buttonImg,
        width: '100%',
        top: '-46px',
      },
    ],
  },
]

const awardWheelRef = ref<any>(null)
const startCallback = () => {
  awardWheelRef.value.play()

  setTimeout(() => {
    //中奖的数组下标
    const index = random(0, 5)
    awardWheelRef.value.stop(index)
  }, 3000)
}
const endCallback = (prize: any) => {
  $baseMessage(`恭喜您获得${prize.fonts[0].text}`, 'success', 'hey')
}
</script>
