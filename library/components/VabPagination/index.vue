<template>
  <el-pagination
    :background="props.background"
    :current-page="props.currentPage"
    :default-current-page="props.defaultCurrentPage"
    :default-page-size="props.defaultPageSize"
    :disabled="props.disabled"
    :hide-on-single-page="props.hideOnSinglePage"
    :layout="props.layout"
    :next-icon="props.nextIcon"
    :next-text="props.nextText"
    :page-count="props.pageCount"
    :page-size="props.pageSize"
    :page-sizes="props.pageSizes"
    :pager-count="props.pagerCount"
    :popper-class="props.popperClass"
    :prev-icon="props.prevIcon"
    :prev-text="props.prevText"
    :small="props.small"
    :teleported="props.teleported"
    :total="props.total"
    v-bind="$attrs"
  />
</template>

<script lang="ts" setup>
import { ElPagination } from 'element-plus'

defineOptions({
  name: 'VabPagination',
})

const props = defineProps({
  ...ElPagination.props,
  layout: {
    type: String,
    default: 'total, sizes, prev, pager, next, jumper',
  },
  background: {
    type: Boolean,
    default: true,
  },
})
</script>
