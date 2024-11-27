import { VitePWA } from 'vite-plugin-pwa'

export const createPwa = (nodeEnv: string, pwaDev: boolean) => {
  return VitePWA({
    base: nodeEnv === 'development' && pwaDev ? '/' : './', // ./ 或 /
    registerType: 'autoUpdate', // promp弹窗提示手动更新、autoUpdate自动更新，建议使用自动更新
    workbox: {
      cleanupOutdatedCaches: true,
      maximumFileSizeToCacheInBytes: 4 * 1024 * 1024,
    },
    devOptions: {
      enabled: pwaDev,
    },
    manifest: {
      lang: 'zh',
      name: 'Vue Shop Vite',
      short_name: 'Vue Shop Vite',
      description: 'Vue Shop Vite官网、文档、演示地址',
      background_color: '#ffffff',
      theme_color: '#ffffff',
      icons: [
        {
          src: 'pwa-64x64.png',
          sizes: '64x64',
          type: 'image/png',
        },
        {
          src: 'pwa-192x192.png',
          sizes: '192x192',
          type: 'image/png',
        },
        {
          src: 'pwa-512x512.png',
          sizes: '512x512',
          type: 'image/png',
          purpose: 'any',
        },
        {
          src: 'maskable-icon-512x512.png',
          sizes: '512x512',
          type: 'image/png',
          purpose: 'maskable',
        },
      ],
    },
  })
}
