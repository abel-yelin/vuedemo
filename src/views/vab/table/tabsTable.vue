<template>
  <div class="tabs-table-container no-background-container">
    <el-tabs v-model="activeName" type="border-card" @tab-click="handleClick">
      <el-tab-pane label="当前" name="first">
        <vab-query-form>
          <vab-query-form-top-panel>
            <el-form inline :model="queryForm" @submit.prevent>
              <el-form-item label="分类">
                <el-check-tag :checked="queryForm.checked1" @change="onChange1">分类一</el-check-tag>
                <el-check-tag :checked="queryForm.checked2" @change="onChange2">分类二</el-check-tag>
                <el-check-tag :checked="queryForm.checked3" @change="onChange3">分类三</el-check-tag>
                <el-check-tag :checked="queryForm.checked4" @change="onChange4">分类四</el-check-tag>
              </el-form-item>
            </el-form>
          </vab-query-form-top-panel>
          <vab-query-form-left-panel :span="24">
            <el-button :icon="Plus" type="primary" @click="handleAdd">添加</el-button>
            <el-button :icon="Delete" type="danger" @click="handleDelete">删除</el-button>
            <el-button type="primary" @click="handleDetail">详情</el-button>
            <el-button class="hidden-xs-only" type="primary" @click="handleDetailStayTable">后台打开详情</el-button>
          </vab-query-form-left-panel>
        </vab-query-form>

        <el-table ref="tableRef" v-loading="listLoading" border :data="list" @selection-change="setSelectRows">
          <el-table-column type="selection" width="38" />
          <el-table-column align="center" label="序号" width="55">
            <template #default="{ $index }">
              {{ $index + 1 }}
            </template>
          </el-table-column>
          <el-table-column align="center" label="序号" width="55">
            <template #default="{ $index }">
              {{ $index + 1 }}
            </template>
          </el-table-column>
          <el-table-column align="center" label="标题" min-width="200" prop="title" />
          <el-table-column align="center" label="作者" prop="author" />
          <el-table-column align="center" label="评级" min-width="200">
            <template #default="{ row }">
              <el-rate v-model="row.rate" disabled />
            </template>
          </el-table-column>
          <el-table-column align="center" label="数量" min-width="100" prop="count" sortable />
          <el-table-column align="center" label="开关" prop="switch">
            <template #default="{ row }">
              <el-switch v-model="row.switch" />
            </template>
          </el-table-column>
          <el-table-column align="center" label="状态" min-width="100">
            <template #default="{ row }">
              <el-tag effect="dark" :type="statusFilter(row.status)">
                {{ row.status }}
              </el-tag>
            </template>
          </el-table-column>
          <el-table-column align="center" label="时间" min-width="160" prop="datetime" />
          <el-table-column align="center" label="操作" width="215">
            <template #default="{ row }">
              <el-button text type="primary" @click="handleDetail(row)">详情</el-button>
              <el-button text type="primary" @click="handleEdit(row)">编辑</el-button>
              <el-button text type="danger" @click="handleDelete(row)">删除</el-button>
            </template>
          </el-table-column>
          <template #empty>
            <el-empty class="vab-data-empty" description="暂无数据" />
          </template>
        </el-table>
        <vab-pagination
          :current-page="queryForm.pageNo"
          :page-size="queryForm.pageSize"
          :total="total"
          @current-change="handleCurrentChange"
          @size-change="handleSizeChange"
        />
        <default-table-edit ref="editRef" @fetch-data="fetchData" />
      </el-tab-pane>
      <el-tab-pane label="其他" name="second">
        <el-empty class="vab-data-empty" description="暂无数据" />
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script lang="ts" setup>
import { Delete, Plus } from '@element-plus/icons-vue'
import type { TableInstance } from 'element-plus'
import { doDelete, getList } from '/@/api/table'
import { useRoutesStore } from '/@/store/modules/routes'
import { useTabsStore } from '/@/store/modules/tabs'
import { handleMatched, handleTabs } from '/@/utils/routes'

defineOptions({
  name: 'TabsTable',
})

const activeName = ref<string>('first')
const router = useRouter()

const routesStore = useRoutesStore()
const { getAllRoutes: allRoutes } = storeToRefs(routesStore)
const tabsStore = useTabsStore()
const { changeTabsMeta, addVisitedRoute } = tabsStore
const editRef = ref<any>(null)
const tableRef = ref<TableInstance>()
const list = ref<any>([])
const listLoading = ref<boolean>(true)

