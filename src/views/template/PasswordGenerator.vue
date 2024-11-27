<template>
  <div class="password-generator-container no-background-container">
    <el-row :gutter="20">
      <el-col :lg="6" :md="12" :sm="12" :xl="6" :xs="24">
        <vab-card>
          <template #header>
            密码生成器
            <el-button class="password-generator-button" type="primary" @click="generatePassword">生成密码</el-button>
          </template>
          <el-form :model="form">
            <el-form-item label="密码长度">
              <el-input-number v-model="form.length" :max="32" :min="6" />
            </el-form-item>

            <el-form-item label="包含大写字母">
              <el-switch v-model="form.includeUppercase" />
            </el-form-item>

            <el-form-item label="包含小写字母">
              <el-switch v-model="form.includeLowercase" />
            </el-form-item>

            <el-form-item label="包含数字">
              <el-switch v-model="form.includeNumbers" />
            </el-form-item>

            <el-form-item label="包含符号">
              <el-switch v-model="form.includeSymbols" />
            </el-form-item>

            <vab-divider />
            <el-form-item label="生成的密码">
              <el-input v-model="generatedPassword" clearable readonly />
            </el-form-item>
          </el-form>
        </vab-card>
      </el-col>
    </el-row>
  </div>
</template>

<script lang="ts" setup>
defineOptions({
  name: 'PasswordGenerator',
})

const form = reactive<any>({
  length: 16,
  includeUppercase: true,
  includeLowercase: true,
  includeNumbers: true,
  includeSymbols: false,
})

const generatedPassword = ref<string>('')

const generatePassword = () => {
  let characters = ''
  let password = ''

  if (form.includeUppercase) {
    characters += 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'
  }
  if (form.includeLowercase) {
    characters += 'abcdefghijklmnopqrstuvwxyz'
  }
  if (form.includeNumbers) {
    characters += '0123456789'
  }
  if (form.includeSymbols) {
    characters += '!@#$%^&*()_+~`|}{[]:;?><,./-='
  }

  for (let i = 0; i < form.length; i++) {
    const randomIndex = Math.floor(Math.random() * characters.length)
    password += characters.charAt(randomIndex)
  }

  generatedPassword.value = password
}
</script>

<style lang="scss" scoped>
.password-generator-container {
  .password-generator-button {
    position: absolute;
    top: 10px;
    right: 10px;
  }

  :deep() {
    .el-form-item {
      display: flex;
      align-items: center;
      justify-content: space-between;

      &__content {
        flex: 0 0 auto;
      }
    }
  }
}
</style>
