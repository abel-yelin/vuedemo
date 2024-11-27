<template>
  <div class="property-dialog">
    <user v-if="nodeData.type === 'user'" :lf="lf" :node-data="nodeData" @on-close="handleClose" />
    <common-property v-else :lf="lf" :node-data="nodeData" @on-close="handleClose" />
  </div>
</template>

<script>
export default defineComponent({
  name: 'PropertyDialog',
  props: {
    nodeData: {
      type: Object,
      default: () => {},
    },
    lf: {
      type: Object,
      default: () => {},
    },
  },
  emits: ['setPropertiesFinish'],
  data() {
    return {}
  },
  methods: {
    handleClose() {
      this.$emit('setPropertiesFinish')
    },
  },
})
</script>
<style>
.property-dialog {
  padding: var(--el-padding);
}
</style>
