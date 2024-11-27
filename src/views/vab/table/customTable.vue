<template>
  <div class="custom-table-container auto-height-container" :class="{ 'fullscreen-container': isFullscreen }">
    <vab-query-form>
      <vab-query-form-top-panel>
        <el-form inline :model="queryForm" @submit.prevent>
          <el-form-item label="标题">
            <el-input v-model="queryForm.title" clearable placeholder="请输入标题" />
          </el-form-item>
          <el-form-item v-show="!fold" label="作者">
            <el-input v-model="queryForm.author" clearable placeholder="请输入作者" />
          </el-form-item>
          <el-form-item v-show="!fold" label="时间">
            <el-date-picker v-model="queryForm.datetime" format="YYYY/MM/DD HH:mm:ss" placeholder="请选择时间" type="datetime" />
          </el-form-item>
          <el-form-item v-show="!fold" label="状态">
            <el-select v-model="queryForm.status" placeholder="请选择状态">
              <el-option label="success" value="published" />
              <el-option label="primary" value="draft" />
              <el-option label="danger" value="deleted" />
            </el-select>
          </el-form-item>
          <el-form-item>
            <el-button :icon="Search" :loading="listLoading" native-type="submit" type="primary" @click="queryData">查询</el-button>
            <el-button class="hidden-xs-only" text type="primary" @click="handleFold">
              <span v-if="fold">展开</span>
              <span v-else>合并</span>
              <vab-icon class="vab-dropdown" :class="{ 'vab-dropdown-active': fold }" icon="arrow-up-s-line" />
            </el-button>
          </el-form-item>
        </el-form>
      </vab-query-form-top-panel>
      <vab-query-form-left-panel>
        <el-button :icon="Plus" type="primary" @click="handleAdd">添加</el-button>
        <el-button :icon="Delete" type="danger" @click="handleDelete">删除</el-button>
        <el-button type="primary" @click="handleDetail">详情</el-button>
        <el-button class="hidden-xs-only" type="primary" @click="handleDetailStayTable">后台打开详情</el-button>
      </vab-query-form-left-panel>
      <vab-query-form-right-panel>
        <div class="custom-table-right-tools">
          <el-button class="hidden-xs-only">
            <el-checkbox v-model="stripe" label="斑马纹" />
          </el-button>
          <el-button class="hidden-xs-only">
            <el-checkbox v-model="border" label="边框" />
          </el-button>
          <el-button @click="queryData">
            <vab-icon icon="refresh-line" />
          </el-button>
          <el-button @click="clickFullScreen">
            <vab-icon :icon="isFullscreen ? 'fullscreen-exit-fill' : 'fullscreen-fill'" />
          </el-button>
          <el-popover :width="165">
            <el-radio-group v-model="lineHeight">
              <el-radio-button label="large" value="large">大</el-radio-button>
              <el-radio-button label="default" value="default">中</el-radio-button>
              <el-radio-button label="small" value="small">小</el-radio-button>
            </el-radio-group>
            <template #reference>
              <el-button>
                <vab-icon icon="line-height" />
              </el-button>
            </template>
          </el-popover>
          <el-popover popper-class="custom-table-checkbox">
            <template #reference>
              <el-button>
                <vab-icon icon="settings-line" />
              </el-button>
            </template>
            <vab-draggable v-model="columns" :animation="600" target=".el-checkbox-group">
              <el-checkbox-group v-model="checkList">
                <el-checkbox
                  v-for="item in columns"
                  :key="item.label"
                  :disabled="item.disableCheck"
                  :label="item.label"
                  :value="item.label"
                >
                  {{ item.label }}
                </el-checkbox>
              </el-checkbox-group>
            </vab-draggable>
          </el-popover>
        </div>
      </vab-query-form-right-panel>
    </vab-query-form>

    <el-table
      ref="tableRef"
      v-loading="listLoading"
      :border="border"
      :data="list"
      :size="lineHeight"
      :stripe="stripe"
      @selection-change="setSelectRows"
    >
      <el-table-column type="selection" width="38" />
      <el-table-column align="center" label="序号" width="55">
        <template #default="{ $index }">
          {{ $index + 1 }}
        </template>
      </el-table-column>
      <el-table-column
        v-for="(item, index) in finallyColumns"
        :key="index"
        align="center"
        :fixed="item.fixed"
        :label="item.label"
        :min-width="item.minWidth || 100"
        :prop="item.prop"
        show-overflow-tooltip
        :sortable="item.sortable"
      >
        <template #default="{ row }">
          <span v-if="item.label === '评级'">
            <el-rate v-model="row.rate" disabled />
          </span>
          <el-popover v-if="item.label === '图片'" placement="top-start">
            <el-image :src="row.image" />
            <template #reference>
              <el-image :src="row.image" />
            </template>
          </el-popover>
          <span v-else>{{ row[item.prop] }}</span>
        </template>
      </el-table-column>

      <el-table-column align="center" :fixed="fixed" label="操作" width="215">
        <template #header>
          <el-checkbox v-model="fixed" label="固定操作列" true-value="right" />
        </template>
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
  </div>
