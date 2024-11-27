<template>
  <div class="default-table-detail-container">
    <el-page-header :content="'【' + route.query.title + '】详情页'" @back="goBack" />
    <el-alert
      :closable="false"
      title="默认表格、左树右表、分类表格、自定义表格、分割表格共用的详情页demo，所有表格都会跳转详情至此页面，当前详情页允许多开。"
    />
    <el-form inline :model="form" @submit.prevent>
      <el-form-item label="输入框缓存">
        <el-input v-model="form.text" clearable style="width: 200px" />
      </el-form-item>
      <el-form-item>
        <el-dropdown @command="handleRefreshMainPage">
          <span class="el-dropdown-link">
            <el-button :icon="Refresh" type="primary">
              选择要刷新的表格
              <el-icon class="el-icon--right"><arrow-down /></el-icon>
            </el-button>
          </span>
          <template #dropdown>
            <el-dropdown-menu>
              <el-dropdown-item command="DefaultTable">默认表格</el-dropdown-item>
              <el-dropdown-item command="ColumnTable">左树右表</el-dropdown-item>
              <el-dropdown-item command="TabsTable">分类表格</el-dropdown-item>
              <el-dropdown-item command="CustomTable">自定义表格</el-dropdown-item>
              <el-dropdown-item command="SplitTable">分割表格</el-dropdown-item>
            </el-dropdown-menu>
          </template>
        </el-dropdown>
      </el-form-item>
      <el-form-item>
        <el-dropdown @command="handleActiveMenu">
          <span class="el-dropdown-link">
            <el-button :icon="Refresh" type="primary">
              选择要高亮菜单的表格
              <el-icon class="el-icon--right"><arrow-down /></el-icon>
            </el-button>
          </span>
          <template #dropdown>
            <el-dropdown-menu>
              <el-dropdown-item command="/vab/table/defaultTable">默认表格</el-dropdown-item>
              <el-dropdown-item command="/vab/table/columnTable">左树右表</el-dropdown-item>
              <el-dropdown-item command="/vab/table/tabsTable">分类表格</el-dropdown-item>
              <el-dropdown-item command="/vab/table/customTable">自定义表格</el-dropdown-item>
              <el-dropdown-item command="/vab/table/splitTable">分割表格</el-dropdown-item>
            </el-dropdown-menu>
          </template>
        </el-dropdown>
      </el-form-item>
    </el-form>

    <el-descriptions border :column="2" title="详情">
      <el-descriptions-item>
        <template #label>标题</template>
        {{ route.query.title }}
      </el-descriptions-item>
      <el-descriptions-item>
        <template #label>作者</template>
        {{ route.query.author }}
      </el-descriptions-item>
      <el-descriptions-item>
        <template #label>时间</template>
        {{ route.query.datetime }}
      </el-descriptions-item>
      <el-descriptions-item>
        <template #label>评级</template>
        <el-rate v-model="rate" disabled />
      </el-descriptions-item>
      <el-descriptions-item>
        <template #label>备注</template>
        {{ route.query.description }}
      </el-descriptions-item>
    </el-descriptions>
  </div>
</template>

<script lang="ts" setup>
import { ArrowDown, Refresh } from '@element-plus/icons-vue'
import { useRoutesStore } from '/@/store/modules/routes'
import { useTabsStore } from '/@/store/modules/tabs'
import { handleActivePath } from '/@/utils/routes'

defineOptions({
  name: 'DefaultTableDetail',
})

const route: any = useRoute()

const tabsStore = useTabsStore()
const { changeTabsMeta, delVisitedRoute } = tabsStore
const form = reactive<any>({ text: '' })
const routesStore = useRoutesStore()
const { changeActiveMenu } = routesStore
const rate = ref<number>(Number.parseInt(route.query.rate))

const goBack = async () => {
  await delVisitedRoute(handleActivePath(route, true))
  history.back()
}

const handleRefreshMainPage = (name: string) => {
  $pub('reload-router-view', name)
}

const handleActiveMenu = (activeMenu: string) => {
  changeActiveMenu(activeMenu)
}

onMounted(() => {
  changeTabsMeta({
    title: '详情页',
    meta: {
      title: `${route.query.title} 详情页`,
    },
  })
})
</script>

<style lang="scss" scoped>
.default-table-detail-container {
  :deep() {
    .el-form--inline {
      .el-form-item {
        margin-right: 10px;
      }
    }

    .el-descriptions__label {
      min-width: 80px !important;
      text-align: right;
    }
  }
}
</style>
