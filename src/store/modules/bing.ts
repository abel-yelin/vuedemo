/**
 * @description: 获取必应每日壁纸
 * @author sundan
 */

import dayjs from 'dayjs'
const today = dayjs().format('YYYY-MM-DD')

export const useBingStore = defineStore('bing', {
  state: (): BingModuleType => ({
    backgroundList: JSON.parse(localStorage.getItem(`backgroundList-${today}`) as string) || [],
  }),
  getters: {
    getBackgroundList: (state) => state.backgroundList,
  },
  actions: {
    async setBackgroundList() {
      /**
       * @description 必应壁纸每天只允许请求一次,减轻服务器压力
       * @author sundan
       */
      if (!JSON.parse(localStorage.getItem(`backgroundList-${today}`) as string)) {
        await axios({
          url: `https://api.vuejs-core.cn/getBingImage`,
          method: 'get',
        }).then(({ data }) => {
          this.backgroundList = data.data
          const keys = Object.keys(localStorage)
          keys.forEach((key) => {
            if (key.startsWith('backgroundList')) localStorage.removeItem(key)
          })
          localStorage.setItem(`backgroundList-${today}`, JSON.stringify(data.data))
        })
      }
    },
  },
})
;(() => {
  const bingStore = useBingStore()
  bingStore.setBackgroundList()
})()
