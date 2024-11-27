<template>
  <div
    class="vab-magnifier"
    @mouseenter="!disabled && !enterEvent && mouseEnter($event)"
    @mouseleave="!disabled && !leaveEvent && mouseLeave($event)"
    @mousemove="!disabled && !moveEvent && mouseMove($event)"
  >
    <img ref="imgRef" class="origin-img" @load="imgLoaded()" />
    <div
      v-if="selector"
      v-show="!hideZoomer && imgLoadedFlag"
      :class="['img-zoomer', { circle: type === 'circle' }]"
      :style="[
        zoomerStyle,
        zoomerSize,
        zoomerPosition,
        !outZoomer && zoomerBgUrl,
        !outZoomer && zoomerBgSize,
        !outZoomer && zoomerBgPosition,
      ]"
    >
      <slot name="zoomer"></slot>
    </div>
    <div
      v-if="outZoomer"
      v-show="!hideOutZoomer"
      :class="['img-out-show', { 'base-line': baseline }]"
      :style="[outZoomerStyle, outZoomerSize, outZoomerPosition, zoomerBgUrl, zoomerBgSize, zoomerBgPosition]"
    >
      <div v-if="pointer" class="img-zoomer-point"></div>
      <slot name="outZoomer"></slot>
    </div>
    <slot></slot>
  </div>
