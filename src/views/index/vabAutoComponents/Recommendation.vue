<template>
  <vab-card>
    <template #header>
      <vab-icon icon="reserved-line" />
      经营建议
    </template>

    <el-row :gutter="20">
      <el-col v-for="(item, index) in iconList" :key="index" :lg="6" :md="8" :sm="8" :xl="6" :xs="24">
        <vab-link :to="item.link">
          <vab-card class="icon-panel">
            <el-badge class="item" :value="item.value">
              <vab-icon :icon="item.icon" />
            </el-badge>
            <div class="icon-panel-title">
              {{ item.title }}
              <div class="icon-panel-tips">{{ item.tips }}</div>
            </div>
          </vab-card>
        </vab-link>
      </el-col>
    </el-row>
  </vab-card>
</template>

<script lang="ts" setup>
interface iconListType {
  icon: string
  title: string
  tips: string
  value?: number
  link: string
}

const iconList = ref<iconListType[]>([
  {
    icon: 'bank-line',
    title: '工商建议',
    tips: '工商建议快捷入口',
    value: 1,
    link: '',
  },
  {
    icon: 'copyright-line',
    title: '商标管理',
    tips: '商标管理快捷入口',
    link: '',
  },
  {
    icon: 'book-3-line',
    title: '专利查询',
    tips: '专利查询快捷入口',
    link: '',
  },
  {
    icon: 'check-double-line',
    title: '著作权查询',
    tips: '著作权查询快捷入口',
    link: '',
  },
  {
    icon: 'codepen-line',
    title: '证照管理',
    tips: '证照管理快捷入口',
    link: '',
  },
  {
    icon: 'discuss-line',
    title: '纳税提醒',
    tips: '纳税提醒快捷入口',
    link: '',
  },
  {
    icon: 'emotion-unhappy-line',
    title: '违规查询',
    tips: '违规查询快捷入口',
    link: '',
  },
  {
    icon: 'apps-2-line',
    title: '全部应用',
    tips: '全部应用快捷入口',
    link: '',
  },
])
</script>

<style lang="scss" scoped>
.icon-panel {
  margin-bottom: 8px;
  cursor: pointer;
  border: 0 !important;

  :deep() {
    .el-card__body {
      height: 65px;
      padding: 10px;

      &:hover {
        i {
          color: var(--el-color-white);
          background: var(--el-color-primary);
        }
      }

      i {
        display: inline-block;
        width: 50px;
        height: 50px;
        font-size: 30px;
        line-height: 50px;
        color: var(--el-color-primary);
        background: var(--el-color-primary-light-9);
        border-radius: var(--el-border-radius-base);
        transition: all ease-in-out 0.3s;
      }

      .icon-panel-title {
        display: inline-block;
        padding-top: 10px;
        margin-left: 10px;
        vertical-align: -10px;

        .icon-panel-tips {
          margin-top: 5px;
          font-size: var(--el-font-size-extra-small);
          color: var(--el-color-grey);
        }
      }
    }
  }
}
</style>
