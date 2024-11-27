<template>
  <div class="news-detail-container">
    <el-page-header content="详情" title="返回上一页" @back="goBack">
      <template #extra>
        <vab-fullscreen />
      </template>
    </el-page-header>
    <div class="title">
      {{ route.query.title }}
    </div>
    <div class="logo">
      <el-avatar :size="18" :src="route.query.logo as string" />
      <div class="user">{{ route.query.user }}</div>
      <vab-icon icon="time-line" />
      <div class="time">{{ route.query.time }}</div>
    </div>

    <img alt="" class="image" :src="route.query.image as string" />
    <article class="article">
      {{ route.query.content }}
    </article>
  </div>
</template>

<script lang="ts" setup>
import { useTabsStore } from '/@/store/modules/tabs'
import { handleActivePath } from '/@/utils/routes'

defineOptions({
  name: 'NewsDetail',
})

const route = useRoute()
const tabsStore = useTabsStore()
const { delVisitedRoute } = tabsStore

const goBack = async () => {
  await delVisitedRoute(handleActivePath(route, true))
  await history.back()
}
</script>

<style lang="scss" scoped>
.news-detail-container {
  .title {
    margin: var(--el-margin);
    overflow: hidden;
    font-size: var(--el-font-size-large);
    font-weight: 600;
    line-height: 24px;
    color: currentcolor;
    text-align: center;
  }

  .logo {
    display: flex;
    align-items: center;
    justify-content: center;
    margin: 20px 15px;
    text-align: center;
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

  .image {
    width: 100%;
    height: 400px;
    object-fit: cover;
  }

  .article {
    margin: var(--el-margin);
    line-height: 30px;
    text-align: justify;
    text-indent: 2em;
  }
}
</style>