</template>
<script lang="ts">
export default {
  name: 'VabMagnifier',
  props: {
    url: {
      type: String,
      default: '',
    },
    highUrl: {
      type: String,
      default: '',
    },
    width: {
      type: Number,
      default: 168,
    },
    height: {
      type: Number,
      default: -1,
    },
    type: {
      type: String,
      default: 'square',
      validator(value: string) {
        return ['circle', 'square'].includes(value)
      },
    },
    zoomerStyle: {
      type: Object,
      default: () => {},
    },
    outZoomerStyle: {
      type: Object,
      default: () => {},
    },
    scale: {
      type: Number,
      default: 2,
    },
    enterEvent: {
      type: [Object, UIEvent],
      default: null,
    },
    moveEvent: {
      type: [Object, UIEvent],
      default: null,
    },
    leaveEvent: {
      type: [Object, UIEvent],
      default: null,
    },
    selector: {
      type: Boolean,
      default: true,
    },
    outZoomer: {
      type: Boolean,
      default: false,
    },
    pointer: {
      type: Boolean,
      default: false,
    },
    baseline: {
      type: Boolean,
      default: false,
    },
    disabledReactive: {
      type: Boolean,
      default: false,
    },
    disabled: {
      type: Boolean,
      default: false,
    },
    mask: {
      type: Boolean,
      default: true,
    },
    maskColor: {
      type: String,
      default: '',
    },
  },
  emits: ['mousemove', 'mouseleave', 'mouseenter', 'created'],
  data() {
    return {
      zoomerRect: {
        top: 0,
        left: 0,
        absoluteLeft: 0,
        absoluteTop: 0,
      },
      zoomerBgRect: {
        top: 0,
        left: 0,
      },
      zoomerPoint: {
        leftBound: 0,
        topBound: 0,
        rightBound: 0,
        bottomBound: 0,
      },
      vZoomerPoint: {
        leftBound: 0,
        topBound: 0,
        rightBound: 0,
        bottomBound: 0,
      },
      hideZoomer: true,
      hideOutZoomer: true,
      imgLoadedFlag: false,
      outZoomerInitTop: 0,
      outZoomerTop: 0,
      imgInfo: {},
      $img: null,
    }
  },
  computed: {
    zoomerHeight() {
      return this.height > 0 ? this.height : this.width
    },
    zoomerHalfWidth() {
      return this.width / 2
    },
    zoomerHalfHeight() {
      return this.zoomerHeight / 2
    },
    vZoomerHalfWidth() {
      const zoomerHalfWidth = this.zoomerHalfWidth
      return this.outZoomer ? zoomerHalfWidth * this.scale : zoomerHalfWidth
    },
    vZoomerHalfHeight() {
      const zoomerHalfHeight = this.zoomerHalfHeight
      return this.outZoomer ? zoomerHalfHeight * this.scale : zoomerHalfHeight
    },
    zoomerPosition() {
      const { top, left } = this.zoomerRect
      return {
        top: `${top}px`,
        left: `${left}px`,
      }
    },
    zoomerSize() {
      const { width, zoomerHeight: height } = this
      return {
        width: `${width}px`,
        height: `${height}px`,
      }
    },
    outZoomerSize() {
      const { scale, width, zoomerHeight: height } = this
      return {
        width: `${width * scale}px`,
        height: `${height * scale}px`,
      }
    },
    outZoomerPosition() {
      return {
        top: `${this.outZoomerTop}px`,
      }
    },
    zoomerBgUrl(): any {
      return {
        backgroundImage: `url(${this.highUrl || this.url})`,
      }
    },
    zoomerBgSize(): any {
      const {
        scale,
        imgInfo: { height, width },
      } = this as any
      return {
        backgroundSize: `${width * scale}px ${height * scale}px`,
      }
    },
    zoomerBgPosition(): any {
      const { left, top } = this.zoomerBgRect
      return {
        backgroundPosition: `${left}px ${top}px`,
      }
    },
  },
  watch: {
    scale() {
      this.initVZoomerPoint()
      !this.outZoomer && this.mouseMove(event)
    },
    enterEvent: 'mouseEnter',
    moveEvent: 'mouseMove',
    leaveEvent: 'mouseLeave',
    url: 'handlerUrlChange',
    width: 'initZoomerPoint',
    height: 'initZoomerPoint',
    vZoomerHalfWidth: 'initVZoomerPoint',
    vZoomerHalfHeight: 'initVZoomerPoint',
  },
  mounted() {
    this.url && this.handlerUrlChange()
    //@ts-ignore
    this.beforeReactivateMoveFns = []
    this.$img = this.$refs['imgRef'] as any
    this.addResizeListener(this.$refs['imgRef'], (rect: any) => {
      this.imgInfo = rect
      this.handlerImgResize()
    })
  },
  methods: {
    getBoundingClientRect(element: any) {
      const rect = element.getBoundingClientRect()
      const isIE = navigator.userAgent.includes('MSIE')
      const rectTop = isIE && element.tagName === 'HTML' ? -element.scrollTop : rect.top
      return {
        left: rect.left,
        top: rectTop,
        right: rect.right,
        bottom: rect.bottom,
        width: rect.right - rect.left,
        height: rect.bottom - rectTop,
      }
    },
    addResizeListener(dom: any, cb: any) {
      if (!this.disabledReactive) {
        //@ts-ignore
        this.beforeReactivateMoveFns.push(() => {
          const rect = this.getBoundingClientRect(dom)
          if (this.validImgResize(rect)) {
            cb && cb(rect)
          }
        })
      }
    },
    handlerUrlChange() {
      this.imgLoadedFlag = false
      this.loadImg(this.url).then(this.imgLoaded)
    },
    loadImg(url: any) {
      return new Promise((resolve, reject) => {
        const img = document.createElement('img')
        img.addEventListener('load', resolve)
        img.addEventListener('error', reject)
        img.src = url
      })
    },
    imgLoaded() {
      this.$nextTick(() => {
        const $img: any = this.$refs['imgRef']
        if (!this.imgLoadedFlag) {
          this.imgLoadedFlag = true
          $img.src = this.url
          setTimeout(() => {
            this.imgInfo = this.getBoundingClientRect($img)
            this.handlerImgResize()
            this.$emit('created', $img, this.imgInfo)
          }, 500)
        }
      })
    },
    validImgResize(imgInfo: any) {
      return JSON.stringify(this.imgInfo) !== JSON.stringify(imgInfo)
    },
    handlerImgResize() {
      this.initZoomerProperty()
      this.resetOutZoomPosition()
    },
    mouseEnter(e: any) {
      if (this.imgLoadedFlag) {
        this.hideZoomer = false
      }
      this.$emit('mouseenter', e)
    },
    mouseMove(e: any) {
      if (this.hideZoomer) return
      if (this.imgLoadedFlag && e) {
        //@ts-ignore
        this.beforeReactivateMoveFns.forEach((fn: any) => fn.call(this))
        const { pageX, pageY, clientY } = e
        const scrollTop = pageY - clientY
        const {
          scale,
          zoomerRect,
          zoomerBgRect,
          zoomerPoint,
          vZoomerPoint,
          outZoomer,
          zoomerHalfWidth,
          zoomerHalfHeight,
          vZoomerHalfWidth,
          vZoomerHalfHeight,
        }: any = this
        const { absoluteLeft, absoluteTop } = zoomerRect
        const { leftBound, topBound, rightBound, bottomBound } = zoomerPoint
        const {
          leftBound: vZoomerLeftBound,
          topBound: vZoomerTopBound,
          rightBound: vZoomerRightBound,
          bottomBound: vZoomerBottomBound,
        } = vZoomerPoint
        let outZoomerInitTop = this.outZoomerInitTop
        const x = pageX - absoluteLeft
        const y = pageY - absoluteTop
        const zoomerLeft = x > leftBound ? Math.min(x, rightBound) : leftBound
        const zoomerTop = y > topBound ? Math.min(y, bottomBound) : topBound
        const vZoomerX = x * scale > vZoomerLeftBound ? Math.min(x * scale, vZoomerRightBound) : vZoomerLeftBound
        const vZoomerY = y * scale > vZoomerTopBound ? Math.min(y * scale, vZoomerBottomBound) : vZoomerTopBound
        zoomerRect.left = zoomerLeft - zoomerHalfWidth
        zoomerRect.top = zoomerTop - zoomerHalfHeight
        zoomerBgRect.left = -vZoomerX + vZoomerHalfWidth
        zoomerBgRect.top = -vZoomerY + vZoomerHalfHeight
        if (outZoomer) {
          if (!outZoomerInitTop) {
            //@ts-ignore
            outZoomerInitTop = this.outZoomerInitTop = scrollTop + this.imgInfo.top
          }
          this.hideOutZoomer && (this.hideOutZoomer = false)
          this.outZoomerTop = scrollTop > outZoomerInitTop ? scrollTop - outZoomerInitTop : 0
        }
      }
      this.$emit('mousemove', e)
    },
    mouseLeave(e: any) {
      this.hideZoomer = true
      if (this.outZoomer) {
        this.hideOutZoomer = true
      }
      this.$emit('mouseleave', e)
    },
    initZoomerProperty() {
      const zoomerRect = this.zoomerRect
      const { left, top } = this.imgInfo as any
      const { documentElement, body } = document
      const scrollTop = documentElement.scrollTop || body.scrollTop
      const scrollLeft = documentElement.scrollLeft || body.scrollLeft
      zoomerRect.absoluteLeft = left + scrollLeft
      zoomerRect.absoluteTop = top + scrollTop
      this.initZoomerPoint()
      this.initVZoomerPoint()
    },
    initZoomerPoint() {
      const zoomerHalfWidth = this.zoomerHalfWidth
      const zoomerHalfHeight = this.zoomerHalfHeight
      const { width, height } = this.imgInfo as any
      const zoomerPoint = this.zoomerPoint
      zoomerPoint.leftBound = zoomerHalfWidth
      zoomerPoint.topBound = zoomerHalfHeight
      zoomerPoint.rightBound = width - zoomerHalfWidth
      zoomerPoint.bottomBound = height - zoomerHalfHeight
      this.mouseMove(event)
    },
    initVZoomerPoint() {
      const vZoomerPoint = this.vZoomerPoint
      const vZoomerHalfWidth = this.vZoomerHalfWidth
      const vZoomerHalfHeight = this.vZoomerHalfHeight
      const { width, height } = this.imgInfo as any
      const scale = this.scale
      vZoomerPoint.leftBound = vZoomerHalfWidth
      vZoomerPoint.topBound = vZoomerHalfHeight
      vZoomerPoint.rightBound = width * scale - vZoomerHalfWidth
      vZoomerPoint.bottomBound = height * scale - vZoomerHalfHeight
      this.mouseMove(event)
    },
    reset() {
      this.initZoomerProperty()
    },
    resetOutZoomPosition() {
      this.outZoomerInitTop = 0
    },
  },
}
</script>

