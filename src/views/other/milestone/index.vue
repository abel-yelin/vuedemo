<template>
  <div class="milestone-container">
    <tiny-milestone :data="milestoneData" :milestones-status="statusMap" />
  </div>
</template>

<script lang="ts" setup>
import { Milestone as TinyMilestone } from '@opentiny/vue'

defineOptions({
  name: 'Milestone',
})

// 里程碑样式
const statusMap = ref({
  // 对应下面status 显示的背景色样式（可以是旗，可以是步骤条）
  completed: 'var(--el-color-primary)',
  doing: 'var(--el-color-success)',
  back: 'var(--el-color-danger)',
  end: 'var(--el-color-warning)',
})
const milestoneData = ref([
  {
    name: 'POR1',
    time: '2023-9-7',
    status: 'completed',
    flags: [
      {
        status: 'completed',
        name: 'test1',
        content: '已完成',
      },
    ],
  },
  {
    name: 'POR2',
    time: '2023-9-8',
    status: 'completed',
    flags: [
      {
        status: 'back',
        content: 'test2',
      },
    ],
  },
  { name: 'POR3', time: '2023-9-10', status: 'doing', content: null },
  {
    name: 'POR4',
    time: '2023-9-9',
    status: 'cancel',
    flags: [
      {
        status: 'back',
        content: '',
        name: 'test3',
      },
      {
        status: 'doing',
        content: 'test4',
      },
    ],
  },
  { name: 'POR5', time: '2023-9-11', status: 'back' },
  {
    name: 'POR6',
    time: '2023-9-9',
    status: 'end',
    flags: [
      {
        status: 'completed',
        content: 'test4',
      },
    ],
  },
])
</script>

<style lang="scss" scoped>
.milestone-container {
  :deep() {
    .tiny-milestone {
      &__description-name {
        color: var(--el-color-grey);
      }

      &__description-status {
        color: var(--el-color-grey);
      }
    }
  }
}
</style>
