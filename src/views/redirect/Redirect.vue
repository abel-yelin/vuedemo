<template>
  <div class="redirect-container"></div>
</template>

<script lang="ts" setup>
defineOptions({
  name: 'Redirect',
})

onBeforeMount(() => {
  setTimeout(() => {
    history.back()
  }, 500)
})
</script>
