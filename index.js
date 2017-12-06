'use strict'

require('coffee-script').register() // support coffee scripts
if (process.env.NOVE_ENV === 'development') require('dotenv').config() // use local .env

const mockery = require('mockery')
const playbook = require('nubot-playbook')
const args = require('./argv')
const Nubot = require('./src')
const coffeeClass = require('./coffee-class')
mockery.enable({ warnOnReplace: false, warnOnUnregistered: false })
mockery.registerSubstitute('hubot', 'nubot') // to support legacy adapters

// TODO: add tests to ensure promises resolve when adapter connects and brain
// loads, and fix probable untested issue, where they won't if there's no
// connection required by either the adapter or the brain
// TODO: refactor arguments as options object, accept brain connector ala adapter
Nubot.start = function (options) {
  let config = Object.assign({}, args, options)
  const robot = Nubot.loadBot(
    config.adapter,
    config.storageAdapter,
    config.httpd,
    config.name,
    config.alias,
    config.logLevel
  )
  let brainReady = new Promise((resolve) => robot.brain.once('connected', resolve))
  let adapterReady = new Promise((resolve) => robot.adapter.once('connected', resolve))
  let robotReady = Promise.all([brainReady, adapterReady]).then(() => {
    playbook.use(robot) // make playbook available to all scripts
    robot.loadScripts(config.scripts)
    robot.loadPackages(config.scripts)
    return robot
  })
  robot.run()
  return robotReady
}

module.exports = coffeeClass(Nubot)
