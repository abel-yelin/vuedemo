import basicSsl from '@vitejs/plugin-basic-ssl'

export const createHttps = () => {
  return basicSsl()
}
