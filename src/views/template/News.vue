<template>
  <div class="new-container no-background-container">
    <el-row :gutter="20">
      <el-col v-for="(item, index) in list" :key="index" :lg="item.span" :md="12" :sm="12" :xl="item.span" :xs="24">
        <vab-card :body-style="{ padding: 0 }">
          <div class="card-body" @click="handleDetail(item)">
            <div class="image-group">
              <img
                alt=""
                class="image"
                :src="item.image"
                :style="
                  item.fullImage
                    ? {
                        width: '100%',
                        height: '100%',
                        position: 'absolute',
                        inset: 0,
                      }
                    : ''
                "
              />
            </div>
            <div :class="item.fullImage ? 'full-box' : ''">
              <div class="logo">
                <el-avatar :size="18" :src="item.logo" />
                <div class="user">{{ item.user }}</div>
                <vab-icon icon="time-line" />
                <div class="time">{{ item.time }}</div>
              </div>
              <div class="title">{{ item.title }}</div>
            </div>
          </div>
        </vab-card>
      </el-col>
    </el-row>
  </div>
</template>

<script lang="ts" setup>
import { getList } from '/@/api/news'

defineOptions({
  name: 'News',
})

const router = useRouter()
const list = ref<any>([])

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
.new-container {
  .card-body {
    position: relative;
    height: 320px;
    cursor: pointer;

    .image-group {
      height: 200px;
      overflow: hidden;

      .image {
        width: 100%;
        height: 200px;
        transition: all ease-in-out 0.3s !important;

        &:hover {
          transform: scale(1.1);
        }
      }
    }

    .full-box {
      position: absolute;
      bottom: var(--el-margin);
      color: var(--el-color-white);
    }

    .logo {
      display: flex;
      align-items: center;
      margin: 10px 15px;
      text-overflow: ellipsis;
      word-break: break-all;
      white-space: nowrap;

      .user {
        margin-left: 5px;
      }

      [class*='ri-'] {
        margin-right: 3px;
        margin-left: 5px;
      }
    }

    .title {
      margin: 10px 15px;
      overflow: hidden;
      font-size: var(--el-font-size-large);
      font-weight: 600;
      line-height: 24px;
      color: currentcolor;
    }
  }
}
</style>
