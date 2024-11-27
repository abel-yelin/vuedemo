<template>
  <vab-dialog v-model="dialogFormVisible" append-to-body :title="title" width="500px" @close="close">
    <el-form ref="formRef" label-width="80px" :model="form" :rules="rules">
      <el-form-item label="商品名称" prop="name">
        <el-input v-model.trim="form.name" disabled />
      </el-form-item>
      <el-form-item label="评论内容" prop="comment">
        <el-input v-model.trim="form.comment" :autosize="{ minRows: 4, maxRows: 12 }" disabled type="textarea" />
      </el-form-item>
      <el-form-item label="回复内容" prop="reply">
        <el-input v-model.trim="form.reply" :autosize="{ minRows: 4, maxRows: 12 }" clearable type="textarea" />
      </el-form-item>
    </el-form>
    <template #footer>
      <el-button type="primary" @click="save">保存</el-button>
    </template>
  </vab-dialog>
</template>

<script lang="ts" setup>
import type { FormInstance } from 'element-plus'
import { doEdit } from '/@/api/goodsComment'

defineOptions({
  name: 'GoodsCommentEdit',
})

const emit = defineEmits(['fetch-data'])

const formRef = ref<FormInstance>()
const title = ref<string>('')
const dialogFormVisible = ref<boolean>(false)
const form = reactive<any>({})
const rules = reactive<any>({})

const showEdit = (row: any) => {
  dialogFormVisible.value = true
  nextTick(() => {
    if (row) {
      title.value = '回复'
      Object.assign(form, row)
      if (form.replyStatus === '未回复') {
        form.reply = ''
      }
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
