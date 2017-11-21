'use strict'

require('coffee-script').register() // support coffee scripts
if (process.env.NOVE_ENV === 'development') require('dotenv').config() // use local .env

const fs = require('fs')
const resolve = require('path').resolve
const mockery = require('mockery')
const playbook = require('hubot-playbook')
const args = require('./argv')
const Nubot = require('./src')
const coffeeClass = require('./coffee-class')
mockery.enable({ warnOnReplace: false, warnOnUnregistered: false })
mockery.registerSubstitute('hubot', 'nubot')

// TODO: refactor all script loading as robot methods
// This attempts to load two fixed paths before using options, so it would load
// all three if they existed. The option should *override* the default, not add.
function loadScripts (robot, scripts) {
  robot.load(resolve('.', 'scripts'))
  robot.load(resolve('.', 'src', 'scripts'))
  loadExternalScripts(robot)
  scripts.forEach((scriptPath) => {
    if (scriptPath[0] === '/') return robot.load(scriptPath)
    robot.load(resolve('.', scriptPath))
  })
}

function loadExternalScripts (robot) {
  const externalScripts = resolve('.', 'external-scripts.json')
  if (!fs.existsSync(externalScripts)) return
  fs.readFile(externalScripts, function (error, data) {
    if (error) throw error
    try {
      robot.loadExternalScripts(JSON.parse(data))
    } catch (error) {
      console.error(`Error parsing JSON data from external-scripts.json: ${error}`)
      process.exit(1)
    }
  })
}

Nubot.start = function (options) {
  let config = Object.assign({}, args, options)
  const robot = Nubot.loadBot(
    config.adapter,
    config.httpd,
    config.name,
    config.alias,
    config.logLevel
  )
  playbook.use(robot) // make playbook available to all scripts
  robot.adapter.on('connected', () => loadScripts(robot, config.scripts))
  robot.run()
  return robot
}

module.exports = coffeeClass(Nubot)
