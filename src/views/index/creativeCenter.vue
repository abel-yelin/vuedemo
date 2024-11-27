<template>
  <div class="creative-center-container no-background-container">
    <el-row :gutter="20">
      <el-col :lg="17" :md="12" :sm="24" :xl="17" :xs="24">
        <vab-card>
          <el-row :gutter="20">
            <el-col :lg="8" :md="24" :sm="24" :xl="8" :xs="24">
              <div class="statistic-card">
                <el-statistic :value="98500">
                  <template #title>
                    <vab-icon icon="user-heart-line" />
                    粉丝数
                  </template>
                </el-statistic>
                <div class="statistic-footer">
                  <div class="footer-item">
                    <span>比昨天</span>
                    <span class="red">
                      24%
                      <el-icon>
                        <caret-top />
                      </el-icon>
                    </span>
                  </div>
                </div>
              </div>
            </el-col>
            <el-col :lg="8" :md="24" :sm="24" :xl="8" :xs="24">
              <div class="statistic-card">
                <el-statistic :value="693700">
                  <template #title>
                    <vab-icon icon="contacts-book-2-line" />
                    总阅读量
                  </template>
                </el-statistic>
                <div class="statistic-footer">
                  <div class="footer-item">
                    <span>环比</span>
                    <span class="green">
                      12%
                      <el-icon>
                        <caret-bottom />
                      </el-icon>
                    </span>
                  </div>
                </div>
              </div>
            </el-col>
            <el-col :lg="8" :md="24" :sm="24" :xl="8" :xs="24">
              <div class="statistic-card">
                <el-statistic :value="72000">
                  <template #title>
                    <vab-icon icon="money-cny-circle-line" />
                    累计收益
                  </template>
                </el-statistic>
                <div class="statistic-footer">
                  <div class="footer-item">
                    <span>比昨天</span>
                    <span class="red">
                      16%
                      <el-icon>
                        <caret-top />
                      </el-icon>
                    </span>
                  </div>
                  <div class="footer-item">
                    <el-icon :size="14">
                      <arrow-right />
                    </el-icon>
                  </div>
                </div>
              </div>
            </el-col>

            <el-col :span="24">
              <el-timeline>
                <el-timeline-item placement="top" timestamp="2023/10/14">
                  <vab-card>
                    <el-row :gutter="20">
                      <el-col class="item-content-wrap" :lg="12" :md="24" :sm="24" :xl="12" :xs="24">
                        <el-image :src="handelImage()" />
                        <p>绝佳的 vue3 + vite4 + element-plus 前端框架</p>
                      </el-col>
                      <el-col :lg="3" :md="6" :sm="6" :xl="3" :xs="6">
                        <h3>6999</h3>
                        <p>展现量</p>
                      </el-col>
                      <el-col :lg="3" :md="6" :sm="6" :xl="3" :xs="6">
                        <h3>899</h3>
                        <p>阅读量</p>
                      </el-col>
                      <el-col :lg="3" :md="6" :sm="6" :xl="3" :xs="6">
                        <h3>19</h3>
                        <p>评论量</p>
                      </el-col>
                      <el-col :lg="3" :md="6" :sm="6" :xl="3" :xs="6">
                        <h3>189</h3>
                        <p>点赞</p>
                      </el-col>
                    </el-row>
                  </vab-card>
                </el-timeline-item>
                <el-timeline-item placement="top" timestamp="2023/10/14">
                  <vab-card>
                    <el-row :gutter="20">
                      <el-col class="item-content-wrap" :lg="12" :md="24" :sm="24" :xl="12" :xs="24">
                        <el-image :src="handelImage()" />
                        <p>绝佳的 vue3 + vite4 + element-plus 前端框架</p>
                      </el-col>
                      <el-col :lg="3" :md="6" :sm="6" :xl="3" :xs="6">
                        <h3>1999</h3>
                        <p>展现量</p>
                      </el-col>
                      <el-col :lg="3" :md="6" :sm="6" :xl="3" :xs="6">
                        <h3>499</h3>
                        <p>阅读量</p>
                      </el-col>
                      <el-col :lg="3" :md="6" :sm="6" :xl="3" :xs="6">
                        <h3>9</h3>
                        <p>评论量</p>
                      </el-col>
                      <el-col :lg="3" :md="6" :sm="6" :xl="3" :xs="6">
                        <h3>29</h3>
                        <p>点赞</p>
                      </el-col>
                    </el-row>
                  </vab-card>
                </el-timeline-item>
                <el-timeline-item placement="top" timestamp="2023/10/14">
                  <vab-card>
                    <el-row :gutter="20">
                      <el-col class="item-content-wrap" :lg="12" :md="24" :sm="24" :xl="12" :xs="24">
                        <el-image :src="handelImage()" />
                        <p>绝佳的 vue3 + vite4 + element-plus 前端框架</p>
                      </el-col>
                      <el-col :lg="3" :md="6" :sm="6" :xl="3" :xs="6">
                        <h3>1999</h3>
                        <p>展现量</p>
                      </el-col>
                      <el-col :lg="3" :md="6" :sm="6" :xl="3" :xs="6">
                        <h3>499</h3>
                        <p>阅读量</p>
                      </el-col>
                      <el-col :lg="3" :md="6" :sm="6" :xl="3" :xs="6">
                        <h3>9</h3>
                        <p>评论量</p>
                      </el-col>
                      <el-col :lg="3" :md="6" :sm="6" :xl="3" :xs="6">
                        <h3>29</h3>
                        <p>点赞</p>
                      </el-col>
                    </el-row>
                  </vab-card>
                </el-timeline-item>
                <el-timeline-item placement="top" timestamp="2023/10/14">
                  <vab-card>
                    <el-row :gutter="20">
                      <el-col class="item-content-wrap" :lg="12" :md="24" :sm="24" :xl="12" :xs="24">
                        <el-image :src="handelImage()" />
                        <p>绝佳的 vue3 + vite4 + element-plus 前端框架</p>
                      </el-col>
                      <el-col :lg="3" :md="6" :sm="6" :xl="3" :xs="6">
                        <h3>1999</h3>
                        <p>展现量</p>
                      </el-col>
                      <el-col :lg="3" :md="6" :sm="6" :xl="3" :xs="6">
                        <h3>499</h3>
                        <p>阅读量</p>
                      </el-col>
                      <el-col :lg="3" :md="6" :sm="6" :xl="3" :xs="6">
                        <h3>9</h3>
                        <p>评论量</p>
                      </el-col>
                      <el-col :lg="3" :md="6" :sm="6" :xl="3" :xs="6">
                        <h3>29</h3>
                        <p>点赞</p>
                      </el-col>
                    </el-row>
                  </vab-card>
                </el-timeline-item>
              </el-timeline>
            </el-col>
          </el-row>
        </vab-card>
        <trend />
      </el-col>
      <el-col :lg="7" :md="12" :sm="24" :xl="7" :xs="24">
        <vab-card style="height: 280px">
          <template #header>
            <el-tag effect="dark">公告</el-tag>
            <span class="more">更多</span>
          </template>
          <el-scrollbar style="height: 180px">
            <ul>
              <li>
                <span>10-10</span>
                关于打击网络暴力言论的公告
              </li>
              <li>
                <span>10-10</span>
                关于打击网络暴力言论的公告
              </li>
              <li>
                <span>10-10</span>
                关于打击网络暴力言论的公告
              </li>
              <li>
                <span>10-10</span>
                关于打击网络暴力言论的公告
              </li>
              <li>
                <span>10-10</span>
                关于打击网络暴力言论的公告
              </li>
              <li>
                <span>10-10</span>
                关于打击网络暴力言论的公告
              </li>
              <li>
                <span>10-10</span>
                关于打击网络暴力言论的公告
              </li>
              <li>
                <span>10-10</span>
                关于打击网络暴力言论的公告
              </li>
              <li>
                <span>10-10</span>
                关于打击网络暴力言论的公告
              </li>
              <li>
                <span>10-10</span>
                关于打击网络暴力言论的公告
              </li>
              <li>
                <span>10-10</span>
                关于打击网络暴力言论的公告
              </li>
              <li>
                <span>10-10</span>
                关于打击网络暴力言论的公告
              </li>
            </ul>
          </el-scrollbar>
        </vab-card>
        <el-carousel height="180px" :interval="6000">
          <el-carousel-item v-for="item in 4" :key="item">
            <el-image :src="landscape" />
          </el-carousel-item>
        </el-carousel>
        <rank-list />
        <vab-card style="height: 280px">
          <template #header>
            <vab-icon icon="fire-line" />
            创做灵感
            <span class="more">更多</span>
          </template>
          <el-scrollbar style="height: 180px">
            <ul>
              <li>#程序员未来的出路在哪里？#</li>
              <li>#程序员未来的出路在哪里？#</li>
              <li>#程序员未来的出路在哪里？#</li>
              <li>#程序员未来的出路在哪里？#</li>
              <li>#程序员未来的出路在哪里？#</li>
              <li>#程序员未来的出路在哪里？#</li>
              <li>#程序员未来的出路在哪里？#</li>
              <li>#程序员未来的出路在哪里？#</li>
            </ul>
          </el-scrollbar>
        </vab-card>
      </el-col>
    </el-row>
  </div>
