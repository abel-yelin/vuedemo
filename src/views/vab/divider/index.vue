<template>
  <div class="divider-container no-background-container">
    <el-row :gutter="20">
      <el-col :lg="12" :md="24" :sm="24" :xl="12" :xs="24">
        <vab-card title="引用">
          <vab-divider>无边框</vab-divider>
          <vab-divider blockquote type="primary">占位符</vab-divider>
          <vab-divider blockquote type="success">占位符</vab-divider>
          <vab-divider blockquote type="warning">占位符</vab-divider>
          <vab-divider blockquote type="danger">占位符</vab-divider>
          <vab-divider blockquote type="info">占位符</vab-divider>
          <vab-divider>有边框</vab-divider>
          <vab-divider blockquote is-border type="primary">占位符</vab-divider>
          <vab-divider blockquote is-border type="success">占位符</vab-divider>
          <vab-divider blockquote is-border type="warning">占位符</vab-divider>
          <vab-divider blockquote is-border type="danger">占位符</vab-divider>
          <vab-divider blockquote is-border style="margin-bottom: 0px" type="info">占位符</vab-divider>
        </vab-card>
        <vab-card title="字段集">
          <vab-divider fieldset style="margin-bottom: 0px" title="占位符">占位符</vab-divider>
        </vab-card>
      </el-col>
      <el-col :lg="12" :md="24" :sm="24" :xl="12" :xs="24">
        <vab-card title="基础用法">
          占位符
          <vab-divider />
          占位符
        </vab-card>
        <vab-card title="设置文案">
          <vab-divider content-position="left">占位符</vab-divider>
          <vab-divider>
            <el-icon>
              <star-filled />
            </el-icon>
            占位符
          </vab-divider>
          <vab-divider content-position="right" style="margin-bottom: 0px">占位符</vab-divider>
        </vab-card>
        <vab-card title="虚线">
          占位符
          <vab-divider border-style="dashed" />
          占位符
          <vab-divider border-style="dotted" />
          占位符
          <vab-divider border-style="double" />
          占位符
        </vab-card>
        <vab-card title="垂直分隔线">
          <span>占位符</span>
          <vab-divider direction="vertical" />
          <span>占位符</span>
          <vab-divider border-style="dashed" direction="vertical" />
          <span>占位符</span>
        </vab-card>
      </el-col>
    </el-row>
  </div>
</template>

<script lang="ts" setup>
import { StarFilled } from '@element-plus/icons-vue'

defineOptions({
  name: 'Divider',
})
</script>
