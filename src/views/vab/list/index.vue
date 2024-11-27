<template>
  <div class="list-container auto-height-container">
    <vab-query-form>
      <vab-query-form-right-panel :span="24">
        <el-form inline :model="queryForm" @submit.prevent>
          <el-form-item>
            <el-input v-model.trim="queryForm.title" clearable placeholder="请输入标题" />
          </el-form-item>
          <el-form-item>
            <el-button :icon="Search" :loading="listLoading" type="primary" @click="queryData">查询</el-button>
          </el-form-item>
        </el-form>
      </vab-query-form-right-panel>
    </vab-query-form>
    <el-empty v-if="emptyShow" class="vab-data-empty el-table" description="暂无数据" />
    <el-scrollbar>
      <ul v-loading="listLoading" class="vab-auto-box">
        <li v-for="(item, index) in list" :key="index" class="list-item">
          <div class="list-item-meta">
            <div class="list-item-meta-avatar">
              <el-popover placement="top-start">
                <el-image :src="item.image" />
                <template #reference>
                  <el-image :src="item.image" />
                </template>
              </el-popover>
            </div>
            <div class="list-item-meta-content hidden-xs-only">
              <div class="list-item-meta-title">
                {{ item.title }}
              </div>
              <div class="list-item-meta-description hidden-xs-only">
                {{ item.description }}
              </div>
            </div>
            <div class="list-item-meta-content2 hidden-xs-only">
              <el-progress :percentage="parseInt(item.percentage)" />
            </div>
            <div class="list-item-meta-content2">
              <p>开始时间</p>
              <p>{{ item.datetime }}</p>
            </div>
            <div class="list-item-meta-content2">
              <p>状态</p>
              <p>
                <el-tag :type="statusFilter(item.status)">
                  {{ item.status }}
                </el-tag>
              </p>
            </div>
          </div>
        </li>
      </ul>
    </el-scrollbar>
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
  name: 'List',
})

const list = ref<any>([])
const total = ref<number>(0)
const queryForm = reactive<any>({
  pageNo: 1,
  pageSize: 20,
  title: '',
})

const listLoading = ref<boolean>(true)
const emptyShow = ref<boolean>(true)

const fetchData = async () => {
  listLoading.value = true
  const { data } = await getList(queryForm)
  list.value = data.list
  total.value = data.total
  listLoading.value = false
  emptyShow.value = data.total <= 0
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

const statusFilter = (status: string | number) => {
  const statusMap: any = {
    published: 'success',
    draft: 'primary',
    deleted: 'danger',
  }
  return statusMap[status]
}

const queryData = () => {
  queryForm.pageNo = 1
  fetchData()
}

onBeforeMount(() => {
  fetchData()
})
</script>

<style lang="scss" scoped>
.list-container {
  ul {
    padding: 0;
    margin: 0;
    list-style: none;
    outline: none;

    .list-item {
      padding: calc(var(--el-padding) / 2);
      line-height: 20px;
      border-bottom: 1px solid var(--el-border-color);

      &-meta {
        display: flex;
        align-items: center;
        justify-content: center;

        &-avatar {
          :deep() {
            .el-image {
              width: 60px;
              height: 60px;
              cursor: pointer;
              border-radius: var(--el-border-radius-base);
            }
          }
        }

        &-content {
          flex: 2 0;
          margin-left: var(--el-margin);
        }

        &-content2 {
          flex: 1 0;
          margin-left: var(--el-margin);
          text-align: center;
        }

        &-title {
          font-size: var(--el-font-size-base);
          font-weight: bold;
          color: var(--el-color-grey);
        }

        &-description {
          display: -webkit-box;
          overflow: hidden;
          font-size: var(--el-font-size-base);
          color: var(--el-color-grey);
          -webkit-box-orient: vertical;
          -webkit-line-clamp: 2;
        }

        :deep() {
          .el-progress {
            width: 300px;
            margin: auto auto auto 40px;
          }
        }
      }
    }
  }
}
</style>
