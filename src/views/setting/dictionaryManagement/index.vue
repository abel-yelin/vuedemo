<template>
  <div class="dictionary-management-container no-background-container auto-height-container">
    <el-row :gutter="20">
      <el-col :lg="4" :md="8" :sm="24" :xl="4" :xs="24">
        <vab-card class="auto-height-card">
          <el-button class="tree-button" :icon="Plus" type="primary" @click="handleAdd">添加字典分类</el-button>
          <el-input v-model="filterText" clearable placeholder="请输入字典名称" />
          <el-tree
            ref="treeRef"
            :data="treeList"
            default-expand-all
            :default-expanded-keys="['root']"
            :filter-node-method="filterNode"
            node-key="id"
            :props="defaultProps"
            @node-click="handleNodeClick"
          >
            <template #default="{ node, data }">
              <span>{{ node.label }}</span>
              <a v-if="!data.children" @click="remove(node, data)">删除</a>
            </template>
          </el-tree>
        </vab-card>
      </el-col>
      <el-col :lg="20" :md="16" :sm="24" :xl="20" :xs="24">
        <vab-card class="auto-height-card">
          <vab-query-form>
            <vab-query-form-top-panel :span="12">
              <el-button :disabled="isRoot" :icon="Plus" type="primary" @click="handleEdit({ parentKey })">添加</el-button>
            </vab-query-form-top-panel>
          </vab-query-form>
          <el-table ref="tableRef" v-loading="listLoading" border :data="list">
            <el-table-column label="id" min-width="180" prop="id" />
            <el-table-column label="key值" prop="key" />
            <el-table-column label="字典值" prop="value" />
            <el-table-column label="操作" width="150">
              <template #default="{ row }">
                <el-button text type="primary" @click="handleEdit(row)">编辑</el-button>
                <el-button text type="danger" @click="handleDelete(row)">删除</el-button>
              </template>
            </el-table-column>
            <template #empty>
              <el-empty class="vab-data-empty" description="暂无数据" />
            </template>
          </el-table>
        </vab-card>
      </el-col>
    </el-row>
    <dictionary-management-edit ref="editRef" @fetch-data="fetchData" />
  </div>
</template>

<script lang="ts" setup>
import { Plus } from '@element-plus/icons-vue'
import type { TableInstance } from 'element-plus'
import { doDelete, getList, getTree } from '/@/api/dictionaryManagement'

defineOptions({
  name: 'DictionaryManagement',
})

const tableRef = ref<TableInstance>()
const treeRef = ref<any>(null)
const editRef = ref<any>(null)
const treeList = ref<any>([])
const defaultProps = reactive<any>({
  children: 'children',
  label: 'label',
})
const list = ref<any>([])
const listLoading = ref<boolean>(true)
const isRoot = ref<boolean>(true)
const parentKey = ref<string>('')
const filterText = ref<string>('')

const handleAdd = () => {
  editRef.value.showEdit()
}

const handleEdit = (row: any) => {
  editRef.value.showEdit(row)
}

const handleDelete = (row: { id: any }) => {
  if (row.id) {
    $baseConfirm('您确定要删除当前项吗', null, async () => {
      const { msg }: any = await doDelete({ paths: row.id })
      $baseMessage(msg, 'success', 'hey')
      await fetchData()
    })
  }
}

const fetchData = async (data = { key: 'root' }) => {
  data.key === 'root' ? (isRoot.value = true) : (isRoot.value = false)
  parentKey.value = data.key

  listLoading.value = true
  const res = await getList(data)
  list.value = res.data.list
  listLoading.value = false
}

const handleNodeClick = (data: { key: string } | undefined) => {
  fetchData(data)
}

const filterNode: any = (value: any, data: any) => {
  if (!value) return true
  return data.label.includes(value)
}

getTree().then(({ data }) => {
  const { list } = data
  treeList.value = list
})

const remove = (node: { parent: any }, data: any) => {
  const parent = node.parent
  const children = parent.data.children || parent.data
  const index = children.findIndex((d: { id: any }) => d.id === data.id)
  children.splice(index, 1)
  treeList.value = [...treeList.value]
}

watch(filterText, (value) => {
  treeRef.value.filter(value)
})

onActivated(() => {
  tableRef.value?.doLayout()
})

onBeforeMount(() => {
  fetchData()
})
</script>

<style lang="scss" scoped>
.dictionary-management-container {
  .tree-button {
    width: 100%;
    margin-bottom: var(--el-margin);
  }

  :deep() {
    .el-tree {
      margin-top: var(--el-margin);

      &-node__label {
        display: block;
        width: 100%;
      }

      &-node__content {
        a {
          position: absolute;
          right: 5px;
        }
      }
    }
  }
}
</style>
