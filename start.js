'use strict'

// example running robot without bin, e.g. to use with node debug
// start method accepts options that override config args

const nubot = require('./')
nubot.start({ adapter: 'shell' })
