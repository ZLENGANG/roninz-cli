import Command from "@roninz/command";
import createTemp from "./createTemp.js";

class InitCommand extends Command {
  get command() {
    return 'init [name]'
  }

  get description() {
    return 'init project'
  }

  get options() {
    return [
      ['-f, --force', '是否强制更新', false],
      ['-t, --type <type>', '项目类型(值：project/page)'],
      ['-tp, --template <template>', '模板名称']
    ]
  }

  action([name, opts]) {
    // 1、创建模板
    createTemp(name, opts)
    // 2、下载模板
    // 3、安装模板
  }
}

export default function Init(instance) {
  return new InitCommand(instance);
}