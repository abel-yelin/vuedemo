<template>
  <div class="inline-edit-table-container auto-height-container">
    <vab-query-form>
      <vab-query-form-right-panel :span="24">
        <el-form inline :model="queryForm" @submit.prevent>
          <el-form-item>
            <el-input v-model="queryForm.title" clearable placeholder="标题" />
          </el-form-item>
          <el-form-item>
            <el-button :icon="Search" :loading="listLoading" native-type="submit" type="primary" @click="queryData">查询</el-button>
          </el-form-item>
        </el-form>
      </vab-query-form-right-panel>
    </vab-query-form>
    <el-table v-loading="listLoading" border :data="list">
      <el-table-column type="selection" width="38" />
      <el-table-column align="center" label="序号" width="55">
        <template #default="{ $index }">
          {{ $index + 1 }}
        </template>
      </el-table-column>
      <el-table-column align="center" label="标题" min-width="240">
        <template #default="{ row }">
          <template v-if="row.edit">
            <el-input v-model="row.title" clearable style="width: 100%" />
          </template>
          <span v-else @click="row.edit = !row.edit">{{ row.title }}</span>
        </template>
      </el-table-column>
      <el-table-column align="center" label="作者" min-width="140" prop="author">
        <template #default="{ row }">
          <template v-if="row.edit">
            <el-input v-model="row.author" clearable style="width: 100%" />
          </template>
          <span v-else @click="row.edit = !row.edit">{{ row.author }}</span>
        </template>
      </el-table-column>
      <el-table-column align="center" label="操作" width="150">
        <template #default="{ row }">
          <el-button v-if="!row.edit" text type="primary" @click="row.edit = !row.edit">编辑</el-button>
          <el-button v-if="row.edit" text type="primary" @click="confirmEdit(row)">保存</el-button>
          <el-button v-if="row.edit" text type="danger" @click="cancelEdit(row)">取消</el-button>
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
  </div>
</template>

<script lang="ts" setup>
import { Search } from '@element-plus/icons-vue'
import { getList } from '/@/api/table'

defineOptions({
  name: 'InlineEditTable',
})

const list = ref<any>([])
const listLoading = ref<boolean>(true)

const total = ref<number>(0)
const queryForm = reactive<any>({
  pageNo: 1,
  pageSize: 20,
  title: '',
})

const fetchData = async () => {
  listLoading.value = true
  const { data } = await getList(queryForm)
  list.value = data.list.map((item: any) => {
    item.edit = false
    item.originalTitle = item.title
    item.originalAuthor = item.author
    return item
  })
  total.value = data.total
  listLoading.value = false
}

const handleSizeChange = (value: number) => {
  queryForm.pageNo = 1
  queryForm.pageSize = value
  fetchData()
}

const handleCurrentChange = (value: any) => {
  queryForm.pageNo = value
  fetchData()
}

const queryData = () => {
  queryForm.pageNo = 1
  fetchData()
}

const cancelEdit = (row: any) => {
  row.title = row.originalTitle
  row.author = row.originalAuthor
  row.edit = false
}

const confirmEdit = (row: any) => {
  row.edit = false
  row.originalTitle = row.title
  row.originalAuthor = row.author
}

onBeforeMount(() => {
  fetchData()
})
</script>
