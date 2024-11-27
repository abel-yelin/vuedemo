<template>
  <div class="goods-management-container auto-height-container">
    <vab-query-form>
      <vab-query-form-left-panel>
        <el-button :icon="Plus" type="primary" @click="handleAdd">添加</el-button>
        <el-button :icon="Delete" type="danger" @click="handleDelete">删除</el-button>
      </vab-query-form-left-panel>
      <vab-query-form-right-panel>
        <el-form inline :model="queryForm" @submit.prevent>
          <el-form-item>
            <el-input v-model="queryForm.name" clearable placeholder="请输入商品名称" />
          </el-form-item>
          <el-form-item>
            <el-button :icon="Search" :loading="listLoading" native-type="submit" type="primary" @click="queryData">查询</el-button>
          </el-form-item>
        </el-form>
      </vab-query-form-right-panel>
    </vab-query-form>

    <el-table ref="tableRef" v-loading="listLoading" border :data="list" @selection-change="setSelectRows">
      <el-table-column type="selection" width="38" />
      <el-table-column align="center" label="序号" width="55">
        <template #default="{ $index }">
          {{ $index + 1 }}
        </template>
      </el-table-column>
      <el-table-column align="center" label="商品ID" min-width="180" prop="id" show-overflow-tooltip />
      <el-table-column align="center" label="商品名称" min-width="120" prop="name" />
      <el-table-column align="center" label="商品图" prop="image">
        <template #default="{ row }">
          <el-popover placement="top-start">
            <el-image :src="row.image" />
            <template #reference>
              <el-image :src="row.image" />
            </template>
          </el-popover>
        </template>
      </el-table-column>
      <el-table-column align="center" label="商品类型" min-width="120" prop="type" sortable />
      <el-table-column align="center" label="商品售价" min-width="120" prop="price" sortable />
      <el-table-column align="center" label="销量" prop="sales" sortable />
      <el-table-column align="center" label="库存" prop="stock" sortable />
      <el-table-column align="center" label="状态" min-width="100" prop="status" sortable>
        <template #default="{ row }">
          <el-tag effect="dark" :type="row.status == '已上架' ? 'success' : row.status == '待上架' ? 'warning' : 'info'">
            {{ row.status }}
          </el-tag>
        </template>
      </el-table-column>
      <el-table-column align="center" label="时间" min-width="160" prop="datetime" />
      <el-table-column align="center" label="操作" width="150">
        <template #default="{ row }">
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
    <goods-management-edit ref="editRef" @fetch-data="fetchData" />
  </div>
</template>

<script lang="ts" setup>
import { Delete, Plus, Search } from '@element-plus/icons-vue'
import type { TableInstance } from 'element-plus'
import { doDelete, getList } from '/@/api/goodsManagement'

defineOptions({
  name: 'GoodsManagement',
})

const editRef = ref<any>(null)
const tableRef = ref<TableInstance>()
const list = ref<any>([])
const listLoading = ref<boolean>(true)
const total = ref<number>(0)
const selectRows = ref<any>([])
const queryForm = reactive<any>({
  pageNo: 1,
  pageSize: 20,
})

onActivated(() => {
  tableRef.value?.doLayout()
})

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

onBeforeMount(() => {
  fetchData()
})
</script>
