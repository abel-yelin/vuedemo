<template>
  <div class="iot-container">
    <div class="hidden-sm-and-up" style="padding: var(--el-padding)">
      <vab-alert title="手机端不支持物联网演示" type="warning" />
    </div>
    <div class="hidden-xs-only">
      <div class="left-panel">
        <el-avatar :size="50" :src="avatar" />
        <div class="username">{{ username }}</div>
        <ul class="menu">
          <li v-for="(item, index) in menuList" :key="index" :class="item.active ? 'menu-item-active' : ''" @click="openWindow(item)">
            <vab-icon :icon="item.icon" />
            <div>{{ item.title }}</div>
          </li>
        </ul>
      </div>
      <el-scrollbar>
        <div class="right-panel">
          <div class="right-panel-content">
            <el-row :gutter="20">
              <el-col :span="16">
                <el-row :gutter="20">
                  <el-col :lg="24">
                    <vab-card
                      :body-style="{
                        height: '160px',
                      }"
                      class="top-card"
                    >
                      <page-header />
                    </vab-card>
                  </el-col>
                  <el-col v-for="(item, index) in iotList" :key="index" :span="8">
                    <vab-card class="left-card" @click="handleAlert">
                      <div>{{ item.title }}</div>
                      <el-image :src="item.icon" />
                    </vab-card>
                  </el-col>
                </el-row>
              </el-col>
              <el-col :span="8">
                <el-row :gutter="20">
                  <el-col v-for="(item, index) in serviceList" :key="index" :span="12">
                    <vab-card class="right-card">
                      <h3>{{ item.title }}</h3>
                      <vab-icon :icon="item.icon" is-custom-svg />
                      <el-button plain round size="large" @click="handleAlert">
                        点击跳转
                        <el-icon class="el-icon--right">
                          <arrow-right />
                        </el-icon>
                      </el-button>
                    </vab-card>
                  </el-col>
                </el-row>
              </el-col>
            </el-row>
          </div>
        </div>
      </el-scrollbar>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ArrowRight } from '@element-plus/icons-vue'
import iot_1 from '/@/assets/iot_images/iot_1.png'
import iot_2 from '/@/assets/iot_images/iot_2.png'
import iot_3 from '/@/assets/iot_images/iot_3.png'
import iot_4 from '/@/assets/iot_images/iot_4.png'
import iot_5 from '/@/assets/iot_images/iot_5.png'
import iot_6 from '/@/assets/iot_images/iot_6.png'
import { useUserStore } from '/@/store/modules/user'

defineOptions({
  name: 'Iot',
})

interface MenuListType {
  icon: string
  title: string
  path: string
  active?: boolean
}

interface IotListType {
  icon: string
  title: string
}

interface ServiceListType {
  icon: string
  title: string
}

const userStore = useUserStore()
const { avatar, username } = storeToRefs(userStore)
const router = useRouter()
const menuList = ref<MenuListType[]>([
  {
    icon: 'earthquake-fill',
    title: '物联网',
    path: '/iot',
    active: true,
  },
  {
    icon: 'building-line',
    title: '门户',
    path: '/portal',
  },
  {
    icon: 'database-2-line',
    title: '数据大屏',
    path: '/dataScreen',
  },
  {
    icon: 'admin-fill',
    title: '后台管理',
    path: '/index',
  },
])
const iotList = ref<IotListType[]>([
  {
    title: '空调',
    icon: iot_1,
  },
  {
    title: '扫地机器人',
    icon: iot_2,
  },
  {
    title: '摄像头',
    icon: iot_3,
  },
  {
    title: '空气净化器',
    icon: iot_4,
  },
  {
    title: '灯',
    icon: iot_5,
  },
  {
    title: '门锁',
    icon: iot_6,
  },
])
const serviceList = ref<ServiceListType[]>([
  { title: '数据看板', icon: 'article' },
  { title: '日志查询', icon: 'wtt' },
  { title: '模组', icon: 'video' },
  { title: '服务商', icon: 'wenda' },
])

const openWindow = (item: MenuListType) => {
  router.push(item.path)
}

const handleAlert = () => {
  $baseAlert('敬请期待！')
}

onMounted(() => {
  document.querySelectorAll('body')[0].className = ''
})
</script>

