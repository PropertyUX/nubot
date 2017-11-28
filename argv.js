'use strict'

// Pass command line args and env vars to produce options object

const yargs = require('yargs')

const getArgv = (robot) => yargs
  .usage('\nUsage:                      $0 [args]')
  .env('HUBOT')
  .pkgConf('botConfig')
  .option('adapter', {
    alias: 'a',
    type: 'string',
    describe: 'The adapter name to use.\nIf its not a default adapter it will require from node modules with "hubot-" prefix.\n',
    default: 'shell'
  })
  .example('adapter', 'bin/nubot -a rocketchat (will require "hubot-rocketchat")')
  .option('storageAdapter', {
    alias: 's',
    type: 'string',
    describe: 'The package name to require for storing brain data key-value pairs (e.g. to Redis or MongoDB)'
  })
  .option('log-level', {
    type: 'string',
    describe: 'The starting minimum level for logging events (silent|degug|info|warning|error).\n',
    default: 'info'
  })
  .option('httpd', {
    type: 'boolean',
    describe: 'Enable the HTTP server.\nThis option added to keep cli args consistent with internal options.\n',
    default: true
  })
  .option('disable-httpd', {
    alias: 'd',
    type: 'boolean',
    describe: 'Disiable the HTTP server.\nFor compatibility with hubot v2 args, overrides `http` if both set.\n',
    default: false
  })
  .option('name', {
    alias: 'n',
    type: 'string',
    describe: 'Name of the robot in chat.\nPrepending any command with the robot\'s name will trigger respond listeners.\n',
    default: 'nubot'
  })
  .option('alias', {
    alias: 'l',
    type: 'string',
    describe: 'Alternate name for robot.\n',
    default: false
  })
  .option('scripts', {
    alias: ['require', 'r'],
    type: 'array',
    describe: 'Alternative scripts paths\n',
    default: []
  })
  .config()
  .alias('config', 'c')
  .example('config', 'bin/nubot -c bot-config.json')
  .version(() => require('./package.json').version)
  .alias('version', 'v')
  .help()
  .alias('help', 'h')
  .epilogue('Any option can be provided as an environment variable, with the prefix HUBOT_\nConfig can also be declared in package.json with the key: "botConfig"\nFor more information, see https://propertyux.github.io/nubot')
  .check((yargs) => {
    if (yargs.disableHttpd) yargs.httpd = !yargs.disableHttpd
    return yargs
  })
  .fail(function (msg, err) {
    console.error('ERROR: ' + msg)
    console.error('Start with --help for config argument info.')
    if (err) throw err // preserve stack
    process.exit(1)
  })
  .argv

if (process.platform !== 'win32') process.on('SIGTERM', () => process.exit(0))

// call on require to just returns the options
module.exports = getArgv()
