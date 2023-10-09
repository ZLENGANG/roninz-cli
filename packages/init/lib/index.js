import Command from "@roninz/command";
import createTemp from "./createTemp.js";
import downloadTemp from "./downloadTemp.js";
import installTemp from "./installTemp.js";

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

  async action([name, opts]) {
    // 1、创建模板
    const selectedTemplate = await createTemp(name, opts)

    // 2、下载模板
    await downloadTemp(selectedTemplate)

    // 3、安装模板
    await installTemp(selectedTemplate, opts)
  }
}

export default function Init(instance) {
  return new InitCommand(instance);
}