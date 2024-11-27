/**
 * @description 所有全局配置的状态管理，如无必要请勿修改
 */

import {
  persistenceTab as _persistenceTab,
  color,
  colorWeakness,
  columnStyle,
  fixedHeader,
  foldSidebar,
  fontSize,
  i18n,
  isFollow,
  layout,
  logo,
  menuWidth,
  pageTransition,
  radius,
  rightToolsDrag,
  showColorPicker,
  showDark,
  showFontSize,
  showFooter,
  showFullScreen,
  showLanguage,
  showLock,
  showNotice,
  showProgressBar,
  showRefresh,
  showSearch,
  showTabs,
  showTabsIcon,
  showTheme,
  showThemeSetting,
  tabDrag,
  tabsBarStyle,
  themeName,
  title,
} from '/@/config'
import { colorRgba, lightenColorChrome } from '/@/utils/lightenColor'
import { getLocalStorage } from '/@/utils/localStorage'

const defaultTheme: ThemeType = {
  color,
  colorWeakness,
  columnStyle,
  fixedHeader,
  foldSidebar,
  isFollow,
  layout,
  menuWidth,
  pageTransition,
  radius,
  showColorPicker,
  showDark,
  showFooter,
  showFullScreen,
  showLanguage,
  showLock,
  showNotice,
  showProgressBar,
  showRefresh,
  showSearch,
  showTabs,
  showTabsIcon,
  showTheme,
  showThemeSetting,
  tabsBarStyle,
  themeName,
  showFontSize,
  tabDrag,
  fontSize,
  rightToolsDrag,
}

const { collapse = foldSidebar } = getLocalStorage('collapse')
const { persistenceTab = _persistenceTab } = getLocalStorage('persistenceTab')

