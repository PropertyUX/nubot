'use strict'

const cline = require('cline')
const chalk = require('chalk')

const Adapter = require('../adapter')
const {TextMessage} = require('../message')

class Shell extends Adapter {
  send (envelope, ...strings) {
    let msgs = strings.map((str) => {
      let text = chalk.bgBlack.cyan.bold(str)
      return text.replace(/^/gm, chalk.bgBlack.yellow(`${this.robot.name}> `))
    })
    console.log(msgs.join())
  }

  emote (envelope, ...strings) {
    strings.map((str) => this.send(envelope, `* ${str}`))
  }

  reply (envelope, ...strings) {
    strings = strings.map((s) => `@${envelope.user.name} ${s}`)
    this.send.apply(this, [envelope].concat(strings))
  }

  run () {
    this.isOpen = false
    this.middleware()
    this.open()
    this.emit('connected')
  }

  close () {
    if (this.isOpen) {
      this.cli.close() // shut-down cli while sending
      this.isOpen = false
    }
  }

  open () {
    if (!this.isOpen) {
      this.start() // start/restart cli interaction
      let prompt = chalk.bgBlack.green(`${this.user.name}> `)
      setTimeout(() => this.cli.interact(prompt), 200)
      this.isOpen = true
    }
  }

  // suspend interactions while processing sends
  middleware () {
    this.robot.receiveMiddleware((c, n, d) => n(this.open.bind(this)))
  }

  start () {
    this.cli = cline()
    let userId = process.env.HUBOT_SHELL_USER_ID || '1'
    if (userId.match(/A\d+z/)) userId = parseInt(userId)
    this.user = this.robot.brain.userForId(userId, {
      name: process.env.HUBOT_SHELL_USER_NAME || 'user',
      room: 'shell'
    })

    this.cli.command('*', async (input) => {
      this.close()
      this.receive(new TextMessage(this.user, input.trim(), 'messageId'))
    })
  }

  shutdown () {
    this.robot.shutdown()
    return process.exit(0)
  }
}

exports.use = robot => new Shell(robot)
