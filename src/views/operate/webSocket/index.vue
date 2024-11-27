<template>
  <div class="web-socket-container">
    <el-row :gutter="20">
      <el-col :lg="12" :md="24" :sm="24" :xl="12" :xs="24">
        <el-form ref="formRef" label-position="top" :model="form" :rules="rules">
          <el-form-item label="连接状态">
            <el-tag :type="getTagType">{{ status }}</el-tag>
          </el-form-item>
          <el-form-item label="服务地址">
            <el-input v-model="form.serverHide" clearable disabled />
          </el-form-item>
          <el-form-item label="内容" prop="sendValue">
            <el-input
              v-model="form.sendValue"
              clearable
              :disabled="!isOpen"
              placeholder="需要发送到服务器的内容"
              :rows="3"
              type="textarea"
            />
          </el-form-item>
          <el-form-item label="操作">
            <el-button :type="isOpen ? 'danger' : 'primary'" @click="toggle">
              {{ isOpen ? '关闭连接' : '开启连接' }}
            </el-button>
            <el-button :disabled="!isOpen" type="primary" @click="handleSend">发送</el-button>
          </el-form-item>
        </el-form>
      </el-col>
      <el-col :lg="12" :md="24" :sm="24" :xl="12" :xs="24">
        <el-form label-position="top">
          <el-form-item label="消息记录">
            <div class="list-content">
              <el-scrollbar style="height: calc(var(--el-container-height) - var(--el-margin) * 6)">
                <ul>
                  <li v-for="item in getList" :key="item.time">
                    <div>{{ thirteenBitTimestamp(item.time) }}</div>
                    <div>
                      {{ item.res }}
                    </div>
                  </li>
                </ul>
              </el-scrollbar>
            </div>
          </el-form-item>
        </el-form>
      </el-col>
    </el-row>

    <p></p>
  </div>
</template>

<script lang="ts" setup>
import type { FormInstance } from 'element-plus'
import { thirteenBitTimestamp } from '/@/utils'

defineOptions({
  name: 'WebSocket',
})

const formRef = ref<FormInstance>()
const form = reactive<any>({
  server: 'ws://127.0.0.1:7002',
  serverHide: 'ws://*.*.*.*',
  sendValue: '你好！',
  recordList: [],
})
const { status, data, send, close, open } = useWebSocket(form.server, {
  autoReconnect: false,
  heartbeat: true,
})
const rules = reactive<any>({
  sendValue: [{ required: true, trigger: 'blur', message: '请输入内容' }],
})

watchEffect(() => {
  if (data.value)
    try {
      const res = JSON.parse(data.value)
      form.recordList.push(res)
    } catch {
      form.recordList.push({
        res: data.value,
        id: Math.ceil(Math.random() * 1000),
        time: Date.now(),
      })
    }
})

const isOpen = computed(() => status.value === 'OPEN')
const getTagType = computed(() => (isOpen.value ? 'success' : 'danger'))
const getList = computed(() => [...form.recordList].reverse())

const handleSend = () => {
  formRef.value?.validate(async (valid: any) => {
    if (valid) {
      send(form.sendValue)
      form.sendValue = '你好'
    }
  })
}

const toggle = () => {
  if (isOpen.value) close()
  else open()
}
</script>

<style lang="scss" scoped>
.web-socket-container {
  .list-content {
    width: 100%;
    border: 1px solid var(--el-border-color);
    border-radius: var(--el-border-radius-base);
  }

  ul {
    padding: 15px;
    margin: 0;
    list-style: none;

    li {
      padding: 8px;
      cursor: pointer;
      border-radius: var(--el-border-radius-base);

      &:hover {
        background-color: var(--el-color-primary-light-9);
        border-radius: var(--el-border-radius-base);
      }
    }
  }
}
</style>
