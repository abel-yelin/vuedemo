<template>
  <div class="tree-container no-background-container">
    <vab-card>
      <template #header>基础用法</template>
      <tree-basic />
    </vab-card>
    <vab-card>
      <template #header>可选择</template>
      <tree-selectable />
    </vab-card>
    <vab-card>
      <template #header>懒加载自定义叶子节点</template>
      <tree-custom-leaf-node-in-lazy-mode />
    </vab-card>
    <vab-card>
      <template #header>禁用复选框</template>
      <tree-disabled-checkbox />
    </vab-card>
    <vab-card>
      <template #header>默认展开以及默认选中</template>
      <tree-default-expanded-and-default-checked />
    </vab-card>
    <vab-card>
      <template #header>树节点的选择</template>
      <tree-checking-tree-nodes />
    </vab-card>
    <vab-card>
      <template #header>自定义节点内容</template>
      <tree-custom-node-content />
    </vab-card>
    <vab-card>
      <template #header>自定义节点类名</template>
      <tree-custom-node-class />
    </vab-card>
    <vab-card>
      <template #header>树节点过滤</template>
      <tree-node-filtering />
    </vab-card>
    <vab-card>
      <template #header>手风琴模式</template>
      <tree-accordion />
    </vab-card>
    <vab-card>
      <template #header>可拖拽节点</template>
      <tree-draggable />
    </vab-card>
  </div>
</template>

<script lang="ts" setup>
defineOptions({
  name: 'Tree',
})
</script>
