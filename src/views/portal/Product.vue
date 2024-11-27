<template>
  <el-scrollbar wrap-class="scroll-wrap-product">
    <div class="product-main">
      <portal-header active-menu="product" />
      <div class="banner">
        <main>
          <div class="banner-title">企业级中后台前端框架</div>
          <div class="banner-description">
            便捷式全域数据采集，全域用户行为分析，深耕科学营销运营应用，智能化洞察用户行为，全方位驱动企业数字化经营。
          </div>

          <el-button
            href="https://vuejs-core.cn/authorization/shop-vite.html"
            rel="noopener noreferrer"
            tag="a"
            target="_blank"
            type="primary"
          >
            立即购买
          </el-button>
          <el-button href="https://vuejs-core.cn/shop-vite" plain rel="noopener noreferrer" tag="a" target="_blank" type="primary">
            进入产品
          </el-button>

          <div class="image-bg hidden-xs-only"></div>
          <el-image class="hidden-xs-only" :src="logo" />
        </main>
      </div>

      <main>
        <div class="news-box hidden-xs-only">
          <div v-for="item in list2" :key="item.title" class="news-box-item">
            <a class="news-box-title">{{ item.title }}</a>
            <div class="news-box-description">{{ item.description }}</div>
          </div>
        </div>

        <div class="intro-box">
          <div class="intro-box-title">客户数据平台解决方案，助力企业数字化营销运营增长</div>
          <div class="intro-box-description">
            为企业打造全端数据管理平台，提供全域用户行为洞见，实现数据驱动营销和运营决策，全场景赋能企业数字化经营，驱动业务持续增长
          </div>

          <el-row :gutter="20" style="margin-top: 50px">
            <el-col v-for="item in list" :key="item.title" :lg="8" :md="8" :sm="24" :xl="8" :xs="24">
              <div class="solution-box">
                <div class="solution-box-item">
                  <div class="solution-box-title">{{ item.title }}</div>
                  <div class="solution-box-description">{{ item.description }}</div>
                </div>
                <vab-icon :icon="item.icon" is-custom-svg />
              </div>
            </el-col>
          </el-row>
        </div>
        <portal-divider active-menu="product" />
      </main>

      <vab-footer />
    </div>

    <div class="hidden-sm-and-up"></div>
    <el-backtop target="#app .scroll-wrap-product" />
    <vab-theme-setting />
  </el-scrollbar>
</template>

<script lang="ts" setup>
import logo from '/@/assets/avatar.svg'

defineOptions({
  name: 'Product',
})

const list = ref<any>([
  {
    title: '商务服务',
    description: '全生命周期服务管理',
    icon: 'lllustration/IconPark03',
  },
  {
    title: '在线零售',
    description: '打造全域营销运营闭环',
    icon: 'lllustration/IconPark05',
  },
  {
    title: '珠宝首饰',
    description: '沉淀私域消费者数据资产',
    icon: 'lllustration/IconPark07',
  },
  {
    title: '商用软件',
    description: '深度洞察企业客户需求',
    icon: 'lllustration/IconPark08',
  },
  {
    title: '消费电子',
    description: '用户精准营销与智能触达通路',
    icon: 'lllustration/IconPark04',
  },
  {
    title: '智能家居',
    description: '智能家居场景化运营',
    icon: 'lllustration/IconPark02',
  },
])

const list2 = ref<any>([
  {
    title: '全链路监控营销推广',
    description: '全链路监控营销推广',
  },
  {
    title: '全方位优化产品体验',
    description: '全方位优化产品体验',
  },
  {
    title: '精准刻画用户画像',
    description: '精准刻画用户画像',
  },
])
</script>

