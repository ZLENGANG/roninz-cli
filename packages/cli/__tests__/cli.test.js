import path from "path";
import { execa } from "execa";

// 1、引入需要测试的文件
const CLI = path.join(__dirname, '../bin/cli.js')
const bin = () => (...args) => execa(CLI, args)

// 测试运行错误的命令
test('测试运行错误的命令', async () => {
  const { stderr } = await bin()('11111111')
  expect(stderr).toContain('未知的命令：11111111')
})

// 测试help命令不报错
test('测试help命令不报错', async () => {
  let error = null
  try {
    await bin()('--help')
  } catch (e) {
    error = e
  }
  expect(error).toBe(null)
})

// 测试version正确显示
test('测试version正确显示', async () => {
  const { stdout, stderr } = await bin()('-V')
  expect(stdout).toContain(require('../package.json').version)
})

// 测试是否正确开启debug模式
test('测试是否正确开启debug模式', async () => {
  let error = null
  try {
    await bin()('--debug')
  } catch (e) {
    error = e
  }
  expect(error.message).toContain('运行debug模式')
})