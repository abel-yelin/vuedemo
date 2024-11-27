<template>
  <div class="workflow-container no-transition-container">
    <vab-alert class="hidden-sm-and-up" title="手机端不支持工作流演示" type="warning" />
    <control v-if="lf" class="vab-control hidden-xs-only" :lf="lf" @cat-data="catData" />
    <node-panel class="hidden-xs-only" :lf="lf" />
    <div id="container" ref="container" class="hidden-xs-only"></div>
    <add-panel
      v-if="showAddPanel"
      class="add-panel hidden-xs-only"
      :lf="lf"
      :node-data="addClickNode"
      :style="addPanelStyle"
      @add-node-finish="hideAddPanel"
    />
    <el-drawer v-model="dialogVisible" :before-close="closeDialog" direction="rtl" size="400px" title="设置节点属性">
      <property-dialog v-if="dialogVisible" :lf="lf" :node-data="clickNode" @set-properties-finish="closeDialog" />
    </el-drawer>
    <vab-dialog v-model="dataVisible" append-to-body class="graph-data-dialog" height="100px" title="数据">
      <data-dialog :graph-data="graphData" />
    </vab-dialog>
  </div>
</template>

<script>
import LogicFlow from '@logicflow/core'
import '@logicflow/core/lib/style/index.css'
import { Menu, Snapshot } from '@logicflow/extension'
import '@logicflow/extension/lib/style/index.css'
import {
  registerDownload,
  registerEnd,
  registerPolyline,
  registerPush,
  registerStart,
  registerUser,
} from './vabAutoComponents/registerNode'
import { getList } from '/@/api/workflow'
import { gp } from '/@vab/plugins/vab'

export default defineComponent({
  name: 'Workflow',
  data() {
    return {
      data: [],
      lf: null,
      showAddPanel: false,
      addPanelStyle: {
        top: 0,
        left: 0,
      },
      addClickNode: null,
      clickNode: null,
      dialogVisible: false,
      graphData: null,
      dataVisible: false,
    }
  },
  created() {
    this.fetchData()
  },
  methods: {
    async fetchData() {
      const { data } = await getList()
      this.data = data
      this.$_initLf()
    },
    $_initLf() {
      // 画布配置
      const config = {
        container: this.$refs.container,
        background: {
          backgroundColor: 'var(--el-color-white)',
        },
        grid: {
          size: 10,
          visible: false,
        },
        keyboard: {
          enabled: true,
        },
        edgeTextDraggable: true,
        guards: {
          beforeClone() {
            return true
          },
          beforeDelete() {
            return true
          },
        },
      }
      LogicFlow.use(Menu)
      LogicFlow.use(Snapshot)
      this.lf = new LogicFlow({ ...config })

      this.lf.setMenuConfig({
        nodeMenu: [],
        edgeMenu: [],
      })
      this.lf.addMenuConfig({
        nodeMenu: [
          {
            text: '分享',
            callback() {
              alert('分享成功！')
            },
          },
          {
            text: '属性',
            callback(node) {
              alert(`
                  节点id：${node.id}
                  节点类型：${node.type}
                  节点坐标：(x: ${node.x}, y: ${node.y})`)
            },
          },
        ],
        edgeMenu: [
          {
            text: '属性',
            callback(edge) {
              alert(`
                  边id：${edge.id}
                  边类型：${edge.type}
                  边坐标：(x: ${edge.x}, y: ${edge.y})
                  源节点id：${edge.sourceNodeId}
                  目标节点id：${edge.targetNodeId}`)
            },
          },
        ],
      })
      this.lf.setTheme({
        circle: {
          r: 20,
          fill: 'var(--el-color-white)',
          stroke: 'var(--el-color-grey)',
          strokeWidth: 1,
        },
        rect: {
          fill: 'var(--el-color-white)',
          stroke: 'var(--el-color-grey)',
          strokeWidth: 1,
        },
        diamond: {
          fill: 'var(--el-color-white)',
          stroke: 'var(--el-color-grey)',
          strokeWidth: 1,
        },
        ellipse: {
          fill: 'var(--el-color-white)',
          stroke: 'var(--el-color-grey)',
          strokeWidth: 1,
        },
        polygon: {
          fill: 'var(--el-color-white)',
          stroke: 'var(--el-color-grey)',
          strokeWidth: 1,
        },
        polyline: {
          stroke: 'var(--el-color-grey)',
          hoverStroke: 'var(--el-color-grey)',
          selectedStroke: 'var(--el-color-grey)',

          strokeWidth: 1,
        },
        nodeText: {
          color: 'var(--el-color-grey)',
        },
        edgeText: {
          color: 'var(--el-color-grey)',
          background: {
            fill: 'var(--el-color-white)',
          },
        },
      })
      this.registerNode()
    },
    registerNode() {
      registerStart(this.lf)
      registerUser(this.lf)
      registerEnd(this.lf)
      registerPush(this.lf, this.clickPlus, this.mouseDownPlus)
      registerDownload(this.lf)
      registerPolyline(this.lf)
      this.render()
    },
    render() {
      this.lf.render(this.data)
      this.event()
    },
    getData() {
      this.lf.getGraphData()
    },
    event() {
      this.lf.on('node:click', ({ data }) => {
        this.clickNode = data
        this.dialogVisible = true
      })
      this.lf.on('edge:click', ({ data }) => {
        this.clickNode = data
        this.dialogVisible = true
      })
      this.lf.on('element:click', () => {
        this.hideAddPanel()
      })
      this.lf.on('blank:click', () => {
        this.hideAddPanel()
      })
      this.lf.on('connection:not-allowed', (data) => {
        gp.$baseMessage(data.msg, 'error', 'hey')
      })
      this.lf.on('node:mousemove', () => {})
    },
    clickPlus(e, attributes) {
      e.stopPropagation()
      const { clientX, clientY } = e
      this.addPanelStyle.top = `${clientY - 40}px`
      this.addPanelStyle.left = `${clientX}px`
      this.showAddPanel = true
      this.addClickNode = attributes
    },
    mouseDownPlus(e) {
      e.stopPropagation()
    },
    hideAddPanel() {
      this.showAddPanel = false
      this.addPanelStyle.top = 0
      this.addPanelStyle.left = 0
      this.addClickNode = null
    },
    closeDialog() {
      this.dialogVisible = false
    },
    catData() {
      this.graphData = this.lf.getGraphData()
      this.dataVisible = true
    },
  },
})
</script>

<style lang="scss" scoped>
.workflow-container {
  position: relative;

  .vab-control {
    position: absolute;
    top: var(--el-margin);
    left: var(--el-margin);
    z-index: 2;
  }

  #container {
    height: calc(var(--el-container-height) - var(--el-padding) * 2);
    outline: none;
  }

  .time-plus {
    cursor: pointer;
  }

  .add-panel {
    position: absolute;
    z-index: 11;
  }
}
</style>

<style lang="scss">
.graph-data-dialog {
  .el-dialog__body {
    max-height: 70vh;
    overflow-y: auto;
  }
}
</style>
