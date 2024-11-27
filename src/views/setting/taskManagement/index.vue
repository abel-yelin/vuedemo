<template>
  <div class="task-management-container no-background-container">
    <vab-query-form class="page-header">
      <vab-query-form-top-panel>
        <el-form inline label-width="60px" :model="queryForm" @submit.prevent>
          <el-form-item label="任务名">
            <el-input v-model.trim="queryForm.taskName" clearable placeholder="请输入任务名" />
          </el-form-item>
          <el-form-item label="周期">
            <el-date-picker v-model="queryForm.date" end-placeholder="结束日期" start-placeholder="开始日期" type="daterange" />
          </el-form-item>
          <el-form-item>
            <el-button :icon="Search" type="primary" @click="queryData">查询</el-button>
          </el-form-item>
        </el-form>
      </vab-query-form-top-panel>
    </vab-query-form>
    <el-row :gutter="20">
      <el-col v-for="item in list" :key="item.id" :lg="6" :md="8" :sm="12" :xl="6" :xs="24">
        <vab-card class="task-item">
          <template #header>
            <vab-icon icon="task-line" />
            任务编号 - {{ item.id }}
            <el-tag v-if="item.status == 1" class="card-header-tag" type="success">已开启</el-tag>
            <el-tag v-else class="card-header-tag" type="danger">已停用</el-tag>
          </template>
          <el-image class="task-item-image" :src="imageUrl" />

          <div class="task-item-bottom">
            <span>Ip: {{ item.ip }}</span>
            <el-popconfirm title="您确定要执行当前操作吗？" width="240px" @confirm="handlePlay(item.status)">
              <template #reference>
                <el-button v-if="item.status == 1" circle type="warning">
                  <vab-icon icon="pause-line" />
                </el-button>
                <el-button v-else circle type="primary">
                  <vab-icon icon="play-line" />
                </el-button>
              </template>
            </el-popconfirm>
          </div>
        </vab-card>
      </el-col>
      <el-col :lg="6" :md="8" :sm="12" :xl="6" :xs="24">
        <vab-card class="task-add" @click="handleAdd">
          <vab-icon icon="add-circle-line" />
          <p>添加任务</p>
        </vab-card>
      </el-col>
    </el-row>
  </div>
</template>

<script lang="ts" setup>
import { Search } from '@element-plus/icons-vue'
import { getList } from '/@/api/taskManagement'
import imageUrl from '/@/assets/task_image/task.png'

defineOptions({
  name: 'TaskManagement',
})

const list = ref<any>([])
const listLoading = ref<boolean>(true)
const queryForm = reactive<any>({
  taskName: '',
  date: '',
  pageNo: 1,
  pageSize: 11,
})

const fetchData = async () => {
  listLoading.value = true
  const { data } = await getList(queryForm)
  list.value = data.list
  listLoading.value = false
}
const queryData = () => {
  queryForm.pageNo = 1
  fetchData()
}
const handlePlay = (status: any) => {
  if (status) $baseMessage('模拟停用成功', 'success', 'hey')
  else $baseMessage('模拟开启成功', 'success', 'hey')
}
const handleAdd = () => {
  $baseMessage('模拟添加成功', 'success', 'hey')
}
onBeforeMount(() => {
  fetchData()
})
</script>

<style lang="scss" scoped>
.task-management-container {
  .page-header {
    display: flex;
    align-items: center;
    padding: var(--el-padding) var(--el-padding) 0 var(--el-padding);
    margin-bottom: var(--el-margin);
    background: var(--el-color-white);
    border: 1px solid var(--el-border-color);

    :deep() {
      .el-form-item__content {
        width: 221px !important;

        .el-select,
        .el-input,
        .el-date-editor,
        .el-checkbox-group {
          width: 100%;
        }
      }
    }
  }

  :deep() {
    .el-card {
      .el-card__header {
        position: relative;

        > div > span {
          display: flex;
          align-items: center;

          i {
            margin-right: 3px;
          }
        }
      }

      .el-card__body {
        position: relative;

        .card-footer-tag {
          position: absolute;
          right: var(--el-margin);
          bottom: 15px;
        }
      }
    }
  }

  .task-item {
    min-height: 255px;
    max-height: 255px;

    &-image {
      display: block;
      width: 150px;
      margin: 0 auto 20px;
    }

    &-bottom {
      display: flex;
      align-items: center;
      justify-content: space-between;
      padding-top: 20px;
      border-top: 1px solid var(--el-border-color);
    }
  }

  .task-add {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    min-height: 255px;
    max-height: 255px;
    color: var(--el-color-primary);
    text-align: center;
    cursor: pointer;

    [class*='ri-'] {
      font-size: 30px;
    }

    p {
      margin-top: var(--el-margin);
      font-size: var(--el-font-size-extra-small);
    }
  }
}
</style>