const total = ref<number>(0)
const selectRows = ref<any>([])
const queryForm = reactive<any>({
  pageNo: 1,
  pageSize: 20,
  checked1: true,
  checked2: false,
  checked3: false,
  checked4: false,
})

const onChange1 = (status: boolean) => {
  queryForm.checked1 = status
  queryData()
}
const onChange2 = (status: boolean) => {
  queryForm.checked2 = status
  queryData()
}
const onChange3 = (status: boolean) => {
  queryForm.checked3 = status
  queryData()
}
const onChange4 = (status: boolean) => {
  queryForm.checked4 = status
}

const handleClick = () => {
  queryData()
}

const fetchData = async () => {
  listLoading.value = true
  const { data } = await getList(queryForm)
  list.value = data.list
  total.value = data.total
  listLoading.value = false
}

const handleSizeChange = (value: number) => {
  queryForm.pageNo = 1
  queryForm.pageSize = value
  fetchData()
}

const handleCurrentChange = (value: number) => {
  queryForm.pageNo = value
  fetchData()
}

const queryData = () => {
  queryForm.pageNo = 1
  fetchData()
}

const statusFilter = (status: string | number) => {
  const statusMap: any = {
    published: 'success',
    draft: 'primary',
    deleted: 'danger',
  }
  return statusMap[status]
}

const setSelectRows = (value: string) => {
  selectRows.value = value
}

const handleAdd = () => {
  editRef.value.showEdit()
}

const handleEdit = (row = {}) => {
  editRef.value.showEdit(row)
}

const handleDelete = (row: any) => {
  if (row.id) {
    $baseConfirm('您确定要删除当前项吗', null, async () => {
      const { msg }: any = await doDelete({ ids: row.id })
      $baseMessage(msg, 'success', 'hey')
      await fetchData()
    })
  } else {
    if (selectRows.value.length > 0) {
      const ids = selectRows.value.map((item: { id: any }) => item.id).join(',')
      $baseConfirm('您确定要删除选中项吗', null, async () => {
        const { msg }: any = await doDelete({ ids })
        $baseMessage(msg, 'success', 'hey')
        await fetchData()
      })
    } else {
      $baseMessage('您未选中任何行', 'warning', 'hey')
    }
  }
}

const handleDetailStayTable = async () => {
  if (selectRows.value.length > 0)
    for (let i = 0; i < selectRows.value.length; i++) {
      const matched = handleMatched(allRoutes.value, '/vab/table/defaultTableDetail')
      const tab = handleTabs({
        ...matched.at(-1),
        query: selectRows.value[i],
      })
      if (tab) {
        await addVisitedRoute(tab)
        await changeTabsMeta({
          title: '详情页',
          meta: {
            title: `${tab.query.title} 详情页`,
          },
        })
      }
    }
  else $baseMessage('请至少选择一行进行详情页跳转', 'warning', 'hey')
}

const handleDetail = (row: any) => {
  if (row.id)
    router.push({
      path: '/vab/table/defaultTableDetail',
      query: {
        ...row,
        timestamp: Date.now(), //允许同一个详情页同时打开多次，否则会触发路由被缓存下次无法刷新的bug
      },
    })
  else {
    if (selectRows.value.length === 1)
      router.push({
        path: '/vab/table/defaultTableDetail',
        query: {
          ...selectRows.value[0],
          timestamp: Date.now(), //允许同一个详情页同时打开多次，否则会触发路由被缓存下次无法刷新的bug
        },
      })
    else $baseMessage('请选择一行进行详情页跳转', 'warning', 'hey')
  }
}

onActivated(() => {
  tableRef.value?.doLayout()
})

onBeforeMount(() => {
  fetchData()
})
</script>

<style lang="scss" scoped>
.tabs-table-container {
  :deep() {
    .el-tabs {
      border-radius: var(--el-border-radius-base);

      &__header {
        border-top-left-radius: var(--el-border-radius-base);
        border-top-right-radius: var(--el-border-radius-base);
      }

      &__nav-wrap {
        border-radius: var(--el-border-radius-base);
      }

      .el-tab-pane {
        display: flex;
        flex-direction: column;
        height: calc(var(--el-container-height) - var(--el-padding) - 52px) !important;

        .vab-query-form {
          .el-form {
            .el-form-item:first-child {
              margin: 0 !important;

              .el-check-tag,
              .el-form-item__label {
                margin: 0 10px 5px 0;
                border-radius: 99px;
              }
            }
          }
        }

        .el-table {
          flex: 1;
        }
      }
    }
  }
}
</style>
