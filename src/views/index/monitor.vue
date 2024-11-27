<template>
  <div class="monitor-container no-background-container">
    <el-row :gutter="20">
      <el-col :lg="5" :md="24" :sm="24" :xl="5" :xs="24">
        <vab-card :body-style="{ padding: '20px 0 20px 20px' }" style="height: var(--el-container-height)">
          <template #header>
            <vab-icon icon="chat-1-line" />
            聊天窗口
          </template>
          <el-select v-model="value" style="width: 80px">
            <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value" />
          </el-select>
          <el-scrollbar style="height: calc(var(--el-container-height) - 160px); padding-right: 20px">
            <div class="chat-list">
              <div class="chat-item">
                <div class="chat-item-user">用户admin</div>
                <div class="chat-item-content">马上就开始了，好激动！</div>
                <div class="chat-item-time">13:09:12</div>
              </div>
              <div class="chat-item">
                <div class="chat-item-user">用户admin</div>
                <div class="chat-item-content">马上就开始了，好激动！</div>
                <div class="chat-item-time">13:09:12</div>
              </div>
              <div class="chat-item">
                <div class="chat-item-user">用户admin</div>
                <div class="chat-item-content">马上就开始了，好激动！</div>
                <div class="chat-item-time">13:09:12</div>
              </div>
              <div class="chat-item">
                <div class="chat-item-user">用户admin</div>
                <div class="chat-item-content">马上就开始了，好激动！</div>
                <div class="chat-item-time">13:09:12</div>
              </div>
              <div class="chat-item">
                <div class="chat-item-user">用户admin</div>
                <div class="chat-item-content">马上就开始了，好激动！</div>
                <div class="chat-item-time">13:09:12</div>
              </div>
            </div>
          </el-scrollbar>

          <el-form :model="form">
            <el-form-item>
              <el-input v-model="form.text" class="chat-input" />
              <el-button class="chat-send" type="primary">发送</el-button>
            </el-form-item>
          </el-form>
        </vab-card>
      </el-col>
      <el-col :lg="14" :md="24" :sm="24" :xl="14" :xs="24">
        <vab-card
          :body-style="{ padding: '0', height: 'calc(var(--el-container-height) - 207px)' }"
          style="height: calc(var(--el-container-height) - 150px)"
        >
          <template #header>
            <vab-icon icon="vidicon-line" />
            直播预览
          </template>
          <vab-player-hls :config="configHls" style="background-color: rgba(0, 0, 0, 0.87)" @player="playerInstance" />
        </vab-card>
        <vab-card style="height: 130px">
          <template #header>
            <vab-icon icon="emoji-sticker-line" />
            直播方式
          </template>
          <el-radio-group v-model="radio">
            <el-radio-button label="普通直播" value="普通直播" />
            <el-radio-button label="控流直播" value="控流直播" />
            <el-radio-button label="视频直播" value="视频直播" />
          </el-radio-group>
        </vab-card>
      </el-col>
      <el-col :lg="5" :md="24" :sm="24" :xl="5" :xs="24">
        <vab-card>
          <template #header>
            <vab-icon icon="cursor-line" />
            快捷操作
          </template>
          <el-button bg class="live-button" text type="primary">切换清晰度</el-button>
          <el-button bg class="live-button" text type="primary">主备流切换</el-button>
          <el-button bg class="live-button" text type="primary">推流垫片</el-button>
        </vab-card>
        <vab-card style="height: calc(var(--el-container-height) - 255px); min-height: 430px">
          <template #header>
            <vab-icon icon="stack-line" />
            直播状态
            <el-tag style="position: absolute; top: 15px; right: var(--el-margin)" type="success">流畅</el-tag>
          </template>

          <el-row :gutter="20">
            <el-col :span="24">
              <vab-divider content-position="left">主流</vab-divider>
            </el-col>
            <el-col :lg="12" :md="12" :sm="12" :xl="12" :xs="12">
              <div class="live-item">
                <span>码率</span>
                6 Mbps
              </div>
            </el-col>
            <el-col :lg="12" :md="12" :sm="12" :xl="12" :xs="12">
              <div class="live-item">
                <span>帧率</span>
                60
              </div>
            </el-col>
            <el-col :span="24">
              <vab-divider content-position="left">热备</vab-divider>
            </el-col>
            <el-col :lg="12" :md="12" :sm="12" :xl="12" :xs="12">
              <div class="live-item">
                <span>码率</span>
                6 Mbps
              </div>
            </el-col>
            <el-col :lg="12" :md="12" :sm="12" :xl="12" :xs="12">
              <div class="live-item">
                <span>帧率</span>
                60
              </div>
            </el-col>
            <el-col :span="24">
              <vab-divider content-position="left">冷备</vab-divider>
            </el-col>
            <el-col :lg="12" :md="12" :sm="12" :xl="12" :xs="12">
              <div class="live-item">
                <span>码率</span>
                6 Mbps
              </div>
            </el-col>
            <el-col :lg="12" :md="12" :sm="12" :xl="12" :xs="12">
              <div class="live-item">
                <span>帧率</span>
                60
              </div>
            </el-col>
            <el-col :span="24">
              <vab-divider content-position="left">画面信息</vab-divider>
            </el-col>
            <el-col :lg="12" :md="12" :sm="12" :xl="12" :xs="12">
              <div class="live-item">
                <span>线路</span>
                热备
              </div>
            </el-col>
            <el-col :lg="12" :md="12" :sm="12" :xl="12" :xs="12">
              <div class="live-item">
                <span>CDN</span>
                KS
              </div>
            </el-col>
            <el-col :lg="12" :md="12" :sm="12" :xl="12" :xs="12">
              <div class="live-item">
                <span>播放格式</span>
                Hls
              </div>
            </el-col>
            <el-col :lg="12" :md="12" :sm="12" :xl="12" :xs="12">
              <div class="live-item">
                <span>画质</span>
                原画
              </div>
            </el-col>
          </el-row>
        </vab-card>
      </el-col>
    </el-row>
  </div>
