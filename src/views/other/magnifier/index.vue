<template>
  <div class="magnifier-container">
    <div class="hidden-sm-and-up">
      <vab-alert title="手机端不支持放大镜演示" type="warning" />
    </div>
    <div class="hidden-xs-only">
      <el-row :gutter="20">
        <el-col :lg="12" :md="18" :sm="18" :xl="12" :xs="24">
          <vab-magnifier
            :height="height"
            :out-zoomer="showType"
            :scale="scale"
            :type="type"
            :url="landscape"
            :width="width"
            :zoomer-style="{
              'background-color': taobao ? 'transparent' : 'rgba(0,0,0,0)',
            }"
          >
            <template v-if="taobao" #zoomer>
              <div class="image-zoom-wrap"></div>
            </template>
          </vab-magnifier>
        </el-col>
        <el-col :lg="12" :md="6" :sm="6" :xl="12" :xs="24">
          <p>当前放大倍数：{{ scale }}</p>
          <p>当前放大镜宽度：{{ width }}</p>
          <el-space wrap>
            <el-button type="primary" @click="addSelectorWidth">增加放大器宽度</el-button>
            <el-button type="warning" @click="subSelectorWidth">减小放大器宽度</el-button>
            <el-button type="primary" @click="addScale">增加放大倍数</el-button>
            <el-button type="warning" @click="subScale">减小放大倍数</el-button>
            <el-button type="primary" @click="changeType">更换放大镜类型</el-button>
            <el-button class="hidden-md-and-down" type="warning" @click="changeShowType">更换放大方式</el-button>
            <el-button class="hidden-md-and-down" type="primary" @click="changeToTaobao">淘宝放大镜</el-button>
            <el-button type="warning" @click="reset">重置</el-button>
          </el-space>
        </el-col>
      </el-row>
    </div>
  </div>
</template>

<script lang="ts" setup>
import landscape from '/@/assets/common_images/landscape.jpg'

defineOptions({
  name: 'Magnifier',
})

const scale = ref<any>(2)
const type = ref<any>('circle')
const showType = ref<any>(false)
const width = ref<any>(168)
const taobao = ref<any>(false)
const height = ref<any>(-1)

const addSelectorWidth = () => {
  width.value += 20
}

const subSelectorWidth = () => {
  width.value -= 20
}

const addScale = () => {
  scale.value += 0.5
}

const subScale = () => {
  scale.value -= 0.5
}

const changeType = () => {
  type.value = type.value === 'circle' ? 'square' : 'circle'
}

const changeShowType = () => {
  showType.value = !showType.value
}

const changeToTaobao = () => {
  taobao.value = !taobao.value
  showType.value = true
}

const reset = () => {
  scale.value = 2
  type.value = 'circle'
  showType.value = false
  width.value = 168
  taobao.value = false
  height.value = -1
}

onBeforeMount(() => {
  // @ts-ignore
  document.body.onmousewheel = (event: any) => {
    event.preventDefault()
    scale.value += event.deltaY > 0 ? -0.1 : 0.1
  }
})
</script>

<style>
.image-zoom-wrap {
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  z-index: 1;
  cursor: move;
  background: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAIAAAACCAMAAABFaP0WAAAABGdBTUEAAK/INwWK6QAAABl0RVh0U29mdHdhcmUAQWRvYmUgSW1hZ2VSZWFkeXHJZTwAAAAGUExURT1uzv///62t27cAAAACdFJOU/8A5bcwSgAAABBJREFUeNpiYGBkYGQECDAAAA0ABMZIs2EAAAAASUVORK5CYII=)
    repeat scroll 0 0 transparent;
}
</style>
