<template>
  <span>{{ displayValue }}</span>
</template>

<script setup>
import { isNumber } from '/@/utils/validate'

defineOptions({
  name: 'VabCount',
})

const props = defineProps({
  startValue: {
    type: Number,
    required: false,
    default: 0,
  },
  endValue: {
    type: Number,
    required: false,
    default: 20,
  },
  duration: {
    type: Number,
    required: false,
    default: 3000,
  },
  autoplay: {
    type: Boolean,
    required: false,
    default: true,
  },
  decimals: {
    type: Number,
    required: false,
    default: 0,
    validator(value) {
      return value >= 0
    },
  },
  decimal: {
    type: String,
    required: false,
    default: '.',
  },
  separator: {
    type: String,
    required: false,
    default: ',',
  },
  prefix: {
    type: String,
    required: false,
    default: '',
  },
  suffix: {
    type: String,
    required: false,
    default: '',
  },
  useEasing: {
    type: Boolean,
    required: false,
    default: true,
  },
  easingFn: {
    type: Array,
    default: () => [0.2, 0.2, 0, 1],
  },
})

const source = ref(props.startValue)
const output = useTransition(source, {
  duration: props.duration,
  transition: props.useEasing ? props.easingFn : TransitionPresets.linear,
})

const formatNumber = (num) => {
  num = num.toFixed(props.decimals)
  num += ''
  const x = num.split('.')
  let x1 = x[0]
  const x2 = x.length > 1 ? props.decimal + x[1] : ''
  const rgx = /(\d+)(\d{3})/
  if (props.separator && !isNumber(props.separator)) {
    while (rgx.test(x1)) {
      x1 = x1.replace(rgx, `$1${props.separator}$2`)
    }
  }
  return props.prefix + x1 + x2 + props.suffix
}

const displayValue = computed(() => formatNumber(output.value))

watch(
  props,
  (props) => {
    if (props.autoplay) {
      source.value = props.endValue
    }
  },
  { immediate: true }
)
</script>
