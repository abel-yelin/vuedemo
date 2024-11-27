<template>
  <div class="order-notice-container no-background-container">
    <el-row :gutter="20">
      <el-col :lg="8" :md="18" :sm="24" :xl="8" :xs="24">
        <vab-card v-if="speech.isSupported">
          <el-form label-position="top">
            <el-form-item label="文本">
              <el-input v-model="text" clearable :rows="4" type="textarea" />
            </el-form-item>
            <el-form-item label="操作">
              <el-space wrap>
                <el-button type="primary" @click="handleAll">全部推送</el-button>
                <el-button type="primary" @click="handlePlay">推送语音</el-button>
                <el-button type="primary" @click="handleElNotice">推送网页通知</el-button>
                <el-button type="primary" @click="handleSettingNotice">推送系统通知</el-button>
              </el-space>
            </el-form-item>
          </el-form>
        </vab-card>
        <vab-card v-else>您的浏览器不支持SpeechSynthesis API</vab-card>
      </el-col>
    </el-row>
  </div>
</template>

<script lang="ts" setup>
defineOptions({
  name: 'OrderNotice',
})

const voice = ref<SpeechSynthesisVoice>(undefined as unknown as SpeechSynthesisVoice)
const text = ref<string>('')
const speech = useSpeechSynthesis(text, {
  voice,
})

const fetchData = async () => {
  // 可以在此处编写后端接口请求
  text.value = '您有新的Shop Vite订单，请及时处理！'
}

let synth: SpeechSynthesis
const voices = ref<SpeechSynthesisVoice[]>([])
let timer: ReturnType<typeof setInterval>

onMounted(() => {
  if (speech.isSupported.value) {
    timer = setTimeout(() => {
      synth = globalThis.speechSynthesis
      voices.value = synth.getVoices()
      voice.value = voices.value[0]
    }, 200)
    fetchData()
  }
})

onBeforeUnmount(() => {
  if (timer) clearTimeout(timer)
})

const handlePlay = () => {
  if (speech.status.value === 'pause') globalThis.speechSynthesis.resume()
  else speech.speak()
}

const handleElNotice = () => {
  $baseNotify(text.value, '温馨提示', 'success', 'bottom-right')
}

const handleSettingNotice = () => {
  globalThis.Notification.requestPermission().then((result: any) => {
    if (result === 'granted') {
      const notification = new globalThis.Notification('温馨提示', {
        body: text.value,
      })
      notification.addEventListener('click', () => {
        window.focus()
        notification.close()
      })
    }
  })
}

const handleAll = () => {
  handleElNotice()
  handleSettingNotice()
  setTimeout(() => {
    handlePlay()
  }, 500)
}
</script>
