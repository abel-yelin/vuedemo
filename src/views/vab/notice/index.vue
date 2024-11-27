<template>
  <div class="notice-container no-background-container">
    <el-row :gutter="20">
      <el-col :span="24">
        <vab-card title="Message 消息提示（默认）">
          <el-button type="primary" @click="open1">消息</el-button>
          <el-button type="success" @click="open2">成功</el-button>
          <el-button type="warning" @click="open3">警告</el-button>
          <el-button type="danger" @click="open4">错误</el-button>
        </vab-card>
      </el-col>
      <el-col :span="24">
        <vab-card title="Message 消息提示（自定义）">
          <el-button type="primary" @click="open5">消息</el-button>
          <el-button type="success" @click="open6">成功</el-button>
          <el-button type="warning" @click="open7">警告</el-button>
          <el-button type="danger" @click="open8">错误</el-button>
        </vab-card>
      </el-col>
      <el-col :span="24">
        <vab-card title="Notification 消息提示">
          <el-button type="info" @click="open9">消息</el-button>
          <el-button type="success" @click="open10">成功</el-button>
          <el-button type="warning" @click="open11">警告</el-button>
          <el-button type="danger" @click="open12">错误</el-button>
        </vab-card>
      </el-col>
      <el-col :span="24">
        <vab-card>
          <template #header>
            更新提示
            <el-tag class="card-header-tag" type="danger">New</el-tag>
          </template>
          <el-button type="primary" @click="open14">更新提示</el-button>
        </vab-card>
      </el-col>
      <el-col :lg="6" :md="12" :sm="24" :xl="6" :xs="24">
        <vab-card title="成功提示">
          <el-result icon="success" sub-title="请根据提示进行操作" title="成功提示">
            <template #extra>
              <el-button type="primary" @click="open13('成功提示')">确认</el-button>
            </template>
          </el-result>
        </vab-card>
      </el-col>
      <el-col :lg="6" :md="12" :sm="24" :xl="6" :xs="24">
        <vab-card title="警告提示">
          <el-result icon="warning" sub-title="请根据提示进行操作" title="警告提示">
            <template #extra>
              <el-button type="primary" @click="open13('警告提示')">确认</el-button>
            </template>
          </el-result>
        </vab-card>
      </el-col>
      <el-col :lg="6" :md="12" :sm="24" :xl="6" :xs="24">
        <vab-card title="错误提示">
          <el-result icon="error" sub-title="请根据提示进行操作" title="错误提示">
            <template #extra>
              <el-button type="primary" @click="open13('错误提示')">确认</el-button>
            </template>
          </el-result>
        </vab-card>
      </el-col>
      <el-col :lg="6" :md="12" :sm="24" :xl="6" :xs="24">
        <vab-card title="信息提示">
          <el-result icon="info" sub-title="请根据提示进行操作" title="信息提示">
            <template #extra>
              <el-button type="primary" @click="open13('信息提示')">确认</el-button>
            </template>
          </el-result>
        </vab-card>
      </el-col>
      <el-col :span="24">
        <vab-card title="Alert 警告">
          <vab-divider content-position="left">light</vab-divider>
          <vab-alert show-icon title="成功提示的文案" type="success" />
          <vab-alert show-icon title="消息提示的文案" type="info" />
          <vab-alert show-icon title="警告提示的文案" type="warning" />
          <vab-alert show-icon title="错误提示的文案" type="error" />
          <vab-divider content-position="left">dark</vab-divider>
          <vab-alert effect="dark" show-icon title="成功提示的文案" type="success" />
          <vab-alert effect="dark" show-icon title="消息提示的文案" type="info" />
          <vab-alert effect="dark" show-icon title="警告提示的文案" type="warning" />
          <vab-alert effect="dark" show-icon title="错误提示的文案" type="error" />
        </vab-card>
      </el-col>
      <el-col :span="24">
        <vab-card title="圆点提示">
          <vab-divider content-position="left">
            默认
            <vab-dot style="margin-left: 3px" type="primary" />
          </vab-divider>
          <vab-divider content-position="left">
            成功
            <vab-dot style="margin-left: 3px" type="success" />
          </vab-divider>
          <vab-divider content-position="left">
            警告
            <vab-dot style="margin-left: 3px" type="warning" />
          </vab-divider>
          <vab-divider content-position="left">
            错误
            <vab-dot style="margin-left: 3px" type="danger" />
          </vab-divider>
        </vab-card>
      </el-col>
    </el-row>
  </div>
</template>

<script lang="ts" setup>
defineOptions({
  name: 'Notice',
})

const open1 = () => {
  $baseMessage('这是一条消息提示', 'info')
}
const open2 = () => {
  $baseMessage('这是一条成功消息', 'success')
}
const open3 = () => {
  $baseMessage('这是一条警告消息', 'warning')
}
const open4 = () => {
  $baseMessage('这是一条错误消息', 'error')
}
const open5 = () => {
  $baseMessage('这是一条消息提示', 'info', 'hey')
}
const open6 = () => {
  $baseMessage('这是一条成功消息', 'success', 'hey')
}
const open7 = () => {
  $baseMessage('这是一条警告消息', 'warning', 'hey')
}
const open8 = () => {
  $baseMessage('这是一条错误消息', 'error', 'hey')
}
const open9 = () => {
  $baseNotify('这是一条提示消息', '提示', 'info', 'bottom-right')
}
const open10 = () => {
  $baseNotify('这是一条成功消息', '成功', 'success', 'bottom-right')
}
const open11 = () => {
  $baseNotify('这是一条警告消息', '警告', 'warning', 'bottom-right')
}
const open12 = () => {
  $baseNotify('这是一条错误消息', '错误', 'error', 'bottom-right')
}
const open13 = (value: string) => {
  $baseAlert(`这是一条${value}弹框`)
}
const open14 = () => {
  $pub('update-website')
}
</script>
