'use strict'

if (process.env.NOVE_ENV === 'development') {
  require('dotenv').config()
}

require('coffee-script').register()
const fs = require('fs')
const {resolve} = require('path')
const Nubot = require('./src')
const mockery = require('mockery')
const playbook = require('hubot-playbook')
mockery.enable({ warnOnReplace: false, warnOnUnregistered: false })
mockery.registerSubstitute('hubot', 'nubot')

const defaults = {
  adapter: process.env.NUBOT_ADAPTER || process.env.HUBOT_ADAPTER || 'shell',
  alias: process.env.NUBOT_ALIAS || process.env.HUBOT_ALIAS || false,
  create: process.env.NUBOT_CREATE || process.env.HUBOT_CREATE || false,
  disableHttpd: !process.env.NUBOT_HTTPD || !process.env.HUBOT_HTTPD || false,
  scripts: process.env.NUBOT_SCRIPTS || process.env.HUBOT_SCRIPTS || [],
  name: process.env.NUBOT_NAME || process.env.HUBOT_NAME || 'Nubot',
  path: process.env.NUBOT_PATH || process.env.HUBOT_PATH || '.',
  configCheck: false
}

Nubot.start = function (options) {
  let config = Object.assign(defaults, options)
  const robot = Nubot.loadBot(undefined, config.adapter, !config.disableHttpd, config.name, config.alias)
  robot.adapter.on('connected', () => loadScripts(robot, config.scripts))
  robot.run()
  return robot
}

function loadScripts (robot, scripts) {
  playbook.use(robot) // make playbook available to all scripts
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

module.exports = Nubot
