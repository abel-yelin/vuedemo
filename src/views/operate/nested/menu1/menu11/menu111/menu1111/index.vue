<template>
  <div class="menu1-1-1-1-container">
    <vab-alert title="路由1.1">
      <vab-alert title="路由1.1.1">
        <vab-alert title="路由1.1.1.1">
          <el-input v-model="value" clearable style="width: 250px; margin-bottom: 20px" type="textarea" />
        </vab-alert>
      </vab-alert>
    </vab-alert>
    <el-button type="primary" @click="handleKeepAlive">多级路由缓存演示</el-button>
    <el-button type="primary" @click="handleRefresh">刷新当前标签页</el-button>
  </div>
</template>

<script lang="ts" setup>
defineOptions({
  name: 'Menu1111',
})

const router = useRouter()
const value = ref<string>('')

const handleRefresh = () => {
  $pub('reload-router-view', 'Menu1111')
}

const handleKeepAlive = () => {
  if (!value.value) value.value = '路由1.1.1.1缓存的数据'
  $baseMessage('提示结束后，跳转至首页，3秒后回到路由1.1.1.1', 'warning', 'hey', () => {
    router.push({
      name: 'Index',
    })
    setTimeout(() => {
      $baseMessage('倒计时：3', 'success', 'hey')
    }, 1000)
    setTimeout(() => {
      $baseMessage('倒计时：2', 'success', 'hey')
    }, 1000 * 2)
    setTimeout(() => {
      $baseMessage('倒计时：1', 'success', 'hey')
    }, 1000 * 3)
    setTimeout(() => {
      $baseMessage('路由缓存已生效，即将回到路由1.1.1.1', 'success', 'hey', () => {
        router.push({
          name: 'Menu1111',
        })
      })
    }, 1000 * 4)
  })
}
</script>
