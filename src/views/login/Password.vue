<template>
  <login-container>
    <div class="login-form">
      <img alt="" class="left-img" :src="leftImg" />
      <el-form ref="formRef" label-position="left" :model="form" :rules="rules" @submit.prevent>
        <div class="title">hello !</div>
        <div class="title-tips">{{ title }} {{ translate('忘记密码') }}</div>
        <el-form-item prop="username">
          <el-input v-model.trim="form.username" v-focus auto-complete="off" clearable :placeholder="translate('请输入用户名')" type="text">
            <template #prefix>
              <vab-icon icon="user-line" />
            </template>
          </el-input>
        </el-form-item>
        <el-form-item prop="phone">
          <el-input v-model.trim="form.phone" clearable maxlength="11" :placeholder="translate('请输入手机号')" show-word-limit type="text">
            <template #prefix>
              <vab-icon icon="smartphone-line" />
            </template>
          </el-input>
        </el-form-item>
        <el-form-item prop="phoneCode" style="position: relative">
          <el-input v-model.trim="form.phoneCode" :placeholder="translate('请输入手机验证码')" type="text">
            <template #prefix>
              <vab-icon icon="barcode-box-line" />
            </template>
          </el-input>
          <el-button class="phone-code" :disabled="isGetPhone" type="primary" @click="getPhoneCode">
            {{ translate(phoneCode) }}
          </el-button>
        </el-form-item>
        <el-form-item prop="password">
          <el-input v-model.trim="form.password" clearable :placeholder="translate('请输入新密码')" type="password">
            <template #prefix>
              <vab-icon icon="lock-line" />
            </template>
          </el-input>
        </el-form-item>
        <el-form-item prop="password2">
          <el-input v-model.trim="form.password2" clearable :placeholder="translate('请确认新密码')" type="password">
            <template #prefix>
              <vab-icon icon="lock-line" />
            </template>
          </el-input>
        </el-form-item>
        <el-button v-throttle="handleRegister" class="login-btn" :loading="loading" native-type="submit" type="primary">
          {{ translate('修改密码') }}
        </el-button>
        <router-link to="/login">
          <el-button style="margin-top: 20px; margin-left: -10px" type="primary">
            {{ translate('登录') }}
          </el-button>
        </router-link>
        <router-link to="/register">
          <el-button style="margin-top: 20px" text type="primary">
            {{ translate('注册') }}
          </el-button>
        </router-link>
      </el-form>
    </div>
  </login-container>
</template>

<script lang="ts" setup>
import type { FormInstance, FormRules } from 'element-plus'
import { password } from '/@/api/user'
import leftImg from '/@/assets/login_images/left_img_6.png'
import { translate } from '/@/i18n'
import { useSettingsStore } from '/@/store/modules/settings'
import { useUserStore } from '/@/store/modules/user'
import { isPassword, isPhone } from '/@/utils/validate'

defineOptions({
  name: 'Register',
})

interface FormType {
  username: string
  password: string
  password2: string
  phone: string
  verificationCode: string
  phoneCode: string
}

const router = useRouter()
const userStore = useUserStore()
const settingsStore = useSettingsStore()
const { title } = storeToRefs(settingsStore)
const { setToken } = userStore
const loading = ref<boolean>(false)
const formRef = ref<FormInstance>()
const isGetPhone = ref<boolean>(false)
let timer: ReturnType<typeof setInterval>
const phoneCode = ref<any>(translate('获取验证码'))
const form = reactive<FormType>({
  username: '',
  password: '',
  password2: '',
  phone: '',
  verificationCode: '',
  phoneCode: '',
})

const validateUsername = (rule: any, value: any, callback: any) => {
  if ('' === value) callback(new Error(translate('用户名不能为空')))
  else callback()
}
const validatePassword = (rule: any, value: any, callback: any) => {
  if (isPassword(value)) {
    callback()
  } else {
    callback(new Error(translate('密码不能少于6位')))
  }
}

const validatePassword2 = (rule: any, value: any, callback: any) => {
  if (value === form.password) {
    callback()
  } else {
    callback(new Error(translate('请确认新密码')))
  }
}
const validatePhone = (rule: any, value: any, callback: any) => {
  if (isPhone(value)) {
    callback()
  } else {
    callback(new Error(translate('请输入正确的手机号')))
  }
}

const rules = reactive<FormRules<FormType>>({
  username: [
    {
      required: true,
      trigger: 'blur',
      message: translate('请输入用户名'),
    },
    { validator: validateUsername, trigger: 'blur' },
  ],
  phone: [
    {
      required: true,
      trigger: 'blur',
      message: translate('请输入手机号'),
    },
    { validator: validatePhone, trigger: 'blur' },
  ],
  password: [
    {
      required: true,
      trigger: 'blur',
      message: translate('请输入新密码'),
    },
    { validator: validatePassword, trigger: 'blur' },
  ],
  password2: [
    {
      required: true,
      trigger: 'blur',
      message: translate('请确认新密码'),
    },
    { validator: validatePassword2, trigger: 'blur' },
  ],
  phoneCode: [
    {
      required: true,
      trigger: 'blur',
      message: translate('请输入手机验证码'),
    },
  ],
})

const getPhoneCode = () => {
  if (!isPhone(form.phone)) {
    formRef.value?.validateField('phone')
    return
  }
  isGetPhone.value = true
  let n = 60
  timer = setInterval(() => {
    if (n > 0) {
      n--
      phoneCode.value = `${translate('获取验证码 ') + n}s`
    } else {
      clearInterval(timer)
      phoneCode.value = translate('获取验证码')
      isGetPhone.value = false
    }
  }, 1000)
}
const handleRegister = () => {
  formRef.value?.validate(async (valid: any) => {
    if (valid) {
      loading.value = true
      const {
        msg,
        data: { token },
      }: any = await password(form).catch(() => {
        loading.value = false
      })
      $baseConfirm(`${msg}，点击确定模拟进入拥有【admin】角色的首页`, null, async () => {
        loading.value = false
        setToken(token)
        await router.push('/index')
      })
    }
  })
}

onUnmounted(() => {
  clearInterval(timer)
})
</script>
