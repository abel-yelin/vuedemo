<template>
  <ul v-infinite-scroll="load" class="infinite-list" style="overflow: auto">
    <li v-for="i in count" :key="i" class="infinite-list-item">{{ i }}</li>
  </ul>
</template>

<script lang="ts" setup>
const count = ref<any>(0)
const load = () => {
  count.value += 2
}
</script>

<style>
.infinite-list {
  height: 245px;
  padding: 0;
  margin: 0;
  list-style: none;
}

.infinite-list .infinite-list-item {
  display: flex;
  align-items: center;
  justify-content: center;
  height: 50px;
  margin: 10px;
  color: var(--el-color-primary);
  background: var(--el-color-primary-light-9);
}

.infinite-list .infinite-list-item + .list-item {
  margin-top: 10px;
}
</style>
