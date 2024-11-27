<template>
  <div class="portal-divider">
    <vab-link :class="activeMenu === 'portal' ? 'active' : ''" to="/portal">主页</vab-link>
    <el-divider direction="vertical" />
    <vab-link :class="activeMenu === 'product' ? 'active' : ''" to="/product">产品简介</vab-link>
    <el-divider direction="vertical" />
    <vab-link :class="activeMenu === 'partner' ? 'active' : ''" to="/partner">合作伙伴</vab-link>
    <el-divider direction="vertical" />
    <vab-link to="/index">后台管理</vab-link>
  </div>
</template>

<script lang="ts" setup>
defineOptions({
  name: 'PortalDivider',
})

defineProps({
  activeMenu: {
    type: String,
    default: 'portal',
  },
})
</script>

<style lang="scss" scoped>
.portal-divider {
  display: flex;
  align-items: center;
  justify-content: center;

  a {
    color: var(--el-color-grey);

    &.active {
      color: var(--el-color-primary);
    }
  }
}
</style>
