<template>
  <vab-dialog v-model="dialogFormVisible" append-to-body :title="title" width="500px" @close="close">
    <el-form ref="formRef" label-width="80px" :model="form" :rules="rules">
      <el-form-item label="用户名" prop="username">
        <el-input v-model.trim="form.username" clearable />
      </el-form-item>
      <el-form-item label="密码" prop="password">
        <el-input v-model.trim="form.password" clearable type="password" />
      </el-form-item>
      <el-form-item label="邮箱" prop="email">
        <el-input v-model.trim="form.email" clearable />
      </el-form-item>
      <el-form-item label="角色" prop="roles">
        <el-checkbox-group v-model="form.roles">
          <el-checkbox label="admin" />
          <el-checkbox label="editor" />
        </el-checkbox-group>
      </el-form-item>
    </el-form>
    <template #footer>
      <el-button type="primary" @click="save">保存</el-button>
    </template>
  </vab-dialog>
</template>

<script lang="ts" setup>
import type { FormInstance } from 'element-plus'
import { doEdit } from '/@/api/userManagement'

defineOptions({
  name: 'UserManagementEdit',
})

const emit = defineEmits(['fetch-data'])

const formRef = ref<FormInstance>()
const form = reactive<any>({
  username: '',
  password: '',
  email: '',
  roles: [],
})
const rules = reactive<any>({
  username: [{ required: true, trigger: 'blur', message: '请输入用户名' }],
  password: [{ required: true, trigger: 'blur', message: '请输入密码' }],
  email: [{ required: true, trigger: 'blur', message: '请输入邮箱' }],
  roles: [{ required: true, trigger: 'blur', message: '请选择角色' }],
})
const title = ref<string>('')
const dialogFormVisible = ref<boolean>(false)

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
