<template>
  <div class="default-icon-container auto-height-container">
    <vab-query-form>
      <vab-query-form-left-panel>
        <el-form inline @submit.prevent>
          <el-form-item>
            <el-button>
              <el-checkbox v-model="queryForm.colorful" label="多彩图标" @change="queryData" />
            </el-button>
          </el-form-item>
          <el-form-item>
            <el-button :disabled="!queryForm.colorful" :icon="Refresh" @click="fetchData">随机颜色</el-button>
          </el-form-item>
          <el-form-item label="文字大小（px）">
            <el-slider v-model="queryForm.num" :max="40" :min="28" />
          </el-form-item>
        </el-form>
      </vab-query-form-left-panel>
      <vab-query-form-right-panel>
        <el-form inline @submit.prevent>
          <el-form-item>
            <el-input v-model="queryForm.title" clearable placeholder="请输入图标名称" />
          </el-form-item>
          <el-form-item>
            <el-button :icon="Search" native-type="submit" type="primary" @click="queryData">查询</el-button>
          </el-form-item>
        </el-form>
      </vab-query-form-right-panel>
    </vab-query-form>
    <el-empty v-if="emptyShow" class="vab-data-empty" description="暂无数据" />
    <el-scrollbar>
      <div class="vab-auto-box">
        <el-row :gutter="20">
          <el-col v-for="(item, index) in queryIcon" :key="index" :lg="3" :md="4" :sm="6" :xl="2" :xs="6">
            <vab-card
              :body-style="{
                'min-height': '65px',
              }"
              @click="handleCopyIcon(item.icon)"
            >
              <vab-icon
                :icon="item.icon"
                :style="{
                  color: queryForm.colorful ? item.color : 'var(--el-color-grey)',
                  fontSize: queryForm.num + 'px',
                  transition: 'var(--el-transition)',
                  // 'background-image': queryForm.colorful
                  //   ? 'linear-gradient(120deg, ' + item.color + ' 50%, ' + colorRgba(item.color, 0.3) + ')'
                  //   : '',
                  // 'background-clip': queryForm.colorful ? 'text' : '',
                  // '-webkit-text-fill-color': queryForm.colorful ? 'transparent' : '',
                }"
              />
            </vab-card>
            <div class="icon-text" @click="handleCopyText(item.icon)">
              {{ item.icon }}
            </div>
          </el-col>
        </el-row>
      </div>
    </el-scrollbar>
    <vab-pagination
      background
      :current-page="queryForm.pageNo"
      :page-size="queryForm.pageSize"
      :page-sizes="[72, 144, 216, 288]"
      :total="total"
      @current-change="handleCurrentChange"
      @size-change="handleSizeChange"
    />
  </div>
</template>

<script lang="ts" setup>
import { Refresh, Search } from '@element-plus/icons-vue'
import { shuffle } from 'lodash-es'
import { getIconList } from '/@/api/icon'
import clip from '/@/utils/clipboard'

defineOptions({
  name: 'DefaultIcon',
})

interface QueryFormType {
  pageNo: number
  pageSize: number
  title: string
  colorful: boolean
  num: number
}

interface QueryIconType {
  icon: string
  color: string
}

const queryIcon = ref<QueryIconType[]>()
const total = ref<number>(0)
const queryForm = reactive<QueryFormType>({
  pageNo: 1,
  pageSize: 72,
  title: '',
  colorful: true,
  num: 28,
})

const emptyShow = ref<boolean>(false)

const fetchData = async () => {
  const { data } = await getIconList(queryForm)
  queryIcon.value = data.list.map((icon: any) => {
    return { icon, color: randomHexColor() }
  })
  total.value = data.total
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

const handleCopyText = (item: string) => {
  clip(item)
}

const handleCopyIcon = (item: any) => {
  clip(`<vab-icon icon="${item}" />`)
}

const randomHexColor = () => {
  return shuffle(['#1890FF', '#36CBCB', '#4ECB73', '#FBD437', '#F2637B', '#975FE5'])[0]
}

onBeforeMount(() => {
  fetchData()
})
</script>

<style lang="scss" scoped>
.default-icon-container {
  :deep() {
    .el-form--inline {
      .el-form-item {
        margin-right: 10px;
      }
    }

    .el-card__body {
      position: relative;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      min-height: 59.5px;
      max-height: 59.5px;
      padding: calc(var(--el-padding) / 1.4);
      cursor: pointer;

      i {
        font-size: 28px;
        color: var(--el-color-grey);
        text-align: center;
        pointer-events: none;
        cursor: pointer;
        transition: var(--el-transition);
      }

      &::after {
        position: absolute;
        bottom: -30px;
        width: 100%;
        padding: 4px 0;
        font-size: var(--el-font-size-extra-small);
        color: var(--el-color-white);
        text-align: center;
        content: '复制';
        background-color: var(--el-color-primary);
        transition: var(--el-transition);
      }

      &:hover {
        i {
          margin-bottom: calc(var(--el-margin) / 1.2);
        }

        &::after {
          bottom: 0;
        }
      }
    }
  }

  .icon-text {
    height: 30px;
    margin-top: -15px;
    overflow: hidden;
    font-size: var(--el-font-size-extra-small);
    line-height: 30px;
    text-align: center;
    text-overflow: ellipsis;
    white-space: nowrap;
    cursor: pointer;
  }
}
</style>
