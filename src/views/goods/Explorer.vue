<template>
  <div class="explorer-container no-background-container auto-height-container">
    <el-row :gutter="20">
      <el-col :lg="4" :md="24" :sm="24" :xl="4" :xs="24">
        <vab-card class="auto-height-card">
          <el-input v-model="filterText" placeholder="请输入查询条件" style="margin-bottom: 10px" />
          <el-tree
            ref="treeRef"
            :data="data"
            default-expand-all
            :filter-node-method="filterNode"
            :props="defaultProps"
            @node-click="handleNodeClick"
          >
            <template #default="{ node }">
              <el-icon>
                <folder />
              </el-icon>
              <span style="margin-left: 3px">{{ node.label }}</span>
            </template>
          </el-tree>
        </vab-card>
      </el-col>
      <el-col :lg="20" :md="24" :sm="24" :xl="20" :xs="24">
        <vab-card class="auto-height-card">
          <vab-query-form>
            <vab-query-form-top-panel>
              <el-form inline :model="queryForm" @submit.prevent>
                <el-form-item label="标题">
                  <el-input v-model="queryForm.title" clearable placeholder="请输入标题" />
                </el-form-item>
                <el-form-item>
                  <el-button :icon="Search" :loading="listLoading" native-type="submit" type="primary" @click="queryData">查询</el-button>
                </el-form-item>
              </el-form>
            </vab-query-form-top-panel>
            <vab-query-form-left-panel :span="24">
              <el-upload
                accept="image/png,image/jpeg"
                action="/uploadFile"
                multiple
                :on-error="fetchData"
                :on-success="fetchData"
                :show-file-list="false"
                style="margin: 0 10px 10px 0"
              >
                <el-button :icon="Upload" type="primary">本地上传</el-button>
              </el-upload>
              <el-button :icon="Delete" type="danger" @click="handleDelete">删除</el-button>
            </vab-query-form-left-panel>
          </vab-query-form>
          <el-row v-loading="listLoading" class="explorer-image-box" :gutter="20">
            <el-col v-for="(item, index) in list" :key="index" :lg="6" :md="8" :sm="12" :xl="6" :xs="12">
              <vab-card :body-style="{ padding: '0', position: 'relative' }">
                <el-checkbox v-model="item.id" :label="item.title" @change="handleCheckboxChange($event, item)" />
                <el-image :preview-src-list="previewSrcList" preview-teleported :src="item.image" />
              </vab-card>
            </el-col>

            <el-col v-if="list.length === 0" :span="24">
              <el-empty class="vab-data-empty" description="暂无数据" />
            </el-col>
          </el-row>

          <vab-pagination
            :current-page="queryForm.pageNo"
            :page-size="queryForm.pageSize"
            :total="total"
            @current-change="handleCurrentChange"
            @size-change="handleSizeChange"
          />
        </vab-card>
      </el-col>
    </el-row>
  </div>
</template>

<script lang="ts" setup>
import { Delete, Folder, Search, Upload } from '@element-plus/icons-vue'
import { ElTree } from 'element-plus'
import { doDelete, getList } from '/@/api/table'

defineOptions({
  name: 'Explorer',
})

const list = ref<any>([])
const listLoading = ref<boolean>(true)
const total = ref<number>(0)
const selectRows = ref<any>([])
const queryForm = reactive<any>({
  pageNo: 1,
  pageSize: 20,
})
const filterText = ref<string>('')
const treeRef = ref<InstanceType<typeof ElTree>>()
const previewSrcList = ref<any>([])

watch(filterText, (value) => {
  treeRef.value?.filter(value)
})

const filterNode: any = (value: string, data: Tree) => {
  if (!value) return true
  return data.label.includes(value)
}

interface Tree {
  id: number
  label: string
  children?: Tree[]
}

const data: Tree[] = [
  {
    id: 1,
    label: '一级 1',
    children: [
      {
        id: 4,
        label: '二级 1-1',
        children: [
          {
            id: 9,
            label: '三级 1-1-1',
          },
          {
            id: 10,
            label: '三级 1-1-2',
          },
        ],
      },
    ],
  },
  {
    id: 2,
    label: '一级 2',
    children: [
      {
        id: 5,
        label: '二级 2-1',
      },
      {
        id: 6,
        label: '二级 2-2',
      },
    ],
  },
  {
    id: 3,
    label: '一级 3',
    children: [
      {
        id: 7,
        label: '二级 3-1',
      },
      {
        id: 8,
        label: '二级 3-2',
      },
    ],
  },
]
const handleNodeClick = () => {
  fetchData()
}

const defaultProps = {
  children: 'children',
  label: 'label',
}

const fetchData = async () => {
  selectRows.value = []
  listLoading.value = true
  const { data } = await getList(queryForm)
  list.value = data.list
  total.value = data.total
  previewSrcList.value = data.list.map((item: any) => item.image)
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

const handleCheckboxChange = (checked: any, item: any) => {
  if (checked) selectRows.value.push(item.id)
  else {
    const index = selectRows.value.findIndex((item: any) => item === item.id)
    selectRows.value.splice(index, 1)
  }
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

<style lang="scss" scoped>
.explorer-container {
  .explorer-image-box {
    flex: 1;
    overflow-y: auto;

    :deep() {
      .el-card__body {
        &:hover {
          .el-image {
            scale: 1.1;
          }
        }

        .el-image {
          width: 100%;
          height: 180px;
          transition: all ease-in-out 0.3s !important;
          scale: 1.05;
        }

        .el-checkbox {
          position: absolute;
          top: 5px;
          left: 10px;
        }
      }
    }
  }
}
</style>
