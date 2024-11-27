<template>
  <div class="iot-management-container no-background-container">
    <vab-query-form class="page-header">
      <vab-query-form-left-panel>
        <el-form inline :model="queryForm" @submit.prevent>
          <el-form-item label="名称">
            <el-input v-model.trim="queryForm.taskName" clearable placeholder="请输入名称" />
          </el-form-item>
          <el-form-item label="周期">
            <el-date-picker v-model="queryForm.date" end-placeholder="结束日期" start-placeholder="开始日期" type="daterange" />
          </el-form-item>
          <el-form-item>
            <el-button :icon="Search" type="primary" @click="queryData">查询</el-button>
          </el-form-item>
        </el-form>
      </vab-query-form-left-panel>
      <vab-query-form-right-panel>
        <el-button :icon="Plus" type="primary" @click="handleAdd">新增</el-button>
        <el-button :icon="Download" type="primary" @click="handleExport">导出</el-button>
      </vab-query-form-right-panel>
    </vab-query-form>
    <el-row :gutter="20">
      <el-col v-for="item in list" :key="item.id" :lg="8" :md="8" :sm="12" :xl="8" :xs="24">
        <vab-card class="Iot-item">
          <template #header>
            <vab-icon icon="color-filter-line" />
            产品名称 - {{ item.id }}
            <el-tag v-if="item.status == 1" class="card-header-tag" type="success">已开启</el-tag>
            <el-tag v-else class="card-header-tag" type="danger">已停用</el-tag>
          </template>
          <div class="Iot-item-content">
            <div>
              <p>所属门类：{{ item.status }}</p>
              <p>产品类型：网关子设备</p>
              <p>透传设备：否</p>
              <p>设备定位：是</p>
            </div>
            <el-image class="Iot-item-image" :src="imageUrl" />
          </div>

          <div class="Iot-item-bottom">
            <div>
              <el-button plain type="primary">编辑</el-button>
              <el-button plain type="success">详情</el-button>
              <el-button plain type="warning">物模型</el-button>
            </div>

            <div>
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
              <el-popconfirm title="您确定要删除吗？" width="240px" @confirm="handleDelete">
                <template #reference>
                  <el-button circle type="danger">
                    <vab-icon icon="delete-bin-7-line" />
                  </el-button>
                </template>
              </el-popconfirm>
            </div>
          </div>
        </vab-card>
      </el-col>
      <el-col :lg="8" :md="8" :sm="12" :xl="8" :xs="24">
        <vab-card class="task-add" @click="handleAdd">
          <vab-icon icon="add-circle-line" />
          <p>添加产品</p>
        </vab-card>
      </el-col>
    </el-row>
  </div>
</template>

<script lang="ts" setup>
import { Download, Plus, Search } from '@element-plus/icons-vue'
import { getList } from '../../../api/iotManagement'
import imageUrl from '/@/assets/task_image/task.png'

defineOptions({
  name: 'IotManagement',
})

const list = ref<any>([])
const listLoading = ref<boolean>(true)
const queryForm = reactive<any>({
  taskName: '',
  date: '',
  pageNo: 1,
  pageSize: 8,
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
const handleDelete = () => {
  $baseMessage('模拟删除成功', 'success', 'hey')
}
const handleAdd = () => {
  $baseMessage('模拟添加成功', 'success', 'hey')
}
const handleExport = () => {
  $baseMessage('模拟导出成功', 'success', 'hey')
}
onBeforeMount(() => {
  fetchData()
})
</script>

<style lang="scss" scoped>
.iot-management-container {
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

  .Iot-item {
    min-height: 285px;
    max-height: 285px;

    &-content {
      display: flex;
      align-items: center;
      justify-content: space-between;

      p {
        color: var(--el-color-grey);
      }
    }

    &-image {
      display: block;
      width: 100px;
    }

    &-bottom {
      display: flex;
      align-items: center;
      justify-content: space-between;
      padding-top: 15px;
    }
  }

  .task-add {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    min-height: 285px;
    max-height: 285px;
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
