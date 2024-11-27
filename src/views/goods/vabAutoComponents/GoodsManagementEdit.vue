<template>
  <vab-dialog v-model="dialogFormVisible" append-to-body :title="title" width="500px" @close="close">
    <el-form ref="formRef" label-width="80px" :model="form" :rules="rules">
      <el-form-item label="商品名称" prop="name">
        <el-input v-model.trim="form.name" clearable />
      </el-form-item>
      <el-form-item label="商品图">
        <el-upload v-model:file-list="fileList" action="/uploadFile" drag multiple style="width: 100%">
          <el-icon class="el-icon--upload">
            <upload-filled />
          </el-icon>
          <div class="el-upload__text">
            将商品图拖拽至此处或
            <em>点击上传</em>
          </div>
          <template #tip>
            <div class="el-upload__tip">jpg/png 文件需小于500kb</div>
          </template>
        </el-upload>
      </el-form-item>
      <el-form-item label="商品类型" prop="type">
        <el-select v-model="form.type">
          <el-option v-for="item in typeList" :key="item.value" :label="item.label" :value="item.value" />
        </el-select>
      </el-form-item>
      <el-form-item label="状态" prop="status">
        <el-select v-model="form.status">
          <el-option v-for="item in statusList" :key="item.value" :label="item.label" :value="item.value" />
        </el-select>
      </el-form-item>
      <el-form-item label="商品售价" prop="price">
        <el-input v-model.trim="form.price" clearable />
      </el-form-item>
      <el-form-item label="库存" prop="stock">
        <el-input v-model.trim="form.stock" clearable />
      </el-form-item>
    </el-form>
    <template #footer>
      <el-button type="primary" @click="save">保存</el-button>
    </template>
  </vab-dialog>
</template>

<script lang="ts" setup>
import { UploadFilled } from '@element-plus/icons-vue'
import type { FormInstance, UploadUserFile } from 'element-plus'
import { doEdit } from '/@/api/workOrder'

defineOptions({
  name: 'GoodsManagementEdit',
})

const emit = defineEmits(['fetch-data'])

const formRef = ref<FormInstance>()
const title = ref<string>('')
const dialogFormVisible = ref<boolean>(false)
const form = reactive<any>({})
const rules = reactive<any>({
  name: [{ required: true, trigger: 'blur', message: '请输入商品名称' }],
  type: [{ required: true, trigger: 'blur', message: '请输入商品类型' }],
  price: [{ required: true, trigger: 'blur', message: '请输入商品售价' }],
  stock: [{ required: true, trigger: 'blur', message: '请输入库存' }],
  status: [{ required: true, trigger: 'blur', message: '请输入状态' }],
})
const typeList = ref<any>([
  { value: '1', label: '家用电器' },
  { value: '2', label: '食品饮料' },
  { value: '3', label: '其他' },
])
const statusList = ref<any>([
  { value: '1', label: '待上架' },
  { value: '2', label: '已上架' },
  { value: '3', label: '已下架' },
])
const fileList = ref<UploadUserFile[]>([])

const showEdit = (row: any) => {
  dialogFormVisible.value = true
  nextTick(() => {
    if (row) {
      title.value = '编辑'
      Object.assign(form, row)
      fileList.value = [
        {
          name: '商品图',
          url: row.image,
        },
      ]
    } else {
      title.value = '添加'
      fileList.value = []
    }
  })
}

defineExpose({
  showEdit,
})

const close = () => {
  formRef.value?.clearValidate()
  formRef.value?.resetFields()
  emit('fetch-data')
}

const save = () => {
  formRef.value?.validate(async (valid: any) => {
    if (valid) {
      const { msg }: any = await doEdit(form)
      await $baseMessage(msg, 'success', 'hey')
      await close()
      dialogFormVisible.value = false
    }
  })
}
</script>