</template>

<script lang="ts" setup>
import { Delete, Plus, Search } from '@element-plus/icons-vue'
import type { TableInstance } from 'element-plus'
import { VueDraggable as VabDraggable } from 'vue-draggable-plus'
import { doDelete, getList } from '/@/api/table'
import { useRoutesStore } from '/@/store/modules/routes'
import { useTabsStore } from '/@/store/modules/tabs'
import { handleMatched, handleTabs } from '/@/utils/routes'

defineOptions({
  name: 'CustomTable',
})

const router = useRouter()
const routesStore = useRoutesStore()
const { getAllRoutes: allRoutes } = storeToRefs(routesStore)
const tabsStore = useTabsStore()
const { changeTabsMeta, addVisitedRoute } = tabsStore
const tableRef = ref<TableInstance>()
const fold = ref<boolean>(true)
const editRef = ref<any>(null)
const border = ref<boolean>(true)
const stripe = ref<boolean>(false)
const lineHeight = ref<any>('default')
const isFullscreen = ref<boolean>(false)
const list = ref<any>([])
const listLoading = ref<boolean>(true)
const total = ref<number>(0)
const selectRows = ref<any>([])
const columns = ref<any>([
  {
    label: 'id',
    prop: 'id',
    sortable: true,
    checked: true,
    minWidth: 200,
  },
  {
    label: '标题',
    prop: 'title',
    sortable: true,
    disableCheck: true,
    checked: true,
    minWidth: 200,
  },
  {
    label: '图片',
    prop: 'title',
    checked: true,
    minWidth: 100,
  },
  {
    label: '作者',
    prop: 'author',
    sortable: true,
    checked: true,
    minWidth: 100,
  },
  {
    label: '评级',
    prop: 'rate',
    sortable: true,
    checked: true,
    minWidth: 200,
  },
  {
    label: '数量',
    prop: 'count',
    sortable: true,
    checked: true,
    minWidth: 100,
  },
  {
    label: '时间',
    prop: 'datetime',
    sortable: true,
    checked: true,
    minWidth: 160,
  },
  {
    label: '描述',
    prop: 'description',
    sortable: true,
    checked: true,
    minWidth: 400,
  },
])
const checkList = ref<any>([])
const queryForm = reactive<any>({
  pageNo: 1,
  pageSize: 20,
  title: '',
})
const fixed = ref<string>('right')
const { exit, enter, isFullscreen: _isFullscreen } = useFullscreen()

const finallyColumns = computed(() => columns.value.filter((item: any) => checkList.value.includes(item.label)))

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

const clickFullScreen = () => {
  isFullscreen.value = !isFullscreen.value
  isFullscreen.value ? enter() : exit()
}

const setSelectRows = (value: any) => {
  selectRows.value = value
}

const handleFold = () => {
  fold.value = !fold.value
}

const handleAdd = () => {
  editRef.value.showEdit()
}

const handleEdit = (row: any) => {
  editRef.value.showEdit(row)
}

const handleDelete = (row: any) => {
  if (row.id) {
    $baseConfirm('您确定要删除当前项吗', null, async () => {
      const { msg }: any = await doDelete({ ids: row.id })
      $baseMessage(msg, 'success', 'vab-hey-message-success')
      await fetchData()
    })
  } else {
    if (selectRows.value.length > 0) {
      const ids = selectRows.value.map((item: any) => item.id).join(',')
      $baseConfirm('您确定要删除选中项吗', null, async () => {
        const { msg }: any = await doDelete({ ids })
        $baseMessage(msg, 'success', 'vab-hey-message-success')
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

watch(
  _isFullscreen,
  () => {
    if (_isFullscreen.value) isFullscreen.value = true
    else isFullscreen.value = false
  },
  { immediate: true }
)

onActivated(() => {
  tableRef.value?.doLayout()
})

onBeforeMount(() => {
  columns.value.forEach((item: any) => {
    if (item.checked) checkList.value.push(item.label)
  })
  fetchData()
})
</script>

<style lang="scss" scoped>
.custom-table-container {
  .custom-table-right-tools {
    display: flex;
    align-items: center;
  }
}
</style>