<style lang="scss" scoped>
.vab-magnifier {
  position: relative;
  width: 100%;
  height: 100%;

  .origin-img {
    width: 100%;
    height: 100%;
  }

  .img-zoomer {
    position: absolute;
    box-sizing: border-box;
    cursor: crosshair;
    background-repeat: no-repeat;
    border: 1px solid rgba(0, 0, 0, 0.1);

    &.circle {
      border-radius: 50%;
    }

    &-point {
      position: absolute;
      top: 50%;
      left: 50%;
      width: 4px;
      height: 4px;
      background-color: black;
      transform: translate(-50%, -50%);
    }
  }

  .img-out-show {
    position: absolute;
    right: -8px;
    box-sizing: border-box;
    background-repeat: no-repeat;
    border: 1px solid rgba(0, 0, 0, 0.1);
    transform: translate(100%, 0);

    &.base-line {
      &::after {
        position: absolute;
        top: 0;
        bottom: 0;
        left: 50%;
        box-sizing: border-box;
        width: 1px;
        content: '';
        border: 1px dashed rgba(0, 0, 0, 0.36);
        transform: translateX(-50%);
      }

      &::before {
        position: absolute;
        top: 50%;
        right: 0;
        left: 0;
        box-sizing: border-box;
        height: 1px;
        content: '';
        border: 1px dashed rgba(0, 0, 0, 0.36);
        transform: translateY(-50%);
      }
    }
  }
}
</style>
