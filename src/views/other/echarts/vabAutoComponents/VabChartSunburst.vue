<template>
  <el-col :lg="8" :md="12" :sm="24" :xl="6" :xs="24">
    <vab-card :body-style="{ height: '240px' }" skeleton :title="title">
      <vab-chart :option="option" />
    </vab-card>
  </el-col>
</template>

<script lang="ts" setup>
import { random } from 'lodash-es'

defineOptions({
  name: 'VabChartSunburst',
})

defineProps({
  title: {
    type: String,
    default: '',
  },
})

let timer: ReturnType<typeof setInterval>

const option = reactive<any>({
  grid: {
    top: 20,
    right: 20,
    bottom: 20,
    left: 20,
  },
  tooltip: {
    trigger: 'item',
  },
  series: {
    type: 'sunburst',
    data: [
      {
        children: [
          {
            value: random(0, 40),
            children: [
              {
                value: random(0, 40),
              },
              {
                value: random(0, 40),
                children: [
                  {
                    value: random(0, 40),
                  },
                ],
              },
              {
                children: [
                  {
                    value: random(0, 40),
                  },
                ],
              },
            ],
          },
          {
            value: random(0, 40),
            children: [
              {
                value: random(0, 40),
                children: [
                  {
                    value: random(0, 40),
                  },
                  {
                    value: random(0, 40),
                  },
                  {
                    value: random(0, 40),
                  },
                  {
                    value: random(0, 40),
                  },
                ],
              },
              {
                value: random(0, 40),
                children: [
                  {
                    value: random(0, 40),
                  },
                ],
              },
              {
                children: [
                  {
                    value: random(0, 40),
                  },
                ],
              },
            ],
          },
        ],
      },
      {
        value: random(0, 40),
        children: [
          {
            value: random(0, 40),
            children: [
              {
                value: random(0, 40),
              },
              {
                children: [
                  {
                    value: random(0, 40),
                  },
                ],
              },
            ],
          },
          {
            children: [
              {
                value: random(0, 40),
                children: [
                  {
                    value: random(0, 40),
                  },
                  {
                    value: random(0, 40),
                  },
                ],
              },
            ],
          },
        ],
      },
      {
        value: random(0, 40),
        children: [
          {
            children: [
              {
                value: random(0, 40),
              },
              {
                value: random(0, 40),
                children: [
                  {
                    value: random(0, 40),
                  },
                  {
                    value: random(0, 40),
                  },
                ],
              },
              {
                value: random(0, 40),
                children: [
                  {
                    value: random(0, 40),
                  },
                  {
                    value: random(0, 40),
                  },
                ],
              },
            ],
          },
        ],
      },
      {
        children: [
          {
            value: random(0, 40),
            children: [
              {
                value: random(0, 40),
              },
              {
                value: random(0, 40),
                children: [
                  {
                    value: random(0, 40),
                  },
                ],
              },
              {
                value: random(0, 40),
              },
            ],
          },
          {
            value: random(0, 40),
            children: [
              {
                value: random(0, 40),
              },
              {
                children: [
                  {
                    value: random(0, 40),
                  },
                ],
              },
              {
                value: random(0, 40),
              },
            ],
          },
        ],
      },
    ],
    radius: ['10%', '100%'],
    label: {
      rotate: 'radial',
    },
  },
})

onMounted(() => {
  timer = setInterval(() => {
    option.series.data = [
      {
        children: [
          {
            value: random(0, 40),
            children: [
              {
                value: random(0, 40),
              },
              {
                value: random(0, 40),
                children: [
                  {
                    value: random(0, 40),
                  },
                ],
              },
              {
                children: [
                  {
                    value: random(0, 40),
                  },
                ],
              },
            ],
          },
          {
            value: random(0, 40),
            children: [
              {
                value: random(0, 40),
                children: [
                  {
                    value: random(0, 40),
                  },
                  {
                    value: random(0, 40),
                  },
                  {
                    value: random(0, 40),
                  },
                  {
                    value: random(0, 40),
                  },
                ],
              },
              {
                value: random(0, 40),
                children: [
                  {
                    value: random(0, 40),
                  },
                ],
              },
              {
                children: [
                  {
                    value: random(0, 40),
                  },
                ],
              },
            ],
          },
        ],
      },
      {
        value: random(0, 40),
        children: [
          {
            value: random(0, 40),
            children: [
              {
                value: random(0, 40),
              },
              {
                children: [
                  {
                    value: random(0, 40),
                  },
                ],
              },
            ],
          },
          {
            children: [
              {
                value: random(0, 40),
                children: [
                  {
                    value: random(0, 40),
                  },
                  {
                    value: random(0, 40),
                  },
                ],
              },
            ],
          },
        ],
      },
      {
        value: random(0, 40),
        children: [
          {
            children: [
              {
                value: random(0, 40),
              },
              {
                value: random(0, 40),
                children: [
                  {
                    value: random(0, 40),
                  },
                  {
                    value: random(0, 40),
                  },
                ],
              },
              {
                value: random(0, 40),
                children: [
                  {
                    value: random(0, 40),
                  },
                  {
                    value: random(0, 40),
                  },
                ],
              },
            ],
          },
        ],
      },
      {
        children: [
          {
            value: random(0, 40),
            children: [
              {
                value: random(0, 40),
              },
              {
                value: random(0, 40),
                children: [
                  {
                    value: random(0, 40),
                  },
                ],
              },
              {
                value: random(0, 40),
              },
            ],
          },
          {
            value: random(0, 40),
            children: [
              {
                value: random(0, 40),
              },
              {
                children: [
                  {
                    value: random(0, 40),
                  },
                ],
              },
              {
                value: random(0, 40),
              },
            ],
          },
        ],
      },
    ]
  }, 3000)
})

onBeforeUnmount(() => {
  if (timer) clearInterval(timer)
})
</script>
