import basicSsl from '@vitejs/plugin-basic-ssl'
import autoprefixer from 'autoprefixer'
import dayjs from 'dayjs'
import { resolve } from 'node:path'
import { visualizer } from 'rollup-plugin-visualizer'
import type { ConfigEnv, UserConfig } from 'vite'
import { defineConfig, loadEnv } from 'vite'
import {
  assetsDir,
  base,
  chunkSizeWarningLimit,
  cssCodeSplit,
  exclude,
  https,
  include,
  minify,
  open,
  outDir,
  outputHash,
  port,
  reportCompressedSize,
} from '/@/config'
import { createVitePlugin, createWatch } from '/@vab/build'

const lastBuildTime = dayjs().format('YYYY-MM-DD HH:mm:ss')

export default defineConfig(({ mode }: ConfigEnv): UserConfig => {
  process.env['VITE_APP_UPDATE_TIME'] = lastBuildTime
  process.env['VITE_USER_NODE_ENV'] = mode
  const root = process.cwd()
  const env = loadEnv(mode, root)
  createWatch(env)
  console.log(lastBuildTime)

  return {
    base,
    root,
    server: {
      open,
      port,
      hmr: {
        overlay: true,
      },
      host: '0.0.0.0',
      warmup: {
        clientFiles: ['./index.html', './library/{components,layouts}/*', './src/{views,plugins}/*'],
      },
      https,
    },
    resolve: {
      alias: {
        '~/': `${resolve(__dirname, '.')}/`,
        '/@/': `/${resolve(__dirname, 'src')}/`,
        '/@vab/': `/${resolve(__dirname, 'library')}/`,
      },
    },
    optimizeDeps: {
      include,
      exclude,
    },
    build: {
      assetsDir,
      chunkSizeWarningLimit,
      cssCodeSplit,
      outDir,
      reportCompressedSize,
      rollupOptions: {
        onwarn: () => {
          return
        },
        output: {
          chunkFileNames: outputHash ? 'static/js/[name]-[hash].js' : 'static/js/[name].js',
          entryFileNames: outputHash ? 'static/js/[name]-[hash].js' : 'static/js/[name].js',
          assetFileNames: outputHash ? 'static/[ext]/[name]-[hash].[ext]' : 'static/[ext]/[name].[ext]',
          manualChunks: {
            'vsv-element-plus': ['element-plus'],
            'vsv-nprogress': ['nprogress'],
            'vsv-icon': ['vsv-icon'],
            'vsv-echarts': ['echarts'],
          },
        },
      },
      minify,
      sourcemap: false,
    },
    css: {
      postcss: {
        plugins: [
          autoprefixer({ grid: true }) as any,
          {
            postcssPlugin: 'internal:charset-removal',
            AtRule: {
              charset: (atRule: { name: string; remove: () => void }) => {
                if (atRule.name === 'charset') atRule.remove()
              },
            },
          },
        ],
      },
      preprocessorOptions: {
        scss: {
          api: 'modern-compiler', // 修复警告: Deprecation Warning: The legacy JS API is deprecated and will be removed in Dart Sass 2.0.0.
          sassOptions: { outputStyle: 'expanded' },
          // additionalData(content: string, loaderContext: string) {
          //   return ['variables.scss'].includes(basename(loaderContext))
          //     ? content
          //     : `@use "~/library/styles/variables.scss" as *;${content}`
          // },
        },
      },
      devSourcemap: true,
    },
    plugins: [
      ...(createVitePlugin(env) as any),
      basicSsl(),
      visualizer({
        filename: 'stats.html',
        title: 'Rollup Stats',
        gzipSize: true,
        brotliSize: true,
        emitFile: true,
      }),
    ],
    define: {
      // 如果您必须使用华为组件库且打包报错，请放开该行，放开注释后会将您的环境变量暴露给华为组件库
      // 'process.env': { ...process.env },
    },
  }
})
