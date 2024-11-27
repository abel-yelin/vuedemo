<template>
  <div class="speech-synthesis-container no-background-container">
    <el-row :gutter="20">
      <el-col :lg="12" :md="18" :sm="24" :xl="12" :xs="24">
        <vab-card v-if="speech.isSupported">
          <el-form label-position="top">
            <el-form-item label="文本">
              <el-input v-model="text" clearable :rows="12" type="textarea" />
            </el-form-item>
            <el-form-item label="语言">
              <el-select v-model="voice">
                <el-option v-for="item in voices" :key="item.name" :label="item.name" :value="item" />
              </el-select>
            </el-form-item>
            <el-form-item label="操作">
              <el-button :disabled="speech.isPlaying.value" type="primary" @click="play">
                {{ speech.status.value === 'pause' ? '继续' : '播放' }}
              </el-button>
              <el-button :disabled="!speech.isPlaying.value" type="warning" @click="pause">暂停</el-button>
              <el-button :disabled="!speech.isPlaying.value" type="danger" @click="stop">结束</el-button>
            </el-form-item>
          </el-form>
        </vab-card>
        <vab-card v-else>您的浏览器不支持SpeechSynthesis API</vab-card>
      </el-col>
    </el-row>
  </div>
</template>

<script lang="ts" setup>
import { getList } from '/@/api/description'

defineOptions({
  name: 'SpeechSynthesis',
})

const voice = ref<SpeechSynthesisVoice>(undefined as unknown as SpeechSynthesisVoice)

const text = ref<string>('')
const speech = useSpeechSynthesis(text, {
  voice,
})

const fetchData = async () => {
  const { data } = await getList()
  text.value = data.description
    .replaceAll('\n', '')
    .replaceAll(/<[^>]*>/g, '')
    .replaceAll(/\s/g, '')
    .replaceAll(/([。：；])\s*/g, '$1\n')
}

let synth: SpeechSynthesis
const voices = ref<SpeechSynthesisVoice[]>([])

const play = () => {
  if (speech.status.value === 'pause') globalThis.speechSynthesis.resume()
  else speech.speak()
}

const pause = () => {
  globalThis.speechSynthesis.pause()
}

const stop = () => {
  speech.stop()
}

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
</script>

<style lang="scss" scoped>
.speech-synthesis-container {
  :deep() {
    .el-select {
      width: 50%;
    }
  }
}
</style>
