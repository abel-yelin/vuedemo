<template>
  <div>
    <div class="pay-top-content">
      <vab-icon class="pay-success" icon="checkbox-circle-line" />
      <p>支付成功</p>
    </div>
    <el-form class="pay-bottom" label-width="100px">
      <el-form-item label="付款账户">
        {{ infoData.payAccount }}
      </el-form-item>
      <el-form-item label="收款账户">
        {{ infoData.gatheringAccount }}
      </el-form-item>
      <el-form-item label="收款人姓名">
        {{ infoData.gatheringName }}
      </el-form-item>
      <el-form-item label="转账金额">
        <strong>￥{{ infoData.price }}元</strong>
      </el-form-item>
    </el-form>
    <div class="pay-button-group">
      <el-button type="primary" @click="handlePrev">再转一笔</el-button>
    </div>
  </div>
</template>

<script lang="ts" setup>
defineOptions({
  name: 'Step3',
})
defineProps({
  infoData: {
    type: Object,
    default: () => {
      return {}
    },
  },
})
const emit = defineEmits(['change-step'])

const handlePrev = () => {
  emit('change-step', 0)
}
</script>

<style lang="scss" scoped>
.pay-top-content {
  text-align: center;

  .pay-success {
    display: block;
    margin: var(--el-margin) auto 5px auto;
    font-size: 40px;
    color: var(--el-color-success);
  }
}

.pay-bottom {
  padding: var(--el-padding);
  margin-top: var(--el-margin);
  background-color: var(--el-color-primary-light-9);
  border: 1px dashed var(--el-border-color);
  border-radius: var(--el-border-radius-base);
}

.pay-button-group {
  display: block;
  margin: var(--el-margin) auto;
  text-align: center;
}
</style>