<style lang="scss" scoped>
$breakpoints: (480px 95%, 768px 95%, 960px 95%, 1280px 95%, 1440px 95%, 1680px 95%, 1920px 80%, 2560px 70%);
.iot-container {
  position: fixed;
  inset: 0;
  z-index: var(--el-z-index);
  padding: 0 !important;
  margin: 0 !important;
  background-image: linear-gradient(to bottom, #4f6479, #b6bcc4) !important;
  transition: var(--el-transition);

  * {
    transition: var(--el-transition);
  }

  .left-panel {
    position: fixed;
    top: 0;
    bottom: 0;
    left: 0;
    z-index: var(--el-z-index);
    width: 80px;
    color: var(--el-color-white);
    text-align: center;
    background-image: linear-gradient(to bottom, rgba(0, 0, 0, 0.3), rgba(0, 0, 0, 0.2)) !important;

    :deep() {
      .el-avatar {
        padding: 5px;
        margin-top: 15px;
        background: none !important;
        border-radius: 50%;
      }
    }

    .username {
      color: var(--el-color-white);
    }

    .menu {
      padding: 0;
      list-style: none;

      li {
        display: flex;
        flex-wrap: wrap;
        align-items: center;
        justify-content: center;
        width: 100px;
        padding-top: 5px;
        padding-right: 20px;
        padding-bottom: 5px;
        margin-bottom: 10px;
        cursor: pointer;

        &:hover,
        &.menu-item-active {
          color: var(--el-color-primary);
          background-color: var(--el-color-white);
          border-top-right-radius: 50px;
          border-bottom-right-radius: 50px;

          [class*='ri-'] {
            color: var(--el-color-primary);
          }
        }

        [class*='ri-'] {
          width: 100%;
          font-size: var(--el-font-size-extra-large);
        }
      }
    }
  }

  .right-panel {
    display: flex;
    align-items: center;
    justify-content: center;
    width: calc(100vw - 80px);
    height: calc(var(--vh, 1vh) * 100);
    margin-left: 80px;

    &-content {
      display: flex;
      align-items: center;
      min-height: 80vh;
      margin: auto;
      border-radius: 15px;

      @each $bp, $width in $breakpoints {
        @media (min-width: $bp) {
          width: $width;
        }
      }

      .top-card {
        background: transparent;
      }

      .left-card {
        color: #f2f2f2;
        background: rgba(255, 255, 255, 0.3);

        :deep() {
          .el-card__body {
            height: 160px;
          }

          .el-image {
            display: block;
            width: 100px;
            margin: auto;
          }
        }
      }

      .right-card {
        background: rgba(255, 255, 255, 0.3);

        h3 {
          margin-top: 0;
          color: #f2f2f2;
        }

        :deep() {
          .el-card__body {
            position: relative;
            height: 250px;
          }

          .el-button {
            &--large {
              &.is-plain {
                &.is-round {
                  position: absolute;
                  right: var(--el-margin);
                  bottom: var(--el-margin);
                  color: var(--el-color-white);
                  background-image: linear-gradient(to left, #718391, #9ba5b2) !important;
                  border: 1px solid #9ba5b2;

                  &:hover {
                    border: 1px solid var(--el-color-white);
                  }
                }
              }
            }
          }

          [class*='vab-icon'] {
            width: 140px;
            height: 140px;
            color: var(--el-color-grey);
            cursor: pointer;
            background-image: linear-gradient(to left, var(--el-color-grey), #718391) !important;
            background-clip: text;
            transition: all 0.3s;
            -webkit-text-fill-color: transparent;
          }

          &:hover {
            [class*='vab-icon'] {
              transition: all 0.3s;
              scale: 1.2;
            }
          }
        }
      }

      :deep() {
        > .el-row {
          width: calc(100% + 20px);

          .el-card {
            border: 0;
            border-radius: 15px;
          }

          .page-header {
            margin-left: -40px;
            background: transparent !important;
            border: 0 !important;

            .el-card__body {
              background-color: transparent !important;

              .el-avatar {
                display: none;
              }

              * {
                color: var(--el-color-white) !important;
              }

              .page-header-tip-title {
                margin-bottom: 10px;
                font-size: calc(var(--el-font-size-extra-large) + 4px) !important;
              }
            }
          }
        }
      }
    }
  }
}
</style>