</template>

<script lang="ts" setup>
import { uniqueId } from 'lodash-es'

defineOptions({
  name: 'Monitor',
})

const configHls = reactive<any>({
  url: 'https://gcalic.v.myalicdn.com/gc/bsszjs_1/index.m3u8?contentid=2820180516001',
  id: uniqueId('uuid_hls_'),
  lang: 'zh',
  volume: 0,
  autoplay: true,
  screenShot: true,
  playbackRate: [0.5, 0.75, 1, 1.5, 2],
  width: '100%',
  height: '100%',
})
const value = ref<string>('1')
const form = reactive<any>({})
const options = [
  {
    value: '1',
    label: '全部',
  },
]
const radio = ref('普通直播')

let _Player: any

const playerInstance = (player: any) => {
  _Player = player
}

onActivated(() => {
  _Player.play()
})

onDeactivated(() => {
  _Player.pause()
})
</script>

<style lang="scss" scoped>
.monitor-container {
  .live-item {
    line-height: 28px;
    color: var(--el-color-grey);

    span {
      font-weight: bolder;
      color: var(--el-color-grey);
    }
  }

  .live-button {
    width: 100%;
    margin-bottom: var(--el-margin);
    margin-left: 0;

    &:last-child {
      margin-bottom: 0;
    }
  }

  .chat-list {
    .chat-item {
      padding: calc(var(--el-padding) / 2);
      margin-top: calc(var(--el-padding) / 2);
      line-height: 24px;
      cursor: pointer;
      border-radius: var(--el-border-radius-base);

      &:hover {
        background: var(--el-color-primary-light-9);
      }

      &-user {
        color: var(--el-color-warning);
      }

      &-content {
        color: var(--el-color-grey);
      }

      &-time {
        color: var(--el-color-grey);
      }
    }
  }

  .chat-input {
    float: left;
    width: calc(100% - 95px);
  }

  .chat-send {
    float: left;
    margin-left: 10px;
  }
}
</style>
