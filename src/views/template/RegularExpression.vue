<template>
  <div class="regular-expression-container no-background-container">
    <el-row :gutter="20">
      <el-col :lg="8" :md="12" :sm="24" :xl="8" :xs="24">
        <vab-card title="正则校验">
          <el-form ref="formRef" label-width="100px" :model="form" :rules="rules">
            <el-form-item label="邮箱" prop="email">
              <el-input v-model="form.email" clearable />
            </el-form-item>
            <el-form-item label="手机号码" prop="phone">
              <el-input v-model="form.phone" clearable />
            </el-form-item>
            <el-form-item label="身份证号码" prop="idCard">
              <el-input v-model="form.idCard" clearable />
            </el-form-item>
            <el-form-item label="数字" prop="number">
              <el-input v-model="form.number" clearable />
            </el-form-item>
            <el-form-item label="英文字符" prop="english">
              <el-input v-model="form.english" clearable />
            </el-form-item>
            <el-form-item label="中文字符" prop="chinese">
              <el-input v-model="form.chinese" clearable />
            </el-form-item>
            <el-form-item label="URL" prop="url">
              <el-input v-model="form.url" clearable />
            </el-form-item>
            <el-form-item>
              <el-button type="primary" @click="submitForm">提交</el-button>
              <el-button type="warning" @click="resetForm">重置</el-button>
            </el-form-item>
          </el-form>
        </vab-card>
      </el-col>
    </el-row>
  </div>
</template>

<script lang="ts" setup>
import { isChinese, isEmail, isEnglish, isIdCard, isNumber, isPhone, isUrl } from '/@/utils/validate'

defineOptions({
  name: 'RegularExpression',
})

const formRef: Ref<any> = ref(null)
const form = reactive<any>({
  email: '',
  phone: '',
  idCard: '',
  number: '',
  english: '',
  chinese: '',
  url: '',
})

const validateEmail = (rule: any, value: any, callback: any) => {
  if (isEmail(value)) {
    callback()
  } else {
    callback(new Error('请输入有效的邮箱地址'))
  }
}

const validatePhone = (rule: any, value: any, callback: any) => {
  if (isPhone(value)) {
    callback()
  } else {
    callback(new Error('请输入有效的手机号'))
  }
}

const validateIdCard = (rule: any, value: any, callback: any) => {
  if (isIdCard(value)) {
    callback()
  } else {
    callback(new Error('请输入有效的身份证号'))
  }
}

const validateNumber = (rule: any, value: any, callback: any) => {
  if (isNumber(value)) {
    callback()
  } else {
    callback(new Error('请输入有效的数字'))
  }
}

const validateEnglish = (rule: any, value: any, callback: any) => {
  if (isEnglish(value)) {
    callback()
  } else {
    callback(new Error('请输入有效的英文字符'))
  }
}

const validateChinese = (rule: any, value: any, callback: any) => {
  if (isChinese(value)) {
    callback()
  } else {
    callback(new Error('请输入有效的中文字符'))
  }
}

const validateUrl = (rule: any, value: any, callback: any) => {
  if (isUrl(value)) {
    callback()
  } else {
    callback(new Error('请输入有效的URL'))
  }
}

const rules = reactive<any>({
  email: [
    { required: true, message: '请输入邮箱地址', trigger: 'blur' },
    { validator: validateEmail, trigger: 'blur' },
  ],
  phone: [
    { required: true, message: '请输入手机号码', trigger: 'blur' },
    { validator: validatePhone, trigger: 'blur' },
  ],
  idCard: [
    { required: true, message: '请输入身份证号码', trigger: 'blur' },
    { validator: validateIdCard, trigger: 'blur' },
  ],
  number: [
    { required: true, message: '请输入数字', trigger: 'blur' },
    { validator: validateNumber, trigger: 'blur' },
  ],
  english: [
    { required: true, message: '请输入英文字符', trigger: 'blur' },
    { validator: validateEnglish, trigger: 'blur' },
  ],
  chinese: [
    { required: true, message: '请输入中文字符', trigger: 'blur' },
    { validator: validateChinese, trigger: 'blur' },
  ],
  url: [
    { required: true, message: '请输入URL', trigger: 'blur' },
    { validator: validateUrl, trigger: 'blur' },
  ],
})

const submitForm = () => {
  formRef.value?.validate((valid: boolean) => {
    if (valid) {
      $baseMessage('表单校验通过', 'success', 'hey')
    } else {
      $baseMessage(`表单校验失败`, 'error', 'hey')
    }
  })
}

const resetForm = () => {
  formRef.value?.resetFields()
}
</script>
