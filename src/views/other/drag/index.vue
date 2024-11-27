<template>
  <div class="card-drag-container no-transition-container">
    <vab-query-form>
      <vab-query-form-left-panel>
        <el-button type="warning" @click="sort">重置</el-button>
      </vab-query-form-left-panel>
    </vab-query-form>
    <vab-draggable v-model="iconList" :animation="600" target=".el-row">
      <el-row :gutter="20">
        <el-col v-for="item in iconList" :key="item.icon" :lg="3" :md="3" :sm="6" :xl="3" :xs="12">
          <vab-card class="icon-panel">
            <vab-icon :icon="item.icon" :style="{ color: item.color }" />
            <p>按住拖拽</p>
          </vab-card>
        </el-col>
      </el-row>
    </vab-draggable>

    <vab-draggable v-model="iconList" :animation="600" target=".el-row">
      <el-row :gutter="20">
        <el-col v-for="item in iconList" :key="item.icon" :lg="3" :md="3" :sm="6" :xl="3" :xs="12">
          <vab-card class="icon-panel">
            <vab-icon :icon="item.icon" :style="{ color: item.color }" />
            <p>按住拖拽</p>
          </vab-card>
        </el-col>
      </el-row>
    </vab-draggable>
  </div>
</template>

<script lang="ts" setup>
import { shuffle } from 'lodash-es'
import { VueDraggable as VabDraggable } from 'vue-draggable-plus'
import { getIconList } from '/@/api/icon'

defineOptions({
  name: 'Drag',
})

const iconList = ref<any>([])

const randomHexColor = () => {
  return shuffle(['#1890FF', '#36CBCB', '#4ECB73', '#FBD437', '#F2637B', '#975FE5'])[0]
}

const fetchData = async () => {
  const { data } = await getIconList({
    pageNo: 1,
    pageSize: 89,
  })
  iconList.value = data.list
    .filter((icon: any) => icon.includes('-fill'))
    .map((icon: any, index: any) => {
      return { icon, color: randomHexColor(), order: index + 1 }
    })
}

const sort = () => {
  //iconList.value = iconList.value.sort((a: any, b: any) => a.order - b.order)
  fetchData()
}

onBeforeMount(() => {
  fetchData()
})
</script>

<style lang="scss" scoped>
.card-drag-container {
  .icon-panel {
    height: 120px;
    text-align: center;
    cursor: move;
    user-select: none;

    &:hover {
      i {
        transform: scale(1.15);
      }
    }

    i {
      display: block;
      width: 50px;
      height: 50px;
      margin: auto;
      font-size: 40px;
      transition: all ease-in-out 0.3s;
    }

    p {
      margin-top: 10px;
    }
  }
}
</style>
<style>
.fade-move,
.fade-enter-active,
.fade-leave-active {
  transition: all 0.5s cubic-bezier(0.55, 0, 0.1, 1);
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
  transform: scaleY(0.01) translate(30px, 0);
}

.fade-leave-active {
  position: absolute;
}
</style>
