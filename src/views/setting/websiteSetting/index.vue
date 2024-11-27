<template>
  <div class="website-setting-container no-background-container">
    <el-row :gutter="20">
      <el-col :lg="12" :md="20" :sm="24" :xl="10" :xs="24">
        <vab-card title="网站设置">
          <el-form ref="formRef" label-position="top" :model="form" :rules="formRules" @submit="submitForm">
            <el-form-item label="网站名称" prop="siteName">
              <el-input v-model="form.siteName" clearable />
            </el-form-item>
            <el-form-item label="logo" prop="logo">
              <el-upload v-model:file-list="fileList" action="/uploadFile" drag multiple style="width: 100%">
                <el-icon class="el-icon--upload">
                  <upload-filled />
                </el-icon>
                <div class="el-upload__text">
                  将logo拽至此处或
                  <em>点击上传</em>
                </div>
                <template #tip>
                  <div class="el-upload__tip">jpg/png 文件需小于500kb</div>
                </template>
              </el-upload>
            </el-form-item>
            <el-form-item label="网址" prop="siteUrl">
              <el-input v-model="form.siteUrl" clearable />
            </el-form-item>
            <el-form-item label="META关键词" prop="metaKeywords">
              <el-input v-model="form.metaKeywords" clearable />
            </el-form-item>
            <el-form-item label="META描述" prop="metaDesc">
              <el-input v-model="form.metaDesc" clearable />
            </el-form-item>
            <el-form-item label="版权信息" prop="copyright">
              <el-input v-model="form.copyright" clearable />
            </el-form-item>
            <el-form-item>
              <el-button type="primary" @click="submitForm">保存</el-button>
            </el-form-item>
          </el-form>
        </vab-card>
      </el-col>
    </el-row>
  </div>
</template>

<script lang="ts" setup>
import { UploadFilled } from '@element-plus/icons-vue'
import type { FormInstance, UploadUserFile } from 'element-plus'

defineOptions({
  name: 'WebsiteSetting',
})

interface FormType {
  siteName: string
  siteUrl: string
  metaKeywords: string
  metaDesc: string
  copyright: string
}

const form = reactive<FormType>({
  siteName: 'Vue Shop Vite',
  siteUrl: 'https://vuejs-core.cn/shop-vite',
  metaKeywords: '',
  metaDesc: '',
  copyright: '',
})
const fileList = ref<UploadUserFile[]>([])
const formRef = ref<FormInstance>()
const formRules = reactive<any>({
  siteName: [{ required: true, message: '请输入网站名称', trigger: 'blur' }],
  siteUrl: [
    { required: true, message: '请输入网址', trigger: 'blur' },
    {
      pattern: /^https?:\/\/.*/,
      message: '请输入正确的网址',
      trigger: 'blur',
    },
  ],
  metaKeywords: [{ required: true, message: '请输入META关键词', trigger: 'blur' }],
  metaDesc: [{ required: true, message: '请输入META描述', trigger: 'blur' }],
  copyright: [{ required: true, message: '请输入版权信息', trigger: 'blur' }],
})

const submitForm = () => {
  formRef.value?.validate((valid: boolean) => {
    if (valid) {
      $baseMessage('表单提交成功', 'success', 'hey')
    }
  })
}
</script>
