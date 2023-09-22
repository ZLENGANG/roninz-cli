import Command from "@roninz/command";

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

  action(params) {
  }
}

export default function Init(instance) {
  return new InitCommand(instance);
}