</template>

<script lang="ts" setup>
import { ArrowRight, CaretBottom, CaretTop } from '@element-plus/icons-vue'
import { random } from 'lodash-es'
import landscape from '/@/assets/common_images/landscape.jpg'

defineOptions({
  name: 'CreativeCenter',
})

const handelImage = () => {
  return `https://gcore.jsdelivr.net/gh/zxwk1998/image/table/vab-image-${random(1, 38)}.jpg`
}
</script>

<style lang="scss" scoped>
.creative-center-container {
  .item-content-wrap {
    display: flex;
    align-items: center;
    justify-items: center;

    :deep() {
      .el-image {
        width: 80px;
        margin-right: 15px;
        border-radius: var(--el-border-radius-base);
      }
    }
  }

  .el-statistic {
    --el-statistic-content-font-size: 28px;
  }

  .statistic-card {
    height: 100%;
    padding: var(--el-padding);
    background-color: var(--el-bg-color-overlay);
    border-radius: 4px;

    :deep() {
      .el-statistic__head {
        margin-bottom: var(--el-margin);

        [class*='ri'] {
          margin-top: -1.5px;
          margin-right: 3px;
        }

        .ri-user-heart-line {
          color: var(--el-color-danger);
        }

        .ri-contacts-book-2-line {
          color: var(--el-color-primary);
        }

        .ri-money-cny-circle-line {
          color: var(--el-color-warning);
        }
      }

      .el-statistic__head,
      .el-statistic__content {
        display: flex;
        flex-wrap: wrap;
        align-items: center;
        justify-content: center;
      }
    }

    .statistic-footer {
      display: flex;
      flex-wrap: wrap;
      align-items: center;
      justify-content: center;
      margin-top: var(--el-margin);
      font-size: var(--el-font-size-extra-small);
      color: var(--el-text-color-regular);

      .footer-item {
        display: flex;
        align-items: center;
        justify-content: center;

        span:last-child {
          display: inline-flex;
          align-items: center;
          margin-left: 4px;
        }
      }

      .green {
        color: var(--el-color-success);
      }

      .red {
        color: var(--el-color-error);
      }
    }
  }

  :deep() {
    .el-card {
      ul {
        padding: 0;
        margin: 0;
        line-height: 30px;
        list-style: none;

        span {
          color: var(--el-color-grey);
        }
      }

      .el-card__header {
        .more {
          position: absolute;
          right: var(--el-margin);
          cursor: pointer;
        }
      }
    }

    .el-carousel {
      margin-bottom: 20px;
      border-radius: var(--el-border-radius-base);

      &__item {
        .el-image {
          width: 100%;
          object-fit: fill;
        }
      }
    }
  }
}
</style>
