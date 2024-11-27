<template>
  <el-button type="primary" @click="drawer = true">打开</el-button>

  <el-drawer v-model="drawer" append-to-body size="288px" title="我是外抽屉">
    <div>
      <el-button @click="innerDrawer = true">点我</el-button>
      <el-drawer v-model="innerDrawer" append-to-body :before-close="handleClose" size="188px" title="我是内抽屉" />
    </div>
  </el-drawer>
</template>

<script lang="ts" setup>
import { ElMessageBox } from 'element-plus'

const drawer = ref<boolean>(false)
const innerDrawer = ref<boolean>(false)

const handleClose = (done: () => void) => {
  ElMessageBox.confirm('您还有未保存的数据，确定要继续吗？', {
    draggable: true,
  })
    .then(() => {
      done()
    })
    .catch(() => {
      // catch error
    })
}
</script>
