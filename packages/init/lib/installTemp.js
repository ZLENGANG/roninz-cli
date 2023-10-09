import { log } from "@roninz/utils";
import fse from "fs-extra";
import path from "path";
import { pathExistsSync } from "path-exists";
import ora from "ora";
function getCacheFilePath(targetPath, template) {
  return path.resolve(targetPath, 'node_modules', template.npmName)
}

function copyFile(targetPath, template, installDir) {
  const originFile = getCacheFilePath(targetPath, template)
  const fileList = fse.readdirSync(originFile)
  const loading = ora('正在拷贝模板文件...').start()
  fileList.map(file => {
    fse.copySync(`${originFile}/${file}`, `${installDir}/${file}`)
  })
  loading.stop()
  log.success('模板拷贝成功！')
  fse.removeSync(targetPath)
}

export default async function installTemp(selectedTemplate, opts) {
  const { force } = opts
  const { targetPath, name, template } = selectedTemplate
  const rootDir = process.cwd()
  fse.ensureDirSync(targetPath)
  const installDir = path.resolve(`${rootDir}/${name}`)
  if (pathExistsSync(installDir)) {
    if (!force) {
      log.error(`当前目录下已存在${installDir}文件夹！`)
      return
    }
    fse.removeSync(installDir)
    fse.ensureDirSync(installDir)
  } else {
    fse.ensureDirSync(installDir)
  }
  copyFile(targetPath, template, installDir)
}