export const useSettingsStore = defineStore('settings', {
  state: (): SettingsModuleType => ({
    collapse,
    device: 'desktop',
    language: getLocalStorage('language').language || i18n,
    lock: getLocalStorage('lock').lock || false,
    logo: getLocalStorage('logo').logo || logo,
    mode: localStorage.getItem('vueuse-color-scheme') || 'light',
    persistenceTab,
    theme: { ...defaultTheme, ...getLocalStorage('shop-vite-theme') },
    title: getLocalStorage('title').title || title,
    scrollTop: JSON.parse(localStorage.getItem('scrollTop') || '[]'),
  }),
  getters: {
    getCollapse: (state) => state.collapse,
    getDevice: (state) => state.device,
    getPersistenceTab: (state) => state.persistenceTab,
    getLanguage: (state) => state.language,
    getLock: (state) => state.lock,
    getLogo: (state) => state.logo,
    getMode: (state) => state.mode,
    getTheme: (state) => state.theme,
    getTitle: (state) => state.title,
    getScrollTop: (state) => state.scrollTop,
  },
  actions: {
    updateState(obj: any) {
      Object.getOwnPropertyNames(obj).forEach((key) => {
        // @ts-ignore
        this[key] = obj[key]
        localStorage.setItem(key, typeof obj[key] == 'string' ? `{"${key}":"${obj[key]}"}` : `{"${key}":${obj[key]}}`)
      })
    },
    updateMode(value: any) {
      this.mode = value
    },
    saveTheme() {
      localStorage.setItem('shop-vite-theme', JSON.stringify(this.theme))
    },
    resetTheme() {
      this.theme = { ...defaultTheme }
      this.persistenceTab = _persistenceTab
      this.changeLanguage(i18n)
      if (this.device === 'mobile')
        this.theme = {
          ...defaultTheme,
          layout: 'vertical',
        }
      localStorage.removeItem('shop-vite-theme')
      this.updateTheme()
    },
    updateTheme() {
      document.querySelectorAll('body')[0].className = `vab-theme-${this.theme.themeName}`

      if (this.theme.themeName === 'default') {
        const colorScheme = localStorage.getItem('vueuse-color-scheme')
        const htmlElement = document.querySelectorAll('html')[0]
        htmlElement.className += ` ${colorScheme}`
        this.mode = colorScheme as string
      } else {
        document.querySelectorAll('html')[0].className = ''
        localStorage.setItem('vueuse-color-scheme', 'light')
        this.mode = 'light'
      }

      this.setCssVar()
    },
    setCssVar() {
      /**
       * @description 主题配置，如不精通前端css样式请勿修改
       * @author sundan
       */
      const el = ref<HTMLElement | null>(null)

      //菜单宽度
      if (this.theme.menuWidth && this.theme.menuWidth.endsWith('px')) useCssVar('--el-left-menu-width', el).value = this.theme.menuWidth
      else useCssVar('--el-left-menu-width', el).value = '266px'
      //tabs处理
      if (this.theme.showTabs) {
        useCssVar('--el-tabs-height', el).value = '50px'
      } else {
        useCssVar('--el-tabs-height', el).value = '0px'
      }
      //页脚处理
      if (this.theme.showFooter) {
        useCssVar('--el-footer-height', el).value = '50px'
      } else {
        useCssVar('--el-footer-height', el).value = '-20px'
      }
      //圆角处理
      if (this.theme.radius) {
        useCssVar('--el-border-radius-base', el).value = `${this.theme.radius}px`
      } else {
        useCssVar('--el-border-radius-base', el).value = '5px'
      }
      //分栏一级菜单跟随背景色处理
      if (this.theme.isFollow) {
        useCssVar('--el-menu-background-color', el).value = lightenColorChrome(this.theme.color, 18)
      } else {
        useCssVar('--el-menu-background-color', el).value = '#282c34'
      }
      //主题色处理
      useCssVar('--el-color-primary-dark-2', el).value = this.theme.color
      useCssVar('--el-color-primary', el).value = this.theme.color
      for (let index = 1; index < 10; index++) {
        useCssVar(`--el-color-primary-light-${index}`, el).value = colorRgba(this.theme.color, 1 - index * 0.1)
      }
      //色弱处理
      if (this.theme.colorWeakness) document.querySelectorAll('body')[0].classList.add('color-weakness')
      else document.querySelectorAll('body')[0].classList.remove('color-weakness')
      //字体大小处理
      useCssVar('--el-font-size-base', el).value = this.theme.fontSize
    },
    toggleCollapse() {
      this.collapse = !this.collapse
      localStorage.setItem('collapse', `{"collapse":${this.collapse}}`)
    },
    toggleDevice(device: string) {
      this.updateState({ device })
    },
    openSideBar() {
      this.updateState({ collapse: false })
    },
    foldSideBar() {
      this.updateState({ collapse: true })
    },
    changeLanguage(language: string) {
      this.updateState({ language })
    },
    handleLock() {
      this.updateState({ lock: true })
    },
    handleUnLock() {
      this.updateState({ lock: false })
    },
    updateCaughtTabs(value: any) {
      this.updateState({ persistenceTab: value })
      if (!value) localStorage.removeItem('caughtRoutes')
    },
    changeLogo(logo: string) {
      this.updateState({ logo })
    },
    changeTitle(title: string) {
      this.updateState({ title })
    },
    updateScrollTop(scrollTop: number, routeName: any) {
      const originalArray = [...JSON.parse(localStorage.getItem('scrollTop') || '[]')]
      interface Item {
        routeName: string
        scrollTop: number
      }

      function updateArray(arr: Item[], routeNameToCheck: string, newScrollTopValue: number): Item[] {
        let found = false
        const newArr = arr.map((item) => {
          if (item.routeName === routeNameToCheck) {
            found = true
            return {
              ...item,
              scrollTop: newScrollTopValue,
            }
          }
          return item
        })
        if (!found) {
          newArr.push({ routeName: routeNameToCheck, scrollTop: newScrollTopValue })
        }
        return newArr
      }
      const modifiedArray = updateArray(originalArray, routeName, scrollTop)
      function removeItemsWithZeroScrollTop(arr: Item[]): Item[] {
        return arr.filter((item) => item.scrollTop !== 0)
      }

      const filteredArray = removeItemsWithZeroScrollTop(modifiedArray)

      localStorage.setItem('scrollTop', JSON.stringify(filteredArray))
    },
  },
})
