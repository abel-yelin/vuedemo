<template>
  <div class="print-container">
    <el-space wrap>
      <el-button type="primary" @click="print('imageRef')">打印图片</el-button>
      <el-button type="primary" @click="print('tableRef')">打印表格</el-button>
      <el-button type="primary" @click="remotePrint">自定义打印</el-button>
    </el-space>
    <img ref="imageRef" alt="" :src="landscape" style="display: block; width: 520px; margin-top: 15px" />
    <br />
    <el-table ref="tableRef" :data="tableData" style="width: 520px">
      <el-table-column label="姓名" prop="name" width="120px" />
      <el-table-column label="地址" prop="address" />
    </el-table>
  </div>
</template>

<script lang="ts" setup>
import type { TableInstance } from 'element-plus'
import { ElMessageBox } from 'element-plus'
import landscape from '/@/assets/common_images/landscape.jpg'
import VabPrint from '/@/plugins/VabPrint'

defineOptions({
  name: 'Print',
})

const imageRef = ref<any>(null)
const tableRef = ref<TableInstance>()
const tableData = ref<any>([
  {
    name: '马云',
    address: '上海市普陀区金沙江路',
  },
  {
    name: '马化腾',
    address: '上海市普陀区金沙江路',
  },
  {
    name: '李彦宏',
    address: '上海市普陀区金沙江路',
  },
  {
    name: '刘强东',
    address: '上海市普陀区金沙江路',
  },
])

const print = async (value: any) => {
  switch (value) {
    case 'imageRef': {
      await VabPrint(imageRef.value)
      break
    }
    case 'tableRef': {
      await VabPrint(tableRef.value)
      break
    }
  }
}
const remotePrint = () => {
  ElMessageBox.prompt('', '自定义打印', {
    inputType: 'textarea',
    inputValue: `<h1>Vue Shop Vite</h1><p>vuejs-core.cn/shop-vite</p>`,
    inputErrorMessage: 'Invalid Email',
    confirmButtonText: '打印',
    draggable: true,
  })
    .then(({ value }) => {
      VabPrint(value)
    })
    .catch(() => {})
}
</script>
