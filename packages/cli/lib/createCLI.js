import { program } from "commander";
import { dirname } from "dirname-filename-esm";
import path from "path";
import fse from 'fs-extra'
import { log, checkNodeVersion } from "@roninz/utils";


// 获取package.json
function getPkg() {
  const __dirname = dirname(import.meta)
  const pkgPath = path.join(__dirname, '../package.json')
  const pkg = fse.readJSONSync(pkgPath)
  return pkg
}


export default function createCLI() {
  const pkg = getPkg()
  const name = Object.keys(pkg.bin)[0]
  log.info(`当前版本为：${pkg.version}`)

  program.name(name)
    .usage('<command> [options]')
    .version(pkg.version)
    .option('-d, --debug', '是否开启全局模式', false)
    .hook('postAction', () => {
      checkNodeVersion()
    })

  // 监听debug
  program.on('option:debug', function () {
    console.log(program.opts());
    if (program.opts().debug) {
      log.verbose('debug', '运行debug模式')
    }
  })

  // 处理未知的命令
  program.on('command:*', function (obj) {
    log.error('未知的命令：' + obj[0])
  })

  return program
}