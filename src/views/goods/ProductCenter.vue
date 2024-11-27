<template>
  <div class="product-center-container">
    <el-row :gutter="20">
      <el-col v-for="(item, index) in list" :key="index" :lg="6" :md="12" :sm="24" :xl="6" :xs="24">
        <vab-card @click="handleOpen">
          <span
            class="icon"
            :style="{
              background: item.background,
            }"
          >
            <vab-icon :icon="item.icon" />
          </span>
          <h4 class="title">{{ item.title }}</h4>
          <p class="description">{{ item.description }}</p>
        </vab-card>
      </el-col>
      <el-col :lg="12" :md="12" :sm="12" :xl="12" :xs="12" />
    </el-row>
  </div>
</template>

<script lang="ts" setup>
defineOptions({
  name: 'ProductCenter',
})

const list = ref<any>([
  {
    icon: 'secure-payment-line',
    title: 'API支付',
    description: '商户调用API接口，调起支付模块收款',
    url: '',
    background: 'var(--el-color-primary)',
  },
  {
    icon: 'app-store-line',
    title: 'APP支付',
    description: '用户在APP中发起支付',
    url: '',
    background: 'var(--el-color-success)',
  },
  {
    icon: 'terminal-window-line',
    title: 'Native支付',
    description: '商户系统按支付协议生成支付二维码，用户扫码支付',
    url: '',
    background: 'var(--el-color-warning)',
  },
  {
    icon: 'barcode-box-line',
    title: '付款码支付',
    description: '用户打开钱包付款卡页面，商户扫码完成支付',
    url: '',
    background: 'var(--el-color-danger)',
  },
  {
    icon: 'html5-line',
    title: 'H5支付',
    description: '在客户端外的移动端网页使用支付',
    url: '',
    background: '#20C2DC',
  },
  {
    icon: 'map-pin-user-line',
    title: '刷脸支付',
    description: '用户在支持刷脸支付的机器上，可以刷脸完成支付',
    url: '',
    background: '#F7753F',
  },
  {
    icon: 'money-cny-box-line',
    title: '现金红包',
    description: '用户领取红包后，金额直接进入支付钱包',
    url: '',
    background: '#6A59F4',
  },
  {
    icon: 'money-cny-circle-line',
    title: '预充值代金券',
    description: '先领券再核销，优惠金额来自预充值的营销经费',
    url: '',
    background: '#5B38B9',
  },
  {
    icon: 'money-dollar-box-line',
    title: '预充值立减与折扣',
    description: '支付中直接减价，优惠金额来自商户预充值的营销经费 ',
    url: '',
    background: '#F46E53',
  },
  {
    icon: 'bank-card-2-line',
    title: '企业付款到个人银行卡',
    description: '企业向指定银行卡付款，付款资金将直接进入收款银行账户',
    url: '',
    background: '#6A59F4',
  },
  {
    icon: 'bank-card-line',
    title: '企业付款到零钱',
    description: '企业向个人付款，付款资金将直接进入用户零钱',
    url: '',
    background: '#2A7BFF',
  },
  {
    icon: 'mastercard-line',
    title: '商家转账到零钱',
    description: '可通过该功能批量向用户的零钱进行转账',
    url: '',
    background: '#EB6D0B',
  },
  {
    icon: 'bilibili-line',
    title: '品牌',
    description: '品牌是支付为「品牌商家」定制的行业解决方案',
    url: '',
    background: '#138EEE',
  },
  {
    icon: 'bill-line',
    title: '免充值代金券',
    description: '用户先领券再核销，优惠金额从商户订单实收中扣减',
    url: '',
    background: '#21DF97',
  },
  {
    icon: 'coupon-3-line',
    title: '免充值立减与折扣',
    description: '用户满足营销规则，支付中直接减价，优惠金额从商户订单实收中扣',
    url: '',
    background: '#FF3256',
  },
  {
    icon: 'bookmark-2-line',
    title: '小程序红包',
    description: '商户发放红包，用户在小程序页面领取',
    url: '',
    background: 'var(--el-color-primary)',
  },
  {
    icon: 'share-line',
    title: '数据推送',
    description: '商户可在移动端公众号收到经营数据的推送',
    url: '',
    background: 'var(--el-color-success)',
  },
  {
    icon: 'hand-heart-line',
    title: '电子发票',
    description: '商户快速向用户开具电子发票，并插用户的卡包',
    url: '',
    background: 'var(--el-color-warning)',
  },
  {
    icon: 'wechat-pay-line',
    title: '支付即服务',
    description: '支付后为用户推送服务人员名片，搭建商家和用户连接的桥梁',
    url: '',
    background: 'var(--el-color-danger)',
  },
  {
    icon: 'shake-hands-line',
    title: '品牌零售联合活动',
    description: '品牌可以发布加价购等单品活动，大卖场/小商家可报名参与活动。',
    url: '',
    background: '#20C2DC',
  },
])

const handleOpen = () => {
  $baseAlert('开通成功')
}
</script>

<style lang="scss" scoped>
.product-center-container {
  :deep() {
    .el-card__body {
      position: relative;
      display: block;
      padding-left: 98px;
      cursor: pointer;

      .icon {
        position: absolute;
        left: var(--el-margin);
        display: flex;
        align-items: center;
        justify-content: center;
        width: 58px;
        height: 58px;
        overflow: hidden;
        color: var(--el-color-white);
        background: var(--el-color-primary);
        border-radius: var(--el-border-radius-base);

        [class*='ri-'] {
          font-size: 32px;
        }
      }

      .title {
        padding-top: 8px;
        margin: 0 48px 4px 0;
        overflow: hidden;
        font-size: var(--el-font-size-normal);
        color: var(--el-color-grey);
        text-overflow: ellipsis;
        white-space: nowrap;
      }

      .description {
        overflow: hidden;
        font-size: var(--el-font-size-extra-small);
        color: var(--el-color-grey);
        text-overflow: ellipsis;
        white-space: nowrap;
      }
    }
  }
}
</style>
