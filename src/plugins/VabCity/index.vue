<template>
  <el-popover v-model:visible="visible" :width="400">
    <template #reference>
      <el-button>
        <span>{{ currentValue }} - {{ codeToName }}</span>
        <vab-icon icon="arrow-down-s-line" />
      </el-button>
    </template>
    <div>
      <el-radio-group v-model="listType" style="margin-bottom: var(--el-margin)">
        <el-radio-button label="province" value="province">按省份</el-radio-button>
        <el-radio-button label="city" value="city">按城市</el-radio-button>
      </el-radio-group>
      <div v-if="listType === 'province'">
        <el-space wrap>
          <el-button v-for="item in provinceList" :key="item.n" size="small" @click="handleClickLetter(item.n)">
            {{ item.n }}
          </el-button>
        </el-space>
        <el-scrollbar ref="scrollbarRef" always height="300px">
          <div ref="listRef">
            <div v-for="item in cityListByProvince" :key="item.p.n">
              <vab-divider :class="'el-city-' + item.p.l" content-position="left">{{ item.p.n }}</vab-divider>
              <el-space wrap>
                <el-button v-for="city in item.c" :key="city.n" text @click="handleChangeValue(city.c)">{{ city.n }}</el-button>
              </el-space>
            </div>
          </div>
        </el-scrollbar>
      </div>
      <div v-if="listType === 'city'">
        <el-space wrap>
          <el-button v-for="(item, key) in cityListByLetter" :key="key" size="small" @click="handleClickLetter(key)">
            {{ key }}
          </el-button>
        </el-space>
        <el-scrollbar ref="scrollbarRef" always height="300px">
          <div ref="listRef">
            <div v-for="(item, key) in cityListByLetter" :key="key">
              <vab-divider :class="'el-city-' + key" content-position="left">
                {{ key }}
              </vab-divider>
              <div>
                <el-space wrap>
                  <el-button v-for="city in item" :key="city.n" text @click="handleChangeValue(city.c)">{{ city.n }}</el-button>
                </el-space>
              </div>
            </div>
          </div>
        </el-scrollbar>
      </div>
    </div>
  </el-popover>
</template>

<script lang="ts" setup>
import cityData from './city'
import provinceData from './province'

defineOptions({
  name: 'VabCity',
})

const props = defineProps({
  modelValue: {
    type: String,
  },
})

const emit = defineEmits(['update:modelValue'])
const value = ref<any>('')
const currentValue = ref<any>()
const codeToName = ref<any>('')
const visible = ref<any>(false)
const provinceList = ref<any>([])
const cityListByProvince = ref<any>([])
const cityListByLetter = ref<any>({})
const allCities = ref<any>()
const listType = ref<any>('province')
const scrollbarRef = ref<any>(null)
const listRef = ref<any>(null)

const handleGetCities = () => {
  const cData: any = cityData
  const cities: any = []
  for (const cid in cData) {
    const city = cData[cid]
    cities.push(city)
  }
  return cities
}

const handleChangeValue = (val: any) => {
  currentValue.value = val
  visible.value = false
  const value = val
  emit('update:modelValue', value)
}

const handleClickLetter = (letter: any) => {
  if (letter === '直辖市') letter = 'Z1'
  else if (letter === '港澳') letter = 'Z2'
  const className = `.el-city-${letter}`
  const offsetTop = listRef.value.querySelectorAll(className)[0].offsetTop
  const listTop = listRef.value.offsetTop
  scrollbarRef.value.setScrollTop(offsetTop - listTop)
}

const handleGetProvinceByLetter = () => {
  const provinces: any = {
    A: { n: 'A', p: [], c: [] },
    F: { n: 'F', p: [], c: [] },
    G: { n: 'G', p: [], c: [] },
    H: { n: 'H', p: [], c: [] },
    J: { n: 'J', p: [], c: [] },
    L: { n: 'L', p: [], c: [] },
    N: { n: 'N', p: [], c: [] },
    Q: { n: 'Q', p: [], c: [] },
    S: { n: 'S', p: [], c: [] },
    T: { n: 'T', p: [], c: [] },
    X: { n: 'X', p: [], c: [] },
    Y: { n: 'Y', p: [], c: [] },
    Z: { n: 'Z', p: [], c: [] },
    Z1: { n: '直辖市', p: [], c: [] },
    Z2: { n: '港澳', p: [], c: [] },
  }
  for (const c in provinceData) {
    const item = provinceData[c]
    provinces[item.l].p.push(item)
  }
  provinceList.value = provinces
}

const handleGetCityByProvince = () => {
  const _provinceList = provinceList.value
  const _cityListByProvince: any = []
  const cData: any = cityData

  const otherCities: any = [
    { p: { n: '直辖市', p: '86', l: 'Z1' }, c: [] },
    { p: { n: '港澳', p: '86', l: 'Z2' }, c: [] },
  ]

  for (const letter in _provinceList) {
    const letterProvince = _provinceList[letter]

    for (let i = 0; i < letterProvince.p.length; i++) {
      const province = letterProvince.p[i]
      const pid = province.c

      const provinceCities: any = {
        p: province,
        c: [],
      }

      for (const cid in cData) {
        const city: any = cData[cid]
        if (pid === city.p) provinceCities.c.push(city)
      }

      if (letter === 'Z1') otherCities[0].c.push(cData[pid])
      else if (letter === 'Z2') otherCities[1].c.push(cData[pid])
      else _cityListByProvince.push(provinceCities)
    }
  }

  cityListByProvince.value = _cityListByProvince.concat(otherCities)
}

const handleGetCityByLetter = () => {
  const cData: any = cityData
  const _cityListByLetter: any = {
    A: [],
    B: [],
    C: [],
    D: [],
    E: [],
    F: [],
    G: [],
    H: [],
    J: [],
    K: [],
    L: [],
    M: [],
    N: [],
    P: [],
    Q: [],
    R: [],
    S: [],
    T: [],
    W: [],
    X: [],
    Y: [],
    Z: [],
  }
  for (const cid in cData) {
    const city = cData[cid]
    _cityListByLetter[city.l].push(city)
  }
  cityListByLetter.value = _cityListByLetter
}

watch(
  currentValue,
  () => {
    if (!currentValue.value) return
    codeToName.value = cityData[currentValue.value].n
  },
  { immediate: true }
)

onBeforeMount(() => {
  value.value = props.modelValue
  currentValue.value = props.modelValue
  allCities.value = handleGetCities()
  handleGetProvinceByLetter()
  handleGetCityByProvince()
  handleGetCityByLetter()
})
</script>
