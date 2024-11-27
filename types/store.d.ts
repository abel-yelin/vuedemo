declare interface AclModuleType {
  admin: boolean
  permission: string[]
  role: string[]
}

declare interface BingModuleType {
  backgroundList: string[]
}

declare interface ErrorLogModuleType {
  errorLogs: any[]
}

declare interface RoutesModuleType {
  tab: {
    data: string | undefined
  }
  tabMenu: string | undefined
  activeMenu: {
    data: string | undefined
  }
  routes: any[]
  allRoutes: any[]
  breadcrumbRoutes: any[]
}

declare type DeviceType = 'mobile' | 'desktop'
declare type LanguageType = 'zh' | 'en'

declare interface SettingsModuleType {
  collapse: boolean
  device: DeviceType
  language: LanguageType
  lock: boolean
  logo: string
  mode: string
  persistenceTab: boolean
  theme: ThemeType
  title: string
  scrollTop: []
}

declare interface TabsModuleType {
  caughtRoutes: []
  visitedRoutes: any[]
}

declare interface UserModuleType {
  avatar: string
  token: string | boolean
  username: string
}
