<template>
  <div class="tile-container no-background-container">
    <div class="tile-box">
      <el-row :gutter="20">
        <el-col :lg="9" :md="24" :sm="24" :xl="9" :xs="24">
          <vab-card
            :body-style="{
              height: '222px',
            }"
          >
            <vab-link target="_blank" to="/portal">
              <div class="tile-title">
                <vab-icon icon="building-line" />
                <span>门户</span>
              </div>
              <vab-icon class="tile-svg" icon="lllustration/Scenes02" is-custom-svg />
            </vab-link>
          </vab-card>
        </el-col>
        <el-col :lg="5" :md="24" :sm="24" :xl="5" :xs="24">
          <vab-card
            :body-style="{
              height: '100px',
            }"
          >
            <vab-link target="_blank" to="/dataScreen">
              <div class="icon-panel">
                <vab-icon icon="database-2-line" style="background: var(--el-color-primary)" />
                <div class="icon-panel-title">
                  数据大屏
                  <div class="icon-panel-tips">点击跳转</div>
                </div>
              </div>
            </vab-link>
          </vab-card>

          <vab-card
            :body-style="{
              height: '100px',
            }"
          >
            <vab-link target="_blank" to="/other/video">
              <div class="icon-panel">
                <vab-icon icon="video-line" style="background: var(--el-color-warning)" />
                <div class="icon-panel-title">
                  视频播放器
                  <div class="icon-panel-tips">点击跳转</div>
                </div>
              </div>
            </vab-link>
          </vab-card>
        </el-col>
        <el-col :lg="5" :md="24" :sm="24" :xl="5" :xs="24">
          <vab-card
            :body-style="{
              height: '100px',
            }"
          >
            <vab-link target="_blank" to="/vab/table/customTable">
              <div class="icon-panel">
                <vab-icon icon="table-2" style="background: var(--el-color-success)" />
                <div class="icon-panel-title">
                  自定义表格
                  <div class="icon-panel-tips">点击跳转</div>
                </div>
              </div>
            </vab-link>
          </vab-card>
          <vab-card
            :body-style="{
              height: '100px',
            }"
          >
            <vab-link target="_blank" to="/other/echarts">
              <div class="icon-panel">
                <vab-icon icon="bubble-chart-line" style="background: var(--el-color-danger)" />
                <div class="icon-panel-title">
                  图表
                  <div class="icon-panel-tips">点击跳转</div>
                </div>
              </div>
            </vab-link>
          </vab-card>
        </el-col>
        <el-col :lg="5" :md="24" :sm="24" :xl="5" :xs="24">
          <vab-card
            :body-style="{
              height: '100px',
            }"
          >
            <vab-link target="_blank" to="/other/gantt">
              <div class="icon-panel">
                <vab-icon icon="organization-chart" style="background: #6954f0" />
                <div class="icon-panel-title">
                  甘特图
                  <div class="icon-panel-tips">点击跳转</div>
                </div>
              </div>
            </vab-link>
          </vab-card>
          <vab-card
            :body-style="{
              height: '100px',
            }"
          >
            <vab-link target="_blank" to="/other/workflow">
              <div class="icon-panel">
                <vab-icon icon="flow-chart" style="background: #16baa9" />
                <div class="icon-panel-title">
                  工作流
                  <div class="icon-panel-tips">点击跳转</div>
                </div>
              </div>
            </vab-link>
          </vab-card>
        </el-col>
        <el-col :lg="8" :md="24" :sm="24" :xl="8" :xs="24">
          <vab-card
            :body-style="{
              height: '100px',
            }"
          >
            <vab-link target="_blank" to="/operate/randomTheme">
              <div class="icon-panel">
                <vab-icon icon="ai-generate" style="background: var(--el-color-primary)" />
                <div class="icon-panel-title">
                  随机换肤
                  <div class="icon-panel-tips">点击跳转</div>
                </div>
              </div>
            </vab-link>
          </vab-card>
        </el-col>
        <el-col :lg="8" :md="24" :sm="24" :xl="8" :xs="24">
          <vab-card
            :body-style="{
              height: '100px',
            }"
          >
            <vab-link target="_blank" to="/operate/permission">
              <div class="icon-panel">
                <vab-icon icon="user-3-line" style="background: var(--el-color-danger)" />
                <div class="icon-panel-title">
                  角色权限
                  <div class="icon-panel-tips">点击跳转</div>
                </div>
              </div>
            </vab-link>
          </vab-card>
        </el-col>
        <el-col :lg="8" :md="24" :sm="24" :xl="8" :xs="24">
          <vab-card
            :body-style="{
              height: '100px',
            }"
          >
            <vab-link target="_blank" to="/chat/chatGPT">
              <div class="icon-panel">
                <vab-icon icon="openai-line" style="background: #0fa47f" />
                <div class="icon-panel-title">
                  chatGPT
                  <div class="icon-panel-tips">点击跳转</div>
                </div>
              </div>
            </vab-link>
          </vab-card>
        </el-col>
      </el-row>
    </div>
  </div>
