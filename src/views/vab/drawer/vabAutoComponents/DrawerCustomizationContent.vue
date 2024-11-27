<template>
  <el-button type="primary" @click="table = true">嵌套表格</el-button>
  <el-button type="primary" @click="dialog = true">嵌套表单</el-button>
  <el-drawer v-model="table" append-to-body direction="rtl" size="288px" title="我有一个嵌套表格">
    <el-table :data="gridData">
      <el-table-column label="日期" property="date" width="150" />
      <el-table-column label="姓名" property="name" width="200" />
      <el-table-column label="地址" property="address" />
    </el-table>
  </el-drawer>

  <el-drawer
    ref="drawerRef"
    v-model="dialog"
    append-to-body
    :before-close="handleClose"
    direction="ltr"
    size="288px"
    title="我有一个嵌套的表单！"
  >
    <div>
      <el-form :model="form">
        <el-form-item label="姓名" :label-width="formLabelWidth">
          <el-input v-model="form.name" autocomplete="off" clearable />
        </el-form-item>
        <el-form-item label="地区" :label-width="formLabelWidth">
          <el-select v-model="form.region" placeholder="请选择活动区域">
            <el-option label="上海" value="shanghai" />
            <el-option label="北京" value="beijing" />
          </el-select>
        </el-form-item>
      </el-form>
      <div>
        <el-button @click="cancelForm">取消</el-button>
        <el-button :loading="loading" type="primary" @click="onClick">
          {{ loading ? '提交中 ...' : '提交' }}
        </el-button>
      </div>
    </div>
  </el-drawer>
</template>

<script lang="ts" setup>
import { ElDrawer, ElMessageBox } from 'element-plus'

const formLabelWidth = '80px'
let timer: ReturnType<typeof setInterval>

const table = ref<boolean>(false)
const dialog = ref<boolean>(false)
const loading = ref<boolean>(false)

const form = reactive({
  name: '',
  region: '',
  date1: '',
  date2: '',
  delivery: false,
  type: [],
  resource: '',
  desc: '',
})

const gridData = [
  {
    date: '2016-05-02',
    name: 'Peter Parker',
    address: 'Queens, New York City',
  },
  {
    date: '2016-05-04',
    name: 'Peter Parker',
    address: 'Queens, New York City',
  },
  {
    date: '2016-05-01',
    name: 'Peter Parker',
    address: 'Queens, New York City',
  },
  {
    date: '2016-05-03',
    name: 'Peter Parker',
    address: 'Queens, New York City',
  },
]

const drawerRef = ref<any>()
const onClick = () => {
  drawerRef.value?.close()
}

const handleClose = (done: () => void) => {
  if (loading.value) {
    return
  }
  ElMessageBox.confirm('您确定要提交吗？', {
    draggable: true,
  })
    .then(() => {
      loading.value = true
      timer = setTimeout(() => {
        done()
        // 动画关闭需要一定的时间
        setTimeout(() => {
          loading.value = false
        }, 400)
      }, 1000 * 2)
    })
    .catch(() => {
      // catch error
    })
}

const cancelForm = () => {
  loading.value = false
  dialog.value = false
  if (timer) clearTimeout(timer)
}
</script>
