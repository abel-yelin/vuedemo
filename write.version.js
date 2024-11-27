/**
 * @description: 演示地址自动生成版本号及压缩包
 * @author sundan
 */
const fs = require('node:fs').promises
const path = require('node:path')
const AdmZip = require('adm-zip')
const package = require('./package.json')
const dayjs = require('dayjs')

const publicVersionFilePath = path.join('./public', 'vue-shop-vite-version.json')
const distVersionFilePath = path.join('./dist', 'vue-shop-vite-version.json')
const zipFilePath = path.join('./dist', 'dist.zip')

const data = {
  version: package.version,
}

async function writeVersionFile(filePath) {
  try {
    await fs.writeFile(filePath, JSON.stringify(data, null, 2))
    console.log(`${filePath} 版本号写入成功！`)
  } catch (error) {
    console.error(`${filePath} 版本号写入失败！`, error.message)
  }
}

async function createZipArchive() {
  try {
    if (
      await fs
        .access(zipFilePath)
        .then(() => true)
        .catch(() => false)
    ) {
      await fs.unlink(zipFilePath)
    }
    const zip = new AdmZip()
    zip.addLocalFolder('./dist')
    zip.writeZip(zipFilePath)
    console.log(`dist 压缩成功！`)
  } catch (error) {
    console.error(`dist 压缩失败！`, error.message)
  }
}

async function main() {
  try {
    await writeVersionFile(publicVersionFilePath)
    await writeVersionFile(distVersionFilePath)
    await createZipArchive()
    const lastBuildTime = dayjs().format('YYYY-MM-DD HH:mm:ss')
    console.log(`最后构建时间: ${lastBuildTime}`)
  } catch (error) {
    console.error('执行脚本时发生错误:', error.message)
  }
}

main()
