#!/usr/bin/env node
import importLocal from "import-local";
import { filename } from "dirname-filename-esm";
import { log } from "@roninz/utils";
import entry from '../lib/index.js'

const __filename = filename(import.meta)
if (importLocal(__filename)) {
  log.info('cli', '使用本次 cli-imooc 版本');
} else {
  entry(process.argv.slice(2))
}
