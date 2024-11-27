<template>
  <div class="button-container no-background-container">
    <vab-card title="基础用法">
      <el-space wrap>
        <el-button>默认按钮</el-button>
        <el-button type="primary">主要按钮</el-button>
        <el-button type="success">成功按钮</el-button>
        <el-button type="info">信息按钮</el-button>
        <el-button type="warning">警告按钮</el-button>
        <el-button type="danger">危险按钮</el-button>
        <el-button plain>朴素按钮</el-button>
        <el-button plain type="primary">主要按钮</el-button>
        <el-button plain type="success">成功按钮</el-button>
        <el-button plain type="info">信息按钮</el-button>
        <el-button plain type="warning">警告按钮</el-button>
        <el-button plain type="danger">危险按钮</el-button>
        <el-button round>圆角按钮</el-button>
        <el-button round type="primary">主要按钮</el-button>
        <el-button round type="success">成功按钮</el-button>
        <el-button round type="info">信息按钮</el-button>
        <el-button round type="warning">警告按钮</el-button>
        <el-button round type="danger">危险按钮</el-button>
        <el-button circle :icon="Search" />
        <el-button circle :icon="Edit" type="primary" />
        <el-button circle :icon="Check" type="success" />
        <el-button circle :icon="Message" type="info" />
        <el-button circle :icon="Star" type="warning" />
        <el-button circle :icon="Delete" type="danger" />
      </el-space>
    </vab-card>
    <vab-card title="禁用状态">
      <el-space wrap>
        <el-button disabled>默认按钮</el-button>
        <el-button disabled type="primary">主要按钮</el-button>
        <el-button disabled type="success">成功按钮</el-button>
        <el-button disabled type="info">信息按钮</el-button>
        <el-button disabled type="warning">警告按钮</el-button>
        <el-button disabled type="danger">危险按钮</el-button>
        <el-button disabled plain>朴素按钮</el-button>
        <el-button disabled plain type="primary">主要按钮</el-button>
        <el-button disabled plain type="success">成功按钮</el-button>
        <el-button disabled plain type="info">信息按钮</el-button>
        <el-button disabled plain type="warning">警告按钮</el-button>
        <el-button disabled plain type="danger">危险按钮</el-button>
      </el-space>
    </vab-card>
    <vab-card title="文字按钮">
      <el-space wrap>
        <el-button text type="primary">文字按钮</el-button>
        <el-button disabled text>文字按钮</el-button>
      </el-space>
    </vab-card>
    <vab-card title="element内置图标按钮">
      <el-space wrap>
        <el-button :icon="Edit" type="primary" />
        <el-button :icon="Share" type="primary" />
        <el-button :icon="Delete" type="primary" />
        <el-button :icon="Search" type="primary">搜索</el-button>
        <el-button type="primary">
          上传
          <el-icon class="el-icon--right">
            <upload />
          </el-icon>
        </el-button>
      </el-space>
    </vab-card>
    <vab-card title="自定义图标按钮">
      <el-space wrap>
        <el-button type="primary">
          <vab-icon icon="24-hours-line" />
        </el-button>
        <el-button type="primary">
          <vab-icon icon="4k-line" />
        </el-button>
        <el-button type="primary">
          <vab-icon icon="a-b" />
        </el-button>
        <el-button type="primary">
          <vab-icon icon="account-box-line" />
          <span>用户名</span>
        </el-button>
      </el-space>
    </vab-card>
    <vab-card title="按钮组">
      <el-space wrap>
        <el-button-group>
          <el-button :icon="ArrowLeft" type="primary">上一页</el-button>
          <el-button type="primary">
            下一页
            <el-icon class="el-icon--right">
              <arrow-right />
            </el-icon>
          </el-button>
        </el-button-group>
        <el-button-group>
          <el-button :icon="Edit" type="primary" />
          <el-button :icon="Share" type="primary" />
          <el-button :icon="Delete" type="primary" />
        </el-button-group>
      </el-space>
    </vab-card>
    <vab-card title="加载中">
      <el-space wrap>
        <el-button :loading="true" type="primary">加载中</el-button>
      </el-space>
    </vab-card>
    <vab-card title="不同尺寸">
      <el-space wrap>
        <el-button>默认按钮</el-button>
        <el-button size="small">小型按钮</el-button>
        <el-button round>默认按钮</el-button>
        <el-button round size="small">小型按钮</el-button>
      </el-space>
    </vab-card>
  </div>
</template>

<script lang="ts" setup>
import { ArrowLeft, ArrowRight, Check, Delete, Edit, Message, Search, Share, Star, Upload } from '@element-plus/icons-vue'

defineOptions({
  name: 'Button',
})
</script>
