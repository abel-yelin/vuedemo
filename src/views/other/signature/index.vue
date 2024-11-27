<template>
  <div class="signature-container">
    <div class="signature-canvas-box">
      <canvas
        ref="canvas"
        height="200"
        width="500"
        @mousedown="onEventStart"
        @mousemove.stop.prevent="onEventMove"
        @mouseup="onEventEnd"
        @touchend="onEventEnd"
        @touchmove.stop.prevent="onEventMove"
        @touchstart="onEventStart"
      ></canvas>
      <img alt="" :src="catUrl" />
    </div>
    <el-button type="primary" @click="handleSaveImg">存为图片</el-button>
    <el-button type="danger" @click="handleClearSign">清空签名</el-button>
  </div>
</template>

<script lang="ts" setup>
import catUrl from '/@/assets/signature_images/cat.png'

defineOptions({
  name: 'Signature',
})

const canvas = ref<any>()
let ctx: CanvasRenderingContext2D

let painting = false

const getOffset = (event: MouseEvent | TouchEvent) => {
  let offset: [number, number]
  if ((event as MouseEvent).offsetX) {
    const { offsetX, offsetY } = event as MouseEvent
    offset = [offsetX, offsetY]
  } else {
    const { top, left } = canvas.value.getBoundingClientRect()
    const offsetX = (event as TouchEvent).touches[0].clientX - left
    const offsetY = (event as TouchEvent).touches[0].clientY - top
    offset = [offsetX, offsetY]
  }
  return offset
}

let startX = 0,
  startY = 0

const onEventStart = (event: MouseEvent | TouchEvent) => {
  ;[startX, startY] = getOffset(event)
  painting = true
}

const onEventMove = (event: MouseEvent | TouchEvent) => {
  if (painting) {
    const [endX, endY] = getOffset(event)
    paint(startX, startY, endX, endY, ctx)
    startX = endX
    startY = endY
  }
}

const onEventEnd = () => {
  if (painting) painting = false
}

onMounted(() => {
  ctx = canvas.value.getContext('2d') as CanvasRenderingContext2D
})
const handleClearSign = () => {
  ctx.clearRect(0, 0, canvas.value.width, canvas.value.height)
}
const isCanvasBlank = (canvas: HTMLCanvasElement) => {
  const blank = document.createElement('canvas')
  blank.width = canvas.width
  blank.height = canvas.height
  return canvas.toDataURL() == blank.toDataURL()
}

const handleSaveImg = () => {
  if (isCanvasBlank(canvas.value)) {
    $baseMessage('当前签名文件为空', 'warning', 'hey')
    return
  }
  const el = document.createElement('a')
  el.href = canvas.value.toDataURL()
  el.download = '签名'
  const event = new MouseEvent('click')
  el.dispatchEvent(event)
}

const paint = (startX: number, startY: number, endX: number, endY: number, ctx: CanvasRenderingContext2D) => {
  ctx.beginPath()
  ctx.globalAlpha = 1
  ctx.lineWidth = 2
  ctx.strokeStyle = '#000'
  ctx.moveTo(startX, startY)
  ctx.lineTo(endX, endY)
  ctx.closePath()
  ctx.stroke()
}
</script>

<style lang="scss" scoped>
.signature-container {
  .signature-canvas-box {
    position: relative;
    width: 600px;
    margin-bottom: 15px;
    border: 40px solid var(--el-border-color);
    border-radius: var(--el-border-radius-base);

    img {
      position: absolute;
      right: 15px;
      bottom: 15px;
      width: 100px;
      user-select: none;
    }
  }

  @media (max-width: 768px) {
    .signature-canvas-box {
      width: 100%;
      height: 250px;
      border: 30px solid var(--el-border-color);

      img {
        position: absolute;
        right: 15px;
        bottom: 15px;
        width: 80px;
      }
    }
  }
}
</style>
