/**
 * @description 导入所有 pinia 模块，请勿修改。
 */
import type { App } from 'vue'

const pinia = createPinia()

export function setupStore(app: App<Element>) {
  app.use(pinia)
}

export default pinia
