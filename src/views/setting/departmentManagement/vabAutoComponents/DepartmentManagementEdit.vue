<template>
  <vab-dialog v-model="dialogFormVisible" append-to-body :title="title" width="500px" @close="close">
    <el-form ref="formRef" label-width="80px" :model="form" :rules="rules">
      <el-form-item label="父节点" prop="parentValue">
        <el-tree-select v-model="form.parentValue" :data="treeData" />
      </el-form-item>
      <el-form-item label="名称" prop="label">
        <el-input v-model="form.label" clearable />
      </el-form-item>
      <el-form-item label="排序" prop="order">
        <el-input v-model="form.order" clearable />
      </el-form-item>
    </el-form>
    <template #footer>
      <el-button type="primary" @click="save">保存</el-button>
    </template>
  </vab-dialog>
</template>

<script lang="ts" setup>
import type { FormInstance } from 'element-plus'
import { doEdit, getList } from '/@/api/departmentManagement'

defineOptions({
  name: 'DepartmentManagementEdit',
})

const emit = defineEmits(['fetch-data'])

const formRef = ref<FormInstance>()
const treeData = ref<any>([])
const form = reactive<any>({
  parentValue: '',
})
const rules = reactive<any>({
  parentValue: [{ required: true, trigger: 'blur', message: '请选择父节点' }],
  label: [{ required: true, trigger: 'blur', message: '请输入名称' }],
  order: [{ required: true, trigger: 'blur', message: '请输入排序' }],
})
const title = ref<string>('')
const dialogFormVisible = ref<boolean>(false)

const fetchData = async () => {
  const { data } = await getList()
  treeData.value = data.list
}

const showEdit = (row: any) => {
  dialogFormVisible.value = true
  nextTick(() => {
    if (row) {
      delete row.value
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

onBeforeMount(() => {
  fetchData()
})
</script>

<style lang="scss" scoped>
:deep() {
  .el-select {
    width: 100%;
  }
}
</style>
