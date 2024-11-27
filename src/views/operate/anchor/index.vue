<template>
  <div class="anchor-container no-background-container auto-height-container">
    <el-row :gutter="20">
      <el-col :span="20">
        <vab-card class="auto-height-card">
          <div ref="containerRef" style="height: 100%; overflow-y: auto">
            <div id="part-1">part-1</div>
            <div id="part-2">part-2</div>
            <div id="part-3">part-3</div>
          </div>
        </vab-card>
      </el-col>
      <el-col :span="4">
        <vab-card class="auto-height-card">
          <el-anchor :container="containerRef" :offset="0" @click="handleClick">
            <el-anchor-link href="#part-1" title="part-1" />
            <el-anchor-link href="#part-2" title="part-2" />
            <el-anchor-link href="#part-3" title="part-3" />
          </el-anchor>
        </vab-card>
      </el-col>
    </el-row>
  </div>
</template>

<script lang="ts" setup>
defineOptions({
  name: 'Anchor',
})

const containerRef = ref<any>(null)

const handleClick = (e: MouseEvent) => {
  e.preventDefault()
}
</script>

<style lang="scss" scoped>
.anchor-container {
  [id*='part'] {
    height: 1000px;
    padding: var(--el-padding);
    color: var(--el-color-white);
  }

  #part-1 {
    background: var(--el-color-primary);
  }

  #part-2 {
    background: var(--el-color-success);
  }

  #part-3 {
    background: var(--el-color-warning);
  }
}
</style>
