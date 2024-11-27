<template>
  <vab-dialog v-model="dialogFormVisible" append-to-body :title="title" width="500px" @close="close">
    <el-form ref="formRef" label-width="80px" :model="form">
      <el-form-item label="父级key值" prop="parentKey">
        <el-input v-model="form.parentKey" clearable disabled />
      </el-form-item>
      <el-form-item label="id" prop="id">
        <el-input v-model="form.id" clearable disabled />
      </el-form-item>
      <el-form-item label="key值" prop="key">
        <el-input v-model="form.key" clearable />
      </el-form-item>
      <el-form-item label="字典值" prop="value">
        <el-input v-model="form.value" clearable />
      </el-form-item>
    </el-form>
    <template #footer>
      <el-button type="primary" @click="save">保存</el-button>
    </template>
  </vab-dialog>
</template>

<script lang="ts" setup>
import type { FormInstance } from 'element-plus'
import { doEdit } from '/@/api/dictionaryManagement'
import { uuid } from '/@/utils'

defineOptions({
  name: 'DictionaryManagementEdit',
})

const emit = defineEmits(['fetch-data'])

const formRef = ref<FormInstance>()
const form = reactive<any>({
  parentKey: '',
  id: uuid(),
  key: '',
  value: '',
})
const title = ref<string>('')
const dialogFormVisible = ref<boolean>(false)

const showEdit = (row: any) => {
  dialogFormVisible.value = true
  nextTick(() => {
    title.value = '添加/编辑'
    if (row) Object.assign(form, row, { id: uuid() })
    else Object.assign(form, row, { id: uuid(), parentKey: 'root' })
  })
}

defineExpose({
  showEdit,
})

const close = () => {
  formRef.value?.clearValidate()
  formRef.value?.resetFields()
  emit('fetch-data', { key: form.parentKey })
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
