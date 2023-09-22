import semver from "semver";
import chalk from "chalk";
import { log } from "./index.js";

// 本脚手架最低版本要求
export const LOWEST_NODE_VESION = '14.0.0'


// 检查当前node版本是否比最低版本要求低
export function checkNodeVersion() {
  log.success('node version:', process.version)
  if (!semver.gte(process.version, LOWEST_NODE_VESION)) {
    throw new Error(chalk.red(`roninz-cli 需要安装 ${LOWEST_NODE_VESION} 以上版本的Node.js`))
  }
}