</template>

<script lang="ts" setup>
defineOptions({
  name: 'Tile',
})
</script>

<style lang="scss" scoped>
$breakpoints: (480px 100%, 768px 100%, 960px 100%, 1280px 90%, 1440px 80%, 1680px 75%, 1920px 70%, 2560px 60%);

.tile-container {
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: var(--el-border-radius-base);
  transition: var(--el-transition) !important;

  :deep() {
    * {
      transition: var(--el-transition) !important;
    }
  }

  .tile-box {
    position: relative;

    @each $bp, $width in $breakpoints {
      @media (min-width: $bp) {
        width: $width;
      }
    }

    //  padding: var(--el-padding) var(--el-padding) 0 var(--el-padding);
    // background: var(--el-color-white);
    // border: 1px solid var(--el-border-color);
    // border-radius: var(--el-border-radius-base);

    .tile-title {
      font-size: var(--el-font-size-large);

      span {
        margin-left: 3px;
      }
    }

    .tile-svg {
      position: absolute;
      right: -40px;
      bottom: 10px;
      width: auto;
      height: 200px;
    }

    a {
      position: absolute;
      inset: 0;
      display: block;
      width: 100%;
      height: 100%;
      padding: var(--el-padding);
      color: var(--el-color-grey);
    }

    .icon-panel {
      display: flex;
      flex-wrap: nowrap;
      align-items: center;

      i {
        flex-shrink: 0;
        width: 60px;
        height: 60px;
        font-size: 30px;
        line-height: 60px;
        color: var(--el-color-white);
        background: var(--el-color-primary);
        border-radius: var(--el-border-radius-base);
      }

      .icon-panel-title {
        display: inline-block;
        margin-left: 10px;
        overflow: hidden;
        line-height: 20px;
        color: var(--el-color-grey);
        text-overflow: ellipsis;
        white-space: nowrap;

        .icon-panel-tips {
          font-size: var(--el-font-size-extra-small);
          color: var(--el-color-grey);
        }
      }
    }

    :deep() {
      .el-card {
        &:hover {
          border: 1px solid var(--el-color-primary) !important;
        }

        &__body {
          position: relative;
          z-index: 1;
          overflow: hidden;
          cursor: pointer;

          &::before {
            position: absolute;
            right: 100%;
            bottom: 100%;
            z-index: -1;
            width: 100%;
            height: 230px;
            content: '';
            background: var(--el-color-primary-light-9);
            border-radius: 50%;
            transition: transform 0.8s ease-in-out !important;
            transform: translate3d(50%, 50%, 0) scale3d(0, 0, 0);
            transform-origin: center;
          }

          &:hover {
            .tile-title {
              color: var(--el-color-primary);
            }

            .icon-panel-title {
              color: var(--el-color-primary);

              .icon-panel-tips {
                color: currentColor;
              }
            }

            &::before {
              transform: translate3d(50%, 50%, 0) scale3d(15, 15, 15);
            }
          }
        }
      }
    }
  }
}
</style>
