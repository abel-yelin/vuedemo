<template>
  <div class="blog-container no-background-container">
    <el-row :gutter="20">
      <el-col :lg="4" :md="24" :sm="24" :xl="4" :xs="24">
        <vab-card>
          <el-menu class="blog-menu" default-active="1" @select="handleSelect">
            <el-menu-item index="1">
              <vab-icon icon="archive-line" />
              综合
            </el-menu-item>
            <el-menu-item index="2">
              <vab-icon icon="code-box-line" />
              后端
            </el-menu-item>
            <el-menu-item index="3">
              <vab-icon icon="slash-commands-2" />
              前端
            </el-menu-item>
            <el-menu-item index="4">
              <vab-icon icon="android-line" />
              安卓
            </el-menu-item>
            <el-menu-item index="5">
              <vab-icon icon="app-store-line" />
              苹果
            </el-menu-item>
          </el-menu>
        </vab-card>
      </el-col>
      <el-col :lg="14" :md="24" :sm="24" :xl="14" :xs="24">
        <vab-card :body-style="{ minHeight: 'calc(var(--el-container-height) - 2px)' }">
          <div v-show="index === '1'">
            <el-tabs v-model="activeName">
              <el-tab-pane label="推荐" name="first">
                <div v-for="item in list" :key="item" :lg="item.span" :md="12" :sm="12" :xl="item.span" :xs="24">
                  <div class="blog-item" @click="handleDetail(item)">
                    <div class="blog-title">{{ item.title }}</div>
                    <div class="blog-abstract">{{ item.content }}</div>
                    <div class="blog-entry">
                      <div class="blog-entry-left">
                        <el-avatar :size="18" :src="item.logo" />
                        <div class="user">{{ item.user }}</div>

                        <vab-icon icon="eye-line" />
                        <div class="look">999</div>
                      </div>
                      <div class="blog-entry-right">
                        <vab-icon icon="time-line" />
                        <div class="time">{{ item.time }}</div>
                      </div>
                    </div>
                  </div>
                </div>
              </el-tab-pane>
              <el-tab-pane label="最新" name="second">
                <el-empty class="vab-data-empty" description="暂无数据" />
              </el-tab-pane>
            </el-tabs>
          </div>
          <div v-show="index === '2'">
            <el-tabs v-model="activeName">
              <el-tab-pane label="推荐" name="first">
                <el-empty class="vab-data-empty" description="暂无数据" />
              </el-tab-pane>
              <el-tab-pane label="最新" name="second">
                <el-empty class="vab-data-empty" description="暂无数据" />
              </el-tab-pane>
            </el-tabs>
          </div>
          <div v-show="index === '3'">
            <el-tabs v-model="activeName">
              <el-tab-pane label="推荐" name="first">
                <el-empty class="vab-data-empty" description="暂无数据" />
              </el-tab-pane>
              <el-tab-pane label="最新" name="second">
                <el-empty class="vab-data-empty" description="暂无数据" />
              </el-tab-pane>
            </el-tabs>
          </div>
          <div v-show="index === '4'">
            <el-tabs v-model="activeName">
              <el-tab-pane label="推荐" name="first">
                <el-empty class="vab-data-empty" description="暂无数据" />
              </el-tab-pane>
              <el-tab-pane label="最新" name="second">
                <el-empty class="vab-data-empty" description="暂无数据" />
              </el-tab-pane>
            </el-tabs>
          </div>
          <div v-show="index === '5'">
            <el-tabs v-model="activeName">
              <el-tab-pane label="推荐" name="first">
                <el-empty class="vab-data-empty" description="暂无数据" />
              </el-tab-pane>
              <el-tab-pane label="最新" name="second">
                <el-empty class="vab-data-empty" description="暂无数据" />
              </el-tab-pane>
            </el-tabs>
          </div>
        </vab-card>
      </el-col>
      <el-col :lg="6" :md="24" :sm="24" :xl="6" :xs="24">
        <el-carousel height="180px" :interval="6000">
          <el-carousel-item v-for="item in 4" :key="item">
            <img :src="landscape" />
          </el-carousel-item>
        </el-carousel>
        <rank-list />
      </el-col>
    </el-row>
  </div>
</template>

<script lang="ts" setup>
import { getList } from '/@/api/news'
import landscape from '/@/assets/common_images/landscape.jpg'

defineOptions({
  name: 'Blog',
})

const activeName = ref<any>('first')
const index = ref<any>('1')
const router = useRouter()
const list = ref<any>([])

const handleSelect = (_index: any) => {
  index.value = _index
}

onActivated(() => {
  fetchData()
})

const fetchData = async () => {
  const { data } = await getList()
  list.value = data.list
}

const handleDetail = (query: any) => {
  router.push({ path: '/template/newsDetail', query })
}

onBeforeMount(() => {
  fetchData()
})
</script>

<style lang="scss" scoped>
.blog-container {
  :deep() {
    .el-menu {
      --el-menu-bg-color: transparent;

      &-item {
        margin-bottom: 10px;

        &.is-active,
        &:hover {
          color: var(--el-color-primary);
          background-color: var(--el-color-primary-light-9);
          border-radius: var(--el-border-radius-base);
        }
      }
    }

    .el-carousel {
      margin-bottom: 20px;
      border-radius: var(--el-border-radius-base);

      &__item {
        img {
          width: 100%;
          object-fit: fill;
        }
      }
    }
  }

  .blog-item {
    position: relative;
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    padding: var(--el-padding);
    line-height: 26px;
    cursor: pointer;
    border-bottom: 1px solid var(--el-border-color);

    .blog-title {
      display: flex;
      display: -webkit-box;
      width: 100%;
      margin-bottom: 2px;
      overflow: hidden;
      font-size: 16px;
      font-weight: 600;
      line-height: 26px;
      text-overflow: ellipsis;
      -webkit-box-orient: vertical;
      -webkit-line-clamp: 1;
    }

    .blog-abstract {
      display: -webkit-box;
      overflow: hidden;
      font-size: 13px;
      color: var(--el-color-grey);
      text-overflow: ellipsis;
      -webkit-box-orient: vertical;
      -webkit-line-clamp: 1;
    }

    .blog-entry {
      display: flex;
      flex-direction: row;
      flex-wrap: wrap;
      align-items: center;
      justify-content: space-between;
      width: 100%;
      color: var(--el-color-grey);

      &-left {
        display: flex;
        align-items: center;

        .user {
          margin-right: 5px;
          margin-left: 3px;
        }

        .look {
          margin-left: 3px;
        }
      }

      &-right {
        display: flex;
        align-items: center;
      }
    }
  }
}
</style>
