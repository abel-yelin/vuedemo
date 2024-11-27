import { viteMockServe } from 'vite-plugin-mock'

export const createMock = (localEnabled: boolean, prodEnabled: boolean) => {
  return viteMockServe({
    logger: false,
    ignore: /^index/,
    localEnabled,
    prodEnabled,
    injectCode: `
      import { setupProdMockServer } from '/mock/index'
      setupProdMockServer()
      `,
  })
}
