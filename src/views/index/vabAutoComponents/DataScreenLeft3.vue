<template>
  <div class="data-screen-left3">
    <div class="scroll" @mouseenter="handleMouseEnter" @mouseleave="handleMouseLeave">
      <div ref="scrollRef" class="scroll-box">
        <div v-for="item in listData" :key="item.id" class="scroll-item">
          <el-avatar fit="fill" :size="25" src="https://i.gtimg.cn/club/item/face/img/2/16022_100.gif" />
          <span class="name">{{ item.name }}</span>
          <span class="address">{{ item.address }}</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
defineOptions({
  name: 'DataScreenLeft3',
})

const speed = ref(30)
const scrollRef = ref<any>(null)
const listData = reactive<any>([
  {
    avatar: 'https://i.gtimg.cn/club/item/face/img/2/16022_100.gif',
    name: 'Tom',
    address: 'No. 189, Grove St, Los Angeles',
  },
  {
    avatar: 'https://i.gtimg.cn/club/item/face/img/2/16022_100.gif',
    name: 'Tom',
    address: 'No. 189, Grove St, Los Angeles',
  },
  {
    avatar: 'https://i.gtimg.cn/club/item/face/img/2/16022_100.gif',
    name: 'Tom',
    address: 'No. 189, Grove St, Los Angeles',
  },
  {
    avatar: 'https://i.gtimg.cn/club/item/face/img/2/16022_100.gif',
    name: 'Tom',
    address: 'No. 189, Grove St, Los Angeles',
  },
  {
    avatar: 'https://i.gtimg.cn/club/item/face/img/2/16022_100.gif',
    name: 'Tom',
    address: 'No. 189, Grove St, Los Angeles',
  },
  {
    avatar: 'https://i.gtimg.cn/club/item/face/img/2/16022_100.gif',
    name: 'Tom',
    address: 'No. 189, Grove St, Los Angeles',
  },
  {
    avatar: 'https://i.gtimg.cn/club/item/face/img/2/16022_100.gif',
    name: 'Tom',
    address: 'No. 189, Grove St, Los Angeles',
  },
  {
    avatar: 'https://i.gtimg.cn/club/item/face/img/2/16022_100.gif',
    name: 'Tom',
    address: 'No. 189, Grove St, Los Angeles',
  },
  {
    avatar: 'https://i.gtimg.cn/club/item/face/img/2/16022_100.gif',
    name: 'Tom',
    address: 'No. 189, Grove St, Los Angeles',
  },
  {
    avatar: 'https://i.gtimg.cn/club/item/face/img/2/16022_100.gif',
    name: 'Tom',
    address: 'No. 189, Grove St, Los Angeles',
  },
  {
    avatar: 'https://i.gtimg.cn/club/item/face/img/2/16022_100.gif',
    name: 'Tom',
    address: 'No. 189, Grove St, Los Angeles',
  },
  {
    avatar: 'https://i.gtimg.cn/club/item/face/img/2/16022_100.gif',
    name: 'Tom',
    address: 'No. 189, Grove St, Los Angeles',
  },
  {
    avatar: 'https://i.gtimg.cn/club/item/face/img/2/16022_100.gif',
    name: 'Tom',
    address: 'No. 189, Grove St, Los Angeles',
  },
  {
    avatar: 'https://i.gtimg.cn/club/item/face/img/2/16022_100.gif',
    name: 'Tom',
    address: 'No. 189, Grove St, Los Angeles',
  },
])

const handleMouseEnter = () => {
  if (timer) clearTimeout(timer)
}

const handleMouseLeave = () => {
  start()
}

let timer: ReturnType<typeof setInterval>

const start = () => {
  if (timer) clearTimeout(timer)
  timer = setInterval(ListScroll, speed.value)
}

const ListScroll = () => {
  const scrollDom = scrollRef.value
  if (scrollDom.offsetHeight !== 0) {
    if (scrollDom.children.length < 4) {
      if (timer) clearTimeout(timer)
      return
    }
    scrollDom.scrollTop += 1
    if (scrollDom.scrollTop == scrollDom.scrollHeight - scrollDom.clientHeight) {
      const first = scrollDom.children[0]
      scrollDom.removeChild(first)
      scrollDom.append(first)
    }
  }
}

onMounted(() => {
  start()
})

onBeforeUnmount(() => {
  if (timer) clearTimeout(timer)
})

onUnmounted(() => {
  if (timer) clearTimeout(timer)
})
</script>

<style lang="scss" scoped>
.data-screen-left3 {
  display: flex;
  flex-direction: column;
  height: calc(100% - 40px);
  margin-top: 20px;
  overflow: hidden;

  .scroll {
    width: 100%;
    height: 100%;

    .scroll-box {
      width: 100%;
      height: 100%;
      overflow: hidden;

      .scroll-item {
        display: flex;
        align-items: center;
        height: 50px;
        border-bottom: 1px solid #101f58;

        .name {
          margin-left: 10px;
        }

        .address {
          margin-left: var(--el-margin);
        }
      }
    }
  }
}
</style>
