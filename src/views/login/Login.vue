<template>
  <login-container>
    <div class="login-form">
      <img alt="" class="left-img" :src="leftImg" />
      <el-form ref="formRef" label-position="left" :model="form" :rules="rules" @submit.prevent>
        <div class="title">hello !</div>
        <div class="title-tips">{{ translate('欢迎来到') }} {{ title }}</div>
        <el-form-item prop="username">
          <el-input v-model.trim="form.username" v-focus clearable :placeholder="translate('请输入用户名')" type="text">
            <template #prefix>
              <vab-icon icon="user-line" />
            </template>
          </el-input>
        </el-form-item>
        <el-form-item prop="password">
          <el-input
            ref="passwordRef"
            v-model.trim="form.password"
            clearable
            :placeholder="translate('请输入密码')"
            show-password
            :type="passwordType"
          >
            <template #prefix>
              <vab-icon icon="lock-line" />
            </template>
          </el-input>
        </el-form-item>
        <!-- 验证码验证逻辑需自行开发，如不需要验证码功能建议注释 -->
        <el-form-item prop="verificationCode">
          <el-input v-model.trim="form.verificationCode" :placeholder="translate('验证码') + previewText" type="text">
            <template #prefix>
              <vab-icon icon="barcode-box-line" />
            </template>
          </el-input>
          <img class="code" :src="codeUrl" @click="changeCode" />
        </el-form-item>
        <el-button v-throttle="handleLogin" class="login-btn" :loading="loading" type="primary">
          {{ translate('登录') }}
        </el-button>
        <router-link to="/register">
          <el-button style="margin-top: 20px; margin-left: -10px" type="primary">
            {{ translate('注册') }}
          </el-button>
        </router-link>
        <router-link to="/password">
          <el-button style="margin-top: 20px" text type="primary">
            {{ translate('忘记密码') }}
          </el-button>
        </router-link>

        <div v-throttle="handleLogin" class="login-other hidden-xs-only">
          <vab-icon icon="wechat-fill" style="color: #08c25f" />
          <vab-icon icon="alipay-fill" style="color: #226bf3" />
          <vab-icon icon="dingding-fill" style="color: #007ef8" />
          <vab-icon icon="qq-fill" style="color: #009dff" />
          <vab-icon icon="tiktok-fill" style="color: #000000" />
          <vab-icon icon="weibo-fill" style="color: #df1e33" />
          <vab-icon icon="github-fill" style="color: #151515" />
        </div>
      </el-form>
    </div>
  </login-container>
</template>

<script lang="ts" setup>
import type { FormInstance, FormRules, InputInstance } from 'element-plus'
import leftImg from '/@/assets/login_images/left_img_1.png'
import { translate } from '/@/i18n'
import { useSettingsStore } from '/@/store/modules/settings'
import { useUserStore } from '/@/store/modules/user'
import { isPassword } from '/@/utils/validate'

defineOptions({
  name: 'Login',
})

interface FormType {
  username: string
  password: string
  verificationCode: string
}

const route = useRoute()
const router = useRouter()
const userStore = useUserStore()
const settingsStore = useSettingsStore()
const { title } = storeToRefs(settingsStore)
const login = (form: FormType) => userStore.login(form)
const loading = ref<boolean>(false)
const passwordType = ref<string>('password')
const redirect = ref<any>(undefined)
let timer: ReturnType<typeof setInterval>
const codeUrl = ref<string>('https://www.oschina.net/action/user/captcha')
const previewText = ref<string>('')
const formRef = ref<FormInstance>()
const passwordRef = ref<InputInstance>()

const form = reactive<FormType>({
  username: '',
  password: '',
  verificationCode: '',
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

const rules = reactive<FormRules<FormType>>({
  username: [
    {
      required: true,
      trigger: 'blur',
      validator: validateUsername,
    },
  ],
  password: [
    {
      required: true,
      trigger: 'blur',
      validator: validatePassword,
    },
  ],
})

const handleRoute = () => {
  return redirect.value === '/404' || redirect.value === '/403' ? '/' : redirect.value
}

const handleLogin = async () => {
  if (formRef.value)
    formRef.value?.validate(async (valid: any) => {
      if (valid)
        try {
          loading.value = true
          await login(form).catch(() => {
            loading.value = false
          })
          await router.push(handleRoute())
        } finally {
          loading.value = false
        }
    })
}
const changeCode = () => {
  codeUrl.value = `https://www.oschina.net/action/user/captcha?timestamp=${Date.now()}`
}

onBeforeMount(() => {
  form.username = 'admin'
  form.password = '123456'
  // 为了演示效果，会在官网演示页自动登录到首页，正式开发可删除
  if (location.hostname.includes('vuejs-core')) {
    previewText.value = '（演示地址验证码可不填）'
    timer = setTimeout(() => {
      handleLogin()
    }, 1000 * 10)
  }
})

watchEffect(() => {
  redirect.value = (route.query && route.query.redirect) || '/'
})

onBeforeRouteLeave((to, from, next) => {
  try {
    if (timer) clearTimeout(timer)
  } catch {
    /* empty */
  }

  next()
})
</script>

<style lang="scss" scoped>
.login-other {
  position: absolute;
  right: 0;
  display: inline-block;
  height: 32px;
  margin-top: var(--el-margin);
  margin-right: 4.5vh;
  line-height: 32px;

  :deep() {
    [class*='ri-'] {
      margin-left: calc(var(--el-margin) / 2);
      font-size: var(--el-font-size-large);
    }
  }
}
</style>
