<template>
  <div class="transfer-container">
    <vab-card>
      <template #header>自定义</template>
      <el-transfer
        v-model="value3"
        class="custom-transfer"
        :data="data3"
        filterable
        :format="{
          noChecked: '${total}',
          hasChecked: '${checked}/${total}',
        }"
        :left-default-checked="[2, 3]"
        :right-default-checked="[1]"
        :titles="['左列表', '右列表']"
      >
        <template #default="{ option }">
          <span class="transfer-avatar" :class="'transfer-avatar-' + option.key">{{ option.label.slice(0, 1) }}</span>
          <span>{{ option.label }}</span>
        </template>
      </el-transfer>
    </vab-card>
    <vab-card>
      <template #header>基础用法</template>
      <el-transfer v-model="value1" :data="data1" />
    </vab-card>
    <vab-card>
      <template #header>可搜索过滤</template>
      <el-transfer v-model="value2" :data="data2" :filter-method="filterMethod" filterable />
    </vab-card>
  </div>
</template>

<script lang="ts" setup>
defineOptions({
  name: 'Transfer',
})

/* 基础用法 */
interface Option1 {
  key: number
  label: string
  disabled: boolean
}

const generateData1 = () => {
  const data: Option1[] = []
  for (let i = 1; i <= 15; i++) {
    data.push({
      key: i,
      label: `Option ${i}`,
      disabled: i % 4 === 0,
    })
  }
  return data
}

const data1 = ref<Option1[]>(generateData1())
const value1 = ref([])

/* 可搜索过滤 */

interface Option2 {
  key: number
  label: string
  initial: string
}

const generateData2 = () => {
  const data: Option2[] = []
  const states = ['California', 'Illinois', 'Maryland', 'Texas', 'Florida', 'Colorado', 'Connecticut ']
  const initials = ['CA', 'IL', 'MD', 'TX', 'FL', 'CO', 'CT']
  states.forEach((city, index) => {
    data.push({
      label: city,
      key: index,
      initial: initials[index],
    })
  })
  return data
}

const data2 = ref<Option2[]>(generateData2())
const value2 = ref([])

const filterMethod = (query: any, item: any) => {
  return item.initial.toLowerCase().includes(query.toLowerCase())
}

/* 自定义 */

interface Option3 {
  key: number
  label: string
  disabled: boolean
}

const generateData3 = (): Option3[] => {
  const data: Option3[] = [
    {
      key: 1,
      label: '曲丽丽',
      disabled: false,
    },
    {
      key: 2,
      label: '付小小',
      disabled: false,
    },
    {
      key: 3,
      label: '林东东',
      disabled: false,
    },
    {
      key: 4,
      label: '周星星',
      disabled: false,
    },
    {
      key: 5,
      label: '朱偏右',
      disabled: true,
    },
  ]
  return data
}

const data3 = ref(generateData3())
const value3 = ref([1])
</script>

<style lang="scss" scoped>
.transfer-container {
  .custom-transfer {
    :deep() {
      .el-transfer-panel__item {
        height: 40px;
        line-height: 40px;
      }
    }
  }

  .transfer-avatar {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    width: 25px;
    height: 25px;
    margin-right: 3px;
    font-size: var(--el-font-size-extra-small);
    color: var(--el-color-white);
    background-color: var(--el-color-primary);
    border-radius: 50%;
  }

  $colors: (
    1: var(--el-color-primary),
    2: var(--el-color-success),
    3: var(--el-color-warning),
    4: var(--el-color-danger),
    5: var(--el-color-info),
  );

  @each $key, $color in $colors {
    .transfer-avatar-#{$key} {
      background-color: $color;
    }
  }
}
</style>
