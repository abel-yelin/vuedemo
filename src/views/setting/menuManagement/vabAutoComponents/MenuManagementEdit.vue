<template>
  <vab-dialog v-model="dialogFormVisible" append-to-body :title="title" width="830px" @close="close">
    <el-form ref="formRef" inline label-width="140px" :model="form" :rules="rules">
      <el-form-item label="父级Id" prop="parentId">
        <el-input v-model="form.parentId" clearable />
      </el-form-item>
      <el-form-item label="name" prop="name">
        <el-input v-model="form.name" clearable />
      </el-form-item>
      <el-form-item label="路径" prop="path">
        <el-input v-model="form.path" clearable />
      </el-form-item>
      <el-form-item label="vue文件路径" prop="component">
        <el-input v-model="form.component" clearable />
      </el-form-item>
      <el-form-item label="重定向" prop="redirect">
        <el-input v-model="form.redirect" clearable />
      </el-form-item>
      <el-form-item label="标题" prop="meta.title">
        <el-input v-model="form.meta.title" clearable />
      </el-form-item>
      <el-form-item label="图标">
        <el-popover v-model:visible="visible" popper-class="icon-selector-popper" :width="305">
          <template #reference>
            <el-input v-model="form.meta.icon" clearable />
          </template>
          <vab-icon-selector @handle-icon="handleIcon" />
        </el-popover>
      </el-form-item>
      <el-form-item label="badge">
        <el-input v-model="form.meta.badge" clearable />
      </el-form-item>
      <el-form-item label="guard">
        <el-input v-model="form.meta.guard" clearable />
      </el-form-item>
      <el-form-item label="dot">
        <el-switch v-model="form.meta.dot" />
      </el-form-item>
      <el-form-item label="隐藏">
        <el-switch v-model="form.meta.hidden" />
      </el-form-item>
      <el-form-item label="始终显示当前节点">
        <el-switch v-model="form.meta.levelHidden" />
      </el-form-item>
      <el-form-item label="自定义svg图标">
        <el-switch v-model="form.meta.isCustomSvg" />
      </el-form-item>
      <el-form-item label="固定">
        <el-switch v-model="form.meta.noClosable" />
      </el-form-item>
      <el-form-item label="无缓存">
        <el-switch v-model="form.meta.noKeepAlive" />
      </el-form-item>
      <el-form-item label="不显示当前标签页">
        <el-switch v-model="form.meta.tabHidden" />
      </el-form-item>
    </el-form>
    <template #footer>
      <el-button type="primary" @click="save">保存</el-button>
    </template>
  </vab-dialog>
</template>

<script lang="ts" setup>
import type { FormInstance } from 'element-plus'
import { doEdit } from '/@/api/menuManagement'

defineOptions({
  name: 'MenuManagementEdit',
})

const emit = defineEmits(['fetch-data'])
const visible = ref<boolean>(false)
const formRef = ref<FormInstance>()
const form = reactive<any>({
  parentId: '',
  name: '',
  path: '',
  component: '',
  redirect: '',
  meta: {
    title: '',
    icon: '',
    badge: '',
    dot: false,
    hidden: false,
    levelHidden: false,
    isCustomSvg: false,
    noClosable: false,
    noKeepAlive: false,
    tabHidden: false,
    guard: [],
  },
})
const rules = reactive<any>({
  parentId: [{ required: true, trigger: 'blur', message: '请输入父级id' }],
  name: [{ required: true, trigger: 'blur', message: '请输入name' }],
  path: [{ required: true, trigger: 'blur', message: '请输入path' }],
  component: [{ required: true, trigger: 'blur', message: '请输入component' }],
  'meta.title': [{ required: true, trigger: 'blur', message: '请输入标题' }],
})
const title = ref<string>('')
const dialogFormVisible = ref<boolean>(false)

const handleIcon = (item: string) => {
  form.meta.icon = item
  visible.value = false
}

const showEdit = (row: any) => {
  dialogFormVisible.value = true
  nextTick(() => {
    if (row) {
      title.value = '编辑'
      Object.assign(form, row)
    } else {
      title.value = '添加'
      form.meta = {
        title: '',
        icon: '',
        badge: '',
        dot: false,
        hidden: false,
        levelHidden: false,
        isCustomSvg: false,
        noClosable: false,
        noKeepAlive: false,
        tabHidden: false,
        guard: [],
      }
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

<style lang="scss" scoped>
:deep() {
  .el-form-item__content {
    min-width: 200px;

    .el-input {
      width: 200px;
    }
  }
}
</style>
