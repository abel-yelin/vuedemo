<template>
  <div class="good-list-container auto-height-container">
    <vab-query-form>
      <vab-query-form-right-panel :span="24">
        <el-form ref="form" :inline="true" :model="queryForm" @submit.prevent>
          <el-form-item>
            <el-input v-model="queryForm.title" placeholder="商品名称" />
          </el-form-item>
          <el-form-item>
            <el-button :icon="Search" :loading="listLoading" native-type="submit" type="primary" @click="queryData">查询</el-button>
          </el-form-item>
        </el-form>
      </vab-query-form-right-panel>
    </vab-query-form>
    <el-empty v-if="emptyShow" class="vab-data-empty" description="暂无数据" />
    <el-scrollbar>
      <div class="vab-auto-box">
        <el-row :gutter="20">
          <el-col v-for="(item, index) in list" :key="index" :lg="8" :md="8" :sm="8" :xl="6" :xs="24">
            <vab-card :body-style="{ padding: '0px' }">
              <div class="card-body">
                <div class="tag-group">
                  <el-space wrap>
                    <el-tag v-if="item.isRecommend" effect="dark" type="success">推荐</el-tag>
                    <el-tag v-if="item.status === '已下架'" effect="dark" type="danger">缺货</el-tag>
                  </el-space>
                </div>
                <div class="image-group">
                  <img alt="" class="image" :src="item.image" />
                </div>
                <div class="title">
                  {{ item.title }}
                </div>
                <div class="description">
                  {{ item.description }}
                </div>
                <div class="price">
                  <span>{{ item.price }} 元</span>
                </div>
              </div>
            </vab-card>
          </el-col>
        </el-row>
      </div>
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
import { getList } from '/@/api/goodsManagement'

defineOptions({
  name: 'GoodsList',
})

const emptyShow = ref<boolean>(false)
const list = ref<any>([])
const listLoading = ref<boolean>(true)
const total = ref<number>(0)
const queryForm = reactive<any>({
  pageNo: 1,
  pageSize: 20,
})

onActivated(() => {
  fetchData()
})

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

const queryData = () => {
  queryForm.pageNo = 1
  fetchData()
}

onBeforeMount(() => {
  fetchData()
})
</script>

<style lang="scss" scoped>
.good-list-container {
  .card-body {
    position: relative;
    text-align: center;
    cursor: pointer;

    .tag-group {
      position: absolute;
      top: 15px;
      right: 7px;
      z-index: 9;
    }

    .image-group {
      height: 300px;
      overflow: hidden;

      .image {
        width: 100%;
        height: 300px;
        transition: all ease-in-out 0.3s !important;

        &:hover {
          transform: scale(1.1);
        }
      }
    }

    .title {
      margin: 8px 0;
      font-weight: bold;
    }

    .description {
      color: var(--el-color-grey);
    }

    .price {
      margin: 8px 0;
      color: var(--el-color-danger);

      s {
        color: var(--el-color-grey);
      }
    }
  }
}
</style>
