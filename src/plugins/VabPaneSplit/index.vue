<template>
  <div class="split" :class="{ horizontal }">
    <div ref="one" class="sub" :style="{ flexGrow: grow1 }">
      <slot name="one"></slot>
    </div>
    <div class="resizer" @mousedown="startResize"></div>
    <div ref="two" class="sub" :style="{ flexGrow: grow2 }">
      <slot name="two"></slot>
    </div>
  </div>
</template>

<script lang="ts" setup>
defineOptions({
  name: 'VabPaneSplit',
})

export interface Props {
  horizontal?: boolean
  ratio?: string
}

const props = withDefaults(defineProps<Props>(), {
  horizontal: false,
})

const parseRatio = (ratio: string): [number, number] => {
  const rn = ratio
    ?.split('/')
    ?.map(Number)
    ?.filter((value) => !isNaN(value))

  if (!rn || rn.length !== 2) {
    return [1, 1]
  }

  return rn as [number, number]
}

const one = ref<HTMLElement>()
const two = ref<HTMLElement>()
const emit = defineEmits(['resize'])
const [initGrow1, initGrow2] = parseRatio(props.ratio as string)
const grow1 = ref<any>(initGrow1)
const grow2 = ref<any>(initGrow2)

const startResize = (mde: MouseEvent) => {
  one.value?.classList.add('forbid-select')
  two.value?.classList.add('forbid-select')

  const initialPos = props.horizontal ? mde.clientY : mde?.clientX
  const sizeOne = props.horizontal ? one?.value?.offsetHeight : one?.value?.offsetWidth
  const sizeTwo = props.horizontal ? two?.value?.offsetHeight : two?.value?.offsetWidth

  const handleMouseMove = (mme: MouseEvent) => {
    const pos = props.horizontal ? mme.clientY : mme?.clientX
    const newSizeOne = sizeOne! + pos - initialPos

    const totalGrow = grow1.value + grow2.value
    grow1.value = totalGrow * (newSizeOne / (sizeOne! + sizeTwo!))
    grow2.value = totalGrow - grow1.value
  }

  const handleMouseUp = () => {
    one.value?.classList.remove('forbid-select')
    two.value?.classList.remove('forbid-select')
    document.removeEventListener('mousemove', handleMouseMove)
    document.removeEventListener('mouseup', handleMouseUp)
    emit('resize')
  }

  document.addEventListener('mousemove', handleMouseMove)
  document.addEventListener('mouseup', handleMouseUp)
}
</script>

<style lang="scss" scoped>
.forbid-select {
  user-select: none;
}

.split {
  display: flex;
  width: 100%;
  height: 100%;

  .resizer {
    width: 5px;
    cursor: w-resize;
    background-color: var(--el-border-color);
    border-radius: var(--el-border-radius-base);
    transition: 0.3s;

    &:hover {
      background-color: var(--el-border-color);
    }
  }

  .sub {
    flex-basis: 0;
    flex-grow: 1;
    align-content: stretch;
    align-items: stretch;
    width: 100%;
    height: 100%;
    overflow-x: hidden;

    overflow-y: auto;

    scrollbar-width: thin;

    &::-webkit-scrollbar {
      width: 8px;
    }

    &::-webkit-scrollbar-track {
      background-color: var(--el-color-white);
    }

    &::-webkit-scrollbar-thumb {
      background-color: var(--el-border-color);
    }
  }

  &.horizontal {
    flex-direction: column;

    .resizer {
      width: 100%;
      height: 5px;
      cursor: n-resize;
      border-radius: var(--el-border-radius-base);
    }
  }
}
</style>