<style lang="scss" scoped>
.product-main {
  @media screen and (max-width: 768px) {
    .banner {
      height: 370px !important;

      &-title {
        margin-top: 100px !important;
        font-size: 26px !important;
      }
    }

    main {
      width: 100% !important;
      padding: var(--el-padding) !important;

      .intro-box {
        margin-top: 0 !important;

        &-title {
          font-size: 26px !important;
        }
      }
    }
  }

  .banner {
    position: relative;
    width: 100%;
    height: 480px;
    background: var(--el-color-primary-light-9);

    &-title {
      margin-top: 150px;
      margin-bottom: 12px;
      font-size: 40px;
      font-weight: 600;
      line-height: 60px;
      color: #000;
    }

    &-description {
      margin-bottom: 40px;
      font-size: 16px;
      line-height: 20px;
    }

    .image-bg {
      position: absolute;
      top: 150px;
      right: 30px;
      width: 192px;
      height: 192px;
      background-image: linear-gradient(-45deg, #bd34fe 50%, #47caff 50%);
      filter: blur(40px);
      border-radius: 50%;
    }

    :deep() {
      .el-image {
        position: absolute;
        top: 155px;
        right: 35px;
        width: 170px;
      }
    }
  }

  main {
    position: relative;
    width: 1152px;
    min-height: calc(var(--vh, 1vh) * 100 - 550px);
    padding: 10px 0 0 0;
    margin-right: auto;
    margin-left: auto;

    .news-box {
      position: absolute;
      top: -60px;
      left: 50%;
      box-sizing: border-box;
      display: flex;
      align-items: center;
      width: 1200px;
      height: 120px;
      padding: 40px 0;
      background-color: rgba(255, 255, 255, 0.6);
      -webkit-backdrop-filter: blur(20px);
      backdrop-filter: blur(20px);
      border: 1.5px solid #fff;
      border-radius: 15px;
      box-shadow: 0 4px 33px rgba(190, 196, 207, 0.28);
      transform: translate(-50%, 0);
      -ms-flex-align: center;

      &-item {
        box-sizing: border-box;
        width: 33.3%;
        padding: 0 30px;
        border-right: 1px solid var(--el-border-color);

        &:last-child {
          border-right: 0;
        }
      }

      &-title {
        display: inline-block;
        margin-bottom: 12px;
        font-size: 16px;
        font-weight: 500;
        line-height: 22px;
        color: #282c33;
        cursor: pointer;

        &:hover {
          color: #0054e6;
        }
      }

      &-description {
        line-height: 20px;
        color: #848b99;
      }
    }

    .intro-box {
      position: relative;
      margin-top: 100px;

      &-title {
        margin-bottom: 16px;
        font-size: 36px;
        font-weight: 600;
        line-height: 50px;
        color: #0a0b0d;
        text-align: center;
      }

      &-description {
        margin: 0 auto;
        font-size: 16px;
        line-height: 28px;
        color: #545b66;
        text-align: center;
      }
    }

    .solution-box {
      position: relative;
      box-sizing: border-box;
      display: flex;
      align-items: center;
      justify-content: space-between;
      width: 100%;
      height: 180px;
      padding: 0 16px 0 26px;
      margin-bottom: 32px;
      cursor: pointer;
      background-color: rgba(255, 255, 255, 0.6);
      border-radius: 10px;
      box-shadow: 0 12px 18px 2px rgba(204, 204, 204, 0.17);
      transition: transform 0.3s ease-out;

      &:hover {
        transform: translateY(-20px);
      }

      &-title {
        margin-bottom: 16px;
        font-size: var(--el-font-size-extra-large);
        font-weight: 500;
        line-height: 28px;
      }

      &-description {
        line-height: 22px;
        color: #848b99;
      }

      :deep() {
        .vab-icon {
          width: 100px;
          height: 100px;
          margin-right: 0;
        }
      }
    }
  }
}

:deep() {
  .vab-footer {
    margin-top: 0;
    background: var(--el-background-color);
    border: 0;
  }

  .vab-theme-setting {
    section {
      > div {
        &:nth-child(1),
        &:nth-child(2),
        &:nth-child(3),
        &:nth-child(4) {
          display: none;
        }
      }
    }
  }
}
</style>
