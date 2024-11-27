<template>
  <vab-dialog v-model="dialogFormVisible" append-to-body :title="title" width="500px" @close="close">
    <el-form ref="formRef" label-width="80px" :model="form" :rules="rules">
      <el-form-item label="角色码" prop="role">
        <el-input v-model="form.role" clearable />
      </el-form-item>
      <el-form-item label="菜单">
        <div class="vab-tree-border">
          <el-tree
            ref="treeRef"
            :data="list"
            :default-checked-keys="form.menuCheckedList"
            :default-expanded-keys="[]"
            node-key="path"
            show-checkbox
          >
            <template #default="{ data }">
              <span>{{ data.meta.title }}</span>
            </template>
          </el-tree>
        </div>
      </el-form-item>
      <el-form-item label="按钮权限">
        <el-input v-model="form.btnRolesCheckedList" clearable :rows="3" type="textarea" />
      </el-form-item>
    </el-form>
    <template #footer>
      <el-button type="primary" @click="save">保存</el-button>
    </template>
  </vab-dialog>
</template>

<script lang="ts" setup>
import type { FormInstance } from 'element-plus'
import { doEdit } from '/@/api/roleManagement'
import { getList } from '/@/api/router'

defineOptions({
  name: 'RoleManagementEdit',
})

const emit = defineEmits(['fetch-data'])

const formRef = ref<FormInstance>()
const treeRef = ref<any>(null)
const form = reactive<any>({
  role: '',
  btnRolesCheckedList: [
    'read:system',
    'write:system',
    'delete:system',
    'read:index',
    'write:index',
    'delete:index',
    'read:index',
    'write:index',
    'delete:index',
  ],
})
const rules = reactive<any>({
  role: [{ required: true, trigger: 'blur', message: '请输入角色码' }],
})
const title = ref<string>('')
const dialogFormVisible = ref<boolean>(false)
const list = ref<any>([])

const showEdit = (row: any) => {
  dialogFormVisible.value = true
  nextTick(() => {
    if (row) {
      title.value = '编辑'
      Object.assign(form, row)
    } else {
      title.value = '添加'
      form.btnRolesCheckedList = [
        'read:system',
        'write:system',
        'delete:system',
        'read:index',
        'write:index',
        'delete:index',
        'read:index',
        'write:index',
        'delete:index',
      ]
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

const fetchData = async () => {
  const { data } = await getList()
  list.value = data.list
}

const save = () => {
  formRef.value?.validate(async (valid: any) => {
    if (valid) {
      const tree = treeRef.value.getCheckedKeys()
      const treeObject = { 'treeArray:': tree }
      const { msg }: any = await doEdit({
        ...form,
        ...treeObject,
      })
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
.vab-tree-border {
  width: 100%;
  height: 250px;
  padding: var(--el-padding);
  overflow-y: auto;
  border: 1px solid var(--el-border-color);
  border-radius: var(--el-border-radius-base);
}
</style>
