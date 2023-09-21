import { isDebugger, log } from "@roninz/utils";

function printErrorLog(e, type) {
  if (isDebugger()) {
    log.error(type, e)
  } else {
    log.error(type, e.message)
  }
}

process.on('uncaughtException', e => printErrorLog(e, 'error'))

process.on('unhandledRejection', e => printErrorLog(e, 'promise'))