<template>
  <div>
    <el-form ref="formRef" label-width="100px" :model="form" :rules="rules" @submit.prevent>
      <el-form-item label="付款账户" prop="payAccount">
        <el-input v-model="form.payAccount" clearable />
      </el-form-item>
      <el-form-item label="收款账户" prop="gatheringAccount">
        <el-input v-model="form.gatheringAccount" clearable />
      </el-form-item>
      <el-form-item label="收款人姓名" prop="gatheringName">
        <el-input v-model="form.gatheringName" clearable />
      </el-form-item>
      <el-form-item label="转账金额" prop="price">
        <el-input v-model="form.price" clearable />
      </el-form-item>
    </el-form>
    <div class="pay-button-group">
      <el-button native-type="submit" type="primary" @click="handleSubmit">下一步</el-button>
    </div>
    <vab-alert>
      <h3>转账到支付宝</h3>
      <p>生活好，支付宝。生活好，支付宝。生活好，支付宝。生活好，支付宝。</p>
      <h3>转账到微信</h3>
      <p>微不可挡，万众一信。微不可挡，万众一信。微不可挡，万众一信。微不可挡，万众一信。</p>
    </vab-alert>
  </div>
</template>

<script lang="ts" setup>
import type { FormInstance } from 'element-plus'

defineOptions({
  name: 'Step1',
})
const emit = defineEmits(['change-step'])

const formRef = ref<FormInstance>()
const form = reactive<any>({
  payAccount: '****************',
  gatheringAccount: '****************',
  gatheringName: '***',
  price: '100',
})
const rules = reactive<any>({
  payAccount: [{ required: true, message: '请选择付款账户', trigger: 'blur' }],
  gatheringAccount: [
    { required: true, message: '请输入收款账户', trigger: 'blur' },
    { required: true, message: '账户名应为邮箱格式', trigger: 'blur' },
  ],
  gatheringName: [{ required: true, message: '请输入收款人姓名', trigger: 'blur' }],
  price: [
    { required: true, message: '请输入转账金额', trigger: 'blur' },
    { pattern: /^(\d+)((?:\.\d+)?)$/, message: '请输入合法金额数字' },
  ],
})

const handleSubmit = () => {
  formRef.value?.validate((valid: any) => {
    if (valid) {
      emit('change-step', 1, form)
    }
  })
}
</script>

<style lang="scss" scoped>
.pay-button-group {
  display: block;
  margin: 20px auto;
  text-align: center;
}
</style>
