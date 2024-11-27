<template>
  <vab-dialog v-model="dialogFormVisible" append-to-body :title="title" width="500px" @close="close">
    <el-form ref="formRef" label-width="80px" :model="form" :rules="rules">
      <el-form-item label="标题" prop="title">
        <el-input v-model.trim="form.title" clearable />
      </el-form-item>
      <el-form-item label="作者" prop="author">
        <el-input v-model.trim="form.author" clearable />
      </el-form-item>
      <el-form-item label="时间" prop="datetime">
        <el-date-picker v-model="form.datetime" placeholder="选择日期时间" type="datetime" />
      </el-form-item>
      <el-form-item label="状态" prop="status">
        <el-select v-model="form.status" clearable>
          <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value" />
        </el-select>
      </el-form-item>
      <el-form-item label="数量" prop="count">
        <el-input-number v-model="form.count" />
      </el-form-item>
      <el-form-item label="评级" prop="rate">
        <el-rate v-model="form.rate" />
      </el-form-item>
      <el-form-item label="开关" prop="switch">
        <el-switch v-model="form.switch" />
      </el-form-item>
    </el-form>
    <template #footer>
      <el-button type="primary" @click="save">保存</el-button>
    </template>
  </vab-dialog>
</template>

<script lang="ts" setup>
import type { FormInstance } from 'element-plus'
import { doEdit } from '/@/api/table'

defineOptions({
  name: 'DefaultTableEdit',
})

const emit = defineEmits(['fetch-data'])

const formRef = ref<FormInstance>()
const title = ref<string>('')
const dialogFormVisible = ref<boolean>(false)
const form = reactive<any>({
  title: '',
  author: '',
  rate: 0,
  datetime: '',
  status: '',
  switch: false,
  count: 0,
})
const rules = reactive<any>({
  title: [{ required: true, trigger: 'blur', message: '请输入标题' }],
  author: [{ required: true, trigger: 'blur', message: '请输入作者' }],
})
const options = ref<any>([
  { value: 'published', label: 'published' },
  { value: 'draft', label: 'draft' },
  { value: 'deleted', label: 'deleted' },
])

const showEdit = (row: any) => {
  dialogFormVisible.value = true
  nextTick(() => {
    if (row) {
      title.value = '编辑'
      Object.assign(form, row)
    } else {
      title.value = '添加'
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
