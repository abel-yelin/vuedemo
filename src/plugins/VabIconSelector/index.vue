<template>
  <el-row :gutter="20">
    <el-col :span="24">
      <vab-query-form>
        <vab-query-form-top-panel>
          <el-form inline @submit.prevent>
            <el-form-item>
              <el-input v-model="queryForm.title" clearable />
            </el-form-item>
            <el-form-item>
              <el-button :icon="Search" native-type="submit" type="primary" @click="queryData" />
            </el-form-item>
          </el-form>
        </vab-query-form-top-panel>
      </vab-query-form>
    </el-col>
    <el-col v-for="(item, index) in queryIcon" :key="index" :span="6">
      <vab-card @click="handleIcon(item)">
        <vab-icon :icon="item" />
      </vab-card>
    </el-col>
    <el-col :span="24">
      <vab-pagination
        :current-page="queryForm.pageNo"
        :layout="layout"
        :page-size="queryForm.pageSize"
        :total="total"
        @current-change="handleCurrentChange"
        @size-change="handleSizeChange"
      />
    </el-col>
  </el-row>
</template>

<script lang="ts" setup>
import { Search } from '@element-plus/icons-vue'
import { getIconList } from '/@/api/icon'

defineOptions({
  name: 'VabIconSelector',
})

const emit = defineEmits(['handle-icon'])

const icon = ref<string>('24-hours-fill')
const layout = ref<string>('total, prev, next')
const total = ref<number>(0)
const queryIcon = ref<any>([])
const queryForm = reactive<any>({
  pageNo: 1,
  pageSize: 20,
  title: '',
})

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

const fetchData = async () => {
  const { data } = await getIconList(queryForm)
  queryIcon.value = data.list
  total.value = data.total
}

const handleIcon = (item: any) => {
  icon.value = item
  emit('handle-icon', item)
}

onBeforeMount(() => {
  fetchData()
})
</script>

<style lang="scss">
.icon-selector-popper {
  width: 302px !important;

  .vab-query-form {
    margin-top: calc(var(--el-margin) / 2);

    .el-input {
      width: 220px;
    }
  }

  .el-card__body {
    position: relative;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    height: 25px;
    cursor: pointer;

    [class*='ri-'] {
      font-size: 28px;
      color: var(--el-color-grey);
      text-align: center;
      pointer-events: none;
      cursor: pointer;
    }
  }

  .el-pagination {
    margin-top: calc(0 - var(--el-margin)) !important;
  }
}
</style>
