<template>
  <div class="system-log-container auto-height-container">
    <vab-query-form>
      <vab-query-form-top-panel>
        <el-form inline label-width="60px" :model="queryForm" @submit.prevent>
          <el-form-item label="账号">
            <el-input v-model.trim="queryForm.account" clearable placeholder="请输入账号" />
          </el-form-item>
          <el-form-item label="周期">
            <el-date-picker v-model="queryForm.searchDate" end-placeholder="结束日期" start-placeholder="开始日期" type="daterange" />
          </el-form-item>
          <el-form-item>
            <el-button :icon="Search" :loading="listLoading" type="primary" @click="queryData">查询</el-button>
          </el-form-item>
        </el-form>
      </vab-query-form-top-panel>
    </vab-query-form>

    <el-table v-loading="listLoading" :data="list">
      <el-table-column type="expand">
        <template #default="{ row }">
          <div class="vab-table-expand">
            <p>
              <span class="vab-table-expand-title">日志类型:</span>
              {{ row.type }}
            </p>
            <p>
              <span class="vab-table-expand-title">账号:</span>
              {{ row.account }}
            </p>
            <p>
              <span class="vab-table-expand-title">执行结果:</span>
              <span v-if="row.executeResult === '登录成功'">
                <vab-dot type="success" />
                {{ row.executeResult }}
              </span>
              <span v-else>
                <vab-dot type="danger" />
                {{ row.executeResult }}
              </span>
            </p>
            <p>
              <span class="vab-table-expand-title">登录IP:</span>
              {{ row.ip }}
            </p>
            <p>
              <span class="vab-table-expand-title">访问时间:</span>
              {{ row.datetime }}
            </p>
          </div>
        </template>
      </el-table-column>
      <el-table-column align="center" label="日志类型" min-width="120" prop="type" />
      <el-table-column align="center" label="账号" min-width="120" prop="account" />
      <el-table-column align="center" label="执行结果" min-width="120" prop="executeResult">
        <template #default="{ row }">
          <span v-if="row.executeResult === '登录成功'">
            <vab-dot type="success" />
            {{ row.executeResult }}
          </span>
          <span v-else>
            <vab-dot type="danger" />
            {{ row.executeResult }}
          </span>
        </template>
      </el-table-column>
      <el-table-column align="center" label="登录IP" min-width="130" prop="ip" />
      <el-table-column align="center" label="访问时间" min-width="160" prop="datetime" sortable />
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
import { getList } from '/@/api/systemLog'

defineOptions({
  name: 'SystemLog',
})

const list = ref<any>([])
const listLoading = ref<boolean>(true)

const total = ref<number>(0)
const queryForm = reactive<any>({
  account: '',
  searchDate: '',
  pageNo: 1,
  pageSize: 20,
})

const handleSizeChange = (value: number) => {
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

const fetchData = async () => {
  listLoading.value = true
  const { data } = await getList(queryForm)
  list.value = data.list
  total.value = data.total
  listLoading.value = false
}

onBeforeMount(() => {
  fetchData()
})
</script>
