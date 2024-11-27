<template>
  <div class="node-panel">
    <div v-for="item in nodeList" :key="item.text" class="node-item" @mousedown="$_dragNode(item)">
      <div class="node-item-icon" :class="item.class">
        <vab-icon :icon="item.icon" />
      </div>
      <span class="node-label">{{ item.text }}</span>
    </div>
  </div>
</template>

<script>
export default defineComponent({
  name: 'NodePanel',
  props: {
    lf: {
      type: Object,
      default: () => {},
    },
  },
  data() {
    return {
      nodeList: [
        {
          text: '开始',
          type: 'start',
          icon: 'play-circle-line',
        },
        {
          text: '矩形',
          type: 'rect',
          icon: 'shape-line',
        },
        {
          type: 'user',
          text: '用户',
          icon: 'user-3-line',
        },
        {
          type: 'push',
          text: '推送',
          icon: 'share-line',
        },
        {
          type: 'download',
          text: '位置',
          icon: 'user-location-line',
        },
        {
          type: 'end',
          text: '结束',
          icon: 'stop-circle-line',
        },
      ],
    }
  },
  methods: {
    $_dragNode(item) {
      this.$props.lf.dnd.startDrag({
        type: item.type,
        text: item.label,
      })
    },
  },
})
</script>

<style lang="scss" scoped>
.node-panel {
  position: absolute;
  top: 50%;
  left: var(--el-margin);
  z-index: 101;
  width: 70px;
  padding-top: 25px;
  margin-top: -254px;
  text-align: center;
  background-color: var(--el-color-white);
  border: 1px solid var(--el-border-color);
  border-radius: 6px;
}

.node-item {
  margin-bottom: 20px;
}

.node-item-icon {
  display: block;
  width: 30px;
  height: 30px;
  margin: auto;

  :deep() {
    [class*='ri-'] {
      font-size: 25px;
    }
  }
}

.node-label {
  font-size: 12px;
  line-height: 30px;
  user-select: none;
}
</style>
