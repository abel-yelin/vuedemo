<template>
  <div class="trade-container auto-height-container">
    <vab-query-form>
      <vab-query-form-top-panel>
        <el-form inline :model="queryForm" @submit.prevent>
          <el-form-item label="商户订单号">
            <el-input v-model="queryForm.merchantOrderId" clearable placeholder="商户订单号" />
          </el-form-item>
          <el-form-item v-show="!fold" label="微信支付单号" label-width="120px">
            <el-input v-model="queryForm.wechatPaymentNo" clearable placeholder="微信支付单号" />
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
    </vab-query-form>

    <el-table ref="tableRef" v-loading="listLoading" border :data="list" @selection-change="setSelectRows">
      <el-table-column type="selection" width="38" />
      <el-table-column align="center" label="序号" width="55">
        <template #default="{ $index }">
          {{ $index + 1 }}
        </template>
      </el-table-column>
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
      <el-table-column align="center" label="交易时间" min-width="160" prop="transactionTime" show-overflow-tooltip sortable />
      <el-table-column align="center" label="商户订单号" min-width="120" prop="merchantOrderId" show-overflow-tooltip />
      <el-table-column align="center" label="微信支付单号" min-width="120" prop="wechatPaymentNo" show-overflow-tooltip />
      <el-table-column align="center" label="支付场景" min-width="120" prop="paymentScene" sortable />
      <el-table-column align="center" label="交易状态" min-width="120" prop="transactionStatus" sortable>
        <template #default="{ row }">
          <el-tag
            effect="dark"
            :type="
              row.transactionStatus == '已支付'
                ? 'success'
                : row.transactionStatus == '未支付'
                  ? 'warning'
                  : row.transactionStatus == '已退款'
                    ? 'danger'
                    : 'info'
            "
          >
            {{ row.transactionStatus }}
          </el-tag>
        </template>
      </el-table-column>
      <el-table-column align="center" label="订单金额(元)" min-width="120" prop="orderAmount" />
      <el-table-column align="center" label="操作" width="80">
        <template #default="{ row }">
          <el-button
            :disabled="row.transactionStatus !== '已支付' && row.transactionStatus !== '申请退款中'"
            text
            type="danger"
            @click="handleRefund(row)"
          >
            退款
          </el-button>
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
import type { TableInstance } from 'element-plus'
import { doRefund, getList } from '/@/api/trade'

defineOptions({
  name: 'Trade',
})

const tableRef = ref<TableInstance>()
const fold = ref<boolean>(true)
const list = ref<any>([])
const listLoading = ref<boolean>(true)
const total = ref<number>(0)
const selectRows = ref<any>([])
const queryForm = reactive<any>({
  pageNo: 1,
  pageSize: 20,
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

const handleFold = () => {
  fold.value = !fold.value
}

const setSelectRows = (value: string) => {
  selectRows.value = value
}

const handleRefund = (row: any) => {
  if (row.id) {
    $baseConfirm('您确定要退款吗', null, async () => {
      const { msg }: any = await doRefund({ ids: row.id })
      $baseMessage(msg, 'success', 'hey')
      await fetchData()
    })
  }
}

onActivated(() => {
  tableRef.value?.doLayout()
})

onBeforeMount(() => {
  fetchData()
})
</script>
