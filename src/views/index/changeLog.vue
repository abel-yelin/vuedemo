<template>
  <div class="change-log-container no-background-container auto-height-container">
    <el-row :gutter="20">
      <el-col :lg="15" :md="24" :sm="24" :xl="12" :xs="24">
        <vab-card class="auto-height-card has-header" skeleton :skeleton-rows="16">
          <template #header>
            <vab-icon icon="file-word-line" />
            更新日志

            <el-button class="card-header-button" type="primary" @click="update">检查更新</el-button>
          </template>

          <vab-alert
            v-if="servicesVersion === version"
            :title="
              loading
                ? '正在检查更新...'
                : '当前已是最新版本，您可以手动按下键盘Ctrl（Command） + Shift + R 刷新页面，以保证您第一时间获得网站的更新内容'
            "
            type="info"
          />
          <vab-alert
            v-else
            :title="
              loading
                ? '正在检查更新...'
                : `检测到新版本V${servicesVersion}！请手动按下键盘Ctrl（Command） + Shift + R 刷新页面，以保证您第一时间获得网站的更新内容`
            "
            type="info"
          />
          <el-scrollbar style="height: calc(100% - 60px)">
            <el-timeline>
              <el-timeline-item v-for="(item, index) in activities" :key="index" :color="item.color" :timestamp="item.timestamp">
                <template v-if="item.waver" #dot>
                  <vab-dot :type="item.waver" />
                </template>
                <vab-card v-if="item.card">
                  <div class="change-log-item" v-html="item.content"></div>
                </vab-card>
                <template v-else>
                  <div class="change-log-item" v-html="item.content"></div>
                </template>
              </el-timeline-item>
            </el-timeline>
          </el-scrollbar>
        </vab-card>
      </el-col>
    </el-row>
  </div>
</template>

<script lang="ts" setup>
import dayjs from 'dayjs'
import { version } from '~/package.json'
import { getList } from '/@/api/changeLog'
// import { useRoutesStore } from '/@/store/modules/routes'

defineOptions({
  name: 'ChangeLog',
})

// const routesStore = useRoutesStore()
// const { changeMenuMeta } = routesStore
const lastTime = dayjs().format('YYYY-M-D')
const commonUrl = `https://vuejs-core.cn`
const activities = ref<any[]>([])

const servicesVersion = ref<any>(version)
const loading = ref<boolean>(false)

interface Log {
  timestamp: string
  content: string
}

const sortLogs = (logs: Log[]): Log[] => {
  return logs.sort((a, b) => {
    const d1 = new Date(a.timestamp)
    const d2 = new Date(b.timestamp)

    if (d1 < d2) {
      return 1
    } else if (d1 > d2) {
      return -1
    } else {
      return 0
    }
  })
}

onBeforeMount(async () => {
  const { data } = await getList()
  // const _data = data.map((obj: any) => {
  //   return { ...obj, color: 'var(--el-timeline-node-color)' }
  // })

  const _data: any = sortLogs(data)
  _data[0].timestamp = lastTime
  _data.unshift({
    timestamp: lastTime,
    content: `
    小版本更新日志及bug修复日志演示地址不做展示，具体更新内容请购买后前往绑定仓库查看，
    <a href='${commonUrl}/authorization/shop-vite.html' target='_blank'>点我购买</a>
    `,
    waver: 'success',
  })
  activities.value = _data
  // changeMenuMeta({
  //   name: 'ChangeLog',
  //   meta: { badge: _data.length },
  // })
})

// 正式项目如果要用到更新日志模板，请删除以下代码
onMounted(() => {
  if (!['localhost', '127', '192', 'vuejs-core'].some((host) => location.hostname.includes(host)))
    $baseMessage('检测到当前演示地址非官方演示地址，即将为您跳转，请稍后', 'warning', 'hey', () => {
      location.href = 'https://vuejs-core.cn/shop-vite/#/changeLog'
    })
})

const fetchData = async () => {
  loading.value = true
  const {
    data: { version },
  } = await axios({
    url: `./vue-shop-vite-version.json` + `?t=${Date.now()}`,
    method: 'get',
  })
  servicesVersion.value = version
  setTimeout(() => {
    loading.value = false
  }, 300)
  return version
}

const update = async () => {
  const _servicesVersion = await fetchData()
  version === _servicesVersion
    ? $baseMessage('当前已是最新版本', 'success', 'hey')
    : $baseAlert(
        '请手动按下键盘Ctrl（Command） + Shift + R 刷新页面，以保证您第一时间获得网站的更新内容',
        `检测到新版本V${_servicesVersion}`,
        () => {
          $pub('update-website', _servicesVersion)
        }
      )
}

onBeforeMount(() => {
  if (location.hostname !== 'localhost' && !location.hostname.includes('127') && !location.hostname.includes('192')) {
    update()
  }
})
</script>

<style lang="scss" scoped>
.change-log-container {
  .change-log-item {
    line-height: 24px;
  }

  :deep() {
    .el-timeline {
      padding: 10px;

      &-item__dot {
        .vab-dot {
          left: -1px;
          width: 12px;
          height: 12px;
          margin: auto !important;
        }
      }
    }
  }
}
</style>
