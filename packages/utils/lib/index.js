import log from "./log.js";
import isDebugger from "./isDebugger.js";
import { checkNodeVersion } from "./utils.js";
import { makeList, makeInput } from './inquirer.js'
import { getLatestVersion } from './npm.js'

export function printErrorLog(e, type) {
  if (isDebugger()) {
    log.error(type, e);
  } else {
    log.error(type, e.message);
  }
}

export {
  log,
  isDebugger,
  checkNodeVersion,
  makeList,
  makeInput,
  getLatestVersion
}