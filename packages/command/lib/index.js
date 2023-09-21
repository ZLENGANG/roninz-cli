export default class Command {
  constructor(instance) {
    if (!instance) {
      throw new Error('command instance must not be null!')
    }
    this.program = instance
    const program = instance.command(this.command)

    program.description(this.description)

    program.hook('preAction', () => {
      this.preAction()
    })

    program.hook('postAction', () => {
      this.postAction()
    })

    if (this.options?.length > 0) {
      this.options.forEach(option => {
        program.option(...option)
      })
    }

    program.action((...params) => {
      this.action(params)
    })
  }

  get command() {
    throw new Error('command must be implements')
  }

  get description() {
    throw new Error('description must be implements')
  }

  get options() {
    return []
  }

  get action() {
    throw new Error('action must be implements')
  }

  preAction() { }

  postAction() { }
}