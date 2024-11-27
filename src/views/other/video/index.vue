<template>
  <div class="video-container no-background-container">
    <el-row :gutter="20">
      <el-col>
        <vab-card>
          <el-form class="demo-form-inline" :inline="true">
            <el-form-item label="换肤" label-width="40">
              <vab-color-picker />
            </el-form-item>
          </el-form>
        </vab-card>
      </el-col>
      <el-col :lg="12" :md="24" :sm="24" :xl="12" :xs="24">
        <vab-card title="Mp4">
          <vab-player :config="configMp4" style="background-color: rgba(0, 0, 0, 0.87)" @player="playerInstance0" />
        </vab-card>
      </el-col>
      <el-col :lg="12" :md="24" :sm="24" :xl="12" :xs="24">
        <vab-card title="直播推流">
          <el-row :gutter="1">
            <el-col :lg="12" :md="12" :sm="12" :xl="12" :xs="24">
              <vab-player-hls :config="configHls1" style="background-color: rgba(0, 0, 0, 0.87)" @player="playerInstance1" />
            </el-col>
            <el-col :lg="12" :md="24" :sm="24" :xl="12" :xs="24">
              <vab-player-hls :config="configHls2" style="background-color: rgba(0, 0, 0, 0.87)" @player="playerInstance2" />
            </el-col>
          </el-row>
          <el-row :gutter="1">
            <el-col :lg="12" :md="12" :sm="12" :xl="12" :xs="24">
              <vab-player-hls :config="configHls3" style="background-color: rgba(0, 0, 0, 0.87)" @player="playerInstance3" />
            </el-col>
            <el-col :lg="12" :md="12" :sm="12" :xl="12" :xs="24">
              <vab-player-hls :config="configHls4" style="background-color: rgba(0, 0, 0, 0.87)" @player="playerInstance4" />
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
  name: 'Video',
})

// const route = useRoute()
// const isLeft = usePageLeave()
const configMp4 = reactive<any>({
  url: 'https://gcore.jsdelivr.net/gh/zxwk1998/videos@master/video.mp4',
  id: uniqueId('uuid_mp4_'),
  lang: 'zh',
  volume: 0,
  autoplay: true,
  screenShot: true,
  playbackRate: [0.5, 0.75, 1, 1.5, 2],
  fluid: true,
})

const configHls1 = reactive<any>({
  url: 'https://gctxyc.liveplay.myqcloud.com/gc/emsyh_1/index.m3u8?contentid=2820180516001',
  id: uniqueId('uuid_hls_'),
  lang: 'zh',
  volume: 0,
  autoplay: true,
  screenShot: true,
  playbackRate: [0.5, 0.75, 1, 1.5, 2],
  fluid: true,
})

const configHls2 = reactive<any>({
  url: 'https://gcalic.v.myalicdn.com/gc/bsszjs_1/index.m3u8?contentid=2820180516001',
  id: uniqueId('uuid_hls_'),
  lang: 'zh',
  volume: 0,
  autoplay: true,
  screenShot: true,
  playbackRate: [0.5, 0.75, 1, 1.5, 2],
  fluid: true,
})

const configHls3 = reactive<any>({
  url: 'https://gctxyc.liveplay.myqcloud.com/gc/tyhjtys_1/index.m3u8?contentid=2820180516001',
  id: uniqueId('uuid_hls_'),
  lang: 'zh',
  volume: 0,
  autoplay: true,
  screenShot: true,
  playbackRate: [0.5, 0.75, 1, 1.5, 2],
  fluid: true,
})

const configHls4 = reactive<any>({
  url: 'https://gctxyc.liveplay.myqcloud.com/gc/emsarm_1/index.m3u8?contentid=2820180516001',
  id: uniqueId('uuid_'),
  lang: 'zh',
  volume: 0,
  autoplay: true,
  screenShot: true,
  playbackRate: [0.5, 0.75, 1, 1.5, 2],
  fluid: true,
})

let _Player0: any

const playerInstance0 = (Player: any) => {
  _Player0 = Player
}

let _Player1: any

const playerInstance1 = (Player: any) => {
  _Player1 = Player
}

let _Player2: any

const playerInstance2 = (Player: any) => {
  _Player2 = Player
}

let _Player3: any

const playerInstance3 = (Player: any) => {
  _Player3 = Player
}

let _Player4: any

const playerInstance4 = (Player: any) => {
  _Player4 = Player
}

// watch(isLeft, (value) => {
//   if (true === value && 'Video' === route.name) {
//     _Player0.pause()
//     _Player1.pause()
//     _Player2.pause()
//     _Player3.pause()
//     _Player4.pause()
//   } else {
//     _Player0.play()
//     _Player1.play()
//     _Player2.play()
//     _Player3.play()
//     _Player4.play()
//   }
// })

onActivated(() => {
  _Player0.play()
  _Player1.play()
  _Player2.play()
  _Player3.play()
  _Player4.play()
})

onDeactivated(() => {
  _Player0.pause()
  _Player1.pause()
  _Player2.pause()
  _Player3.pause()
  _Player4.pause()
})
</script>

<style scoped>
.video-container {
  :deep() {
    .el-form-item {
      margin-bottom: 0;

      .vab-color-picker {
        margin-left: 0 !important;
      }
    }

    .el-row {
      margin-bottom: 1px;

      &:last-child {
        margin-bottom: 0;
      }
    }

    @media (max-width: 768px) {
      .el-row {
        margin-bottom: var(--el-margin);

        .el-col {
          margin-bottom: var(--el-margin);
        }

        .el-col:last-child {
          margin-bottom: 0;
        }
      }
    }
  }
}
</style>
