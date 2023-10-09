import path from "path";
import { pathExistsSync } from "path-exists";
import fse from "fs-extra";
import { log, printErrorLog } from "@roninz/utils";
import ora from "ora";
import { execa } from "execa";

function getCacheDir(targetPath) {
  return path.join(targetPath, 'node_modules')
}


function makeCacheDir(targetPath) {
  const cacheDir = getCacheDir(targetPath);
  if (!pathExistsSync(cacheDir)) {
    fse.mkdirpSync(cacheDir)
    log.success('创建缓存目录成功！')
  }
}

async function downloadRealTenp(targetPath, selectedTemplate) {
  const { npmName, version } = selectedTemplate
  const installCommand = "npm"
  const installArgs = ['install', `${npmName}@${version}`]
  const cwd = targetPath
  log.verbose('installArgs', installArgs)
  log.verbose('cwd', cwd)
  await execa(installCommand, installArgs, { cwd })
}

export default async function downloadTemp(selectedTemplate) {
  const { template, targetPath } = selectedTemplate
  makeCacheDir(targetPath)
  const loading = ora('正在下载模板...').start()
  try {
    await downloadRealTenp(targetPath, template)
    loading.stop()
    log.success('下载模板成功');
  } catch (error) {
    loading.stop()
    printErrorLog(error)
  }
}