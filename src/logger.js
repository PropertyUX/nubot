const winston = require('winston')

// write errors to error file, all above debug to combined file, console everything
const logger = winston.createLogger({
  level: process.env.NUBOT_LOG_LEVEL || process.env.HUBOT_LOG_LEVEL || 'info',
  format: winston.format.combine(
    winston.format.timestamp(),
    winston.format.json()
  ),
  transports: [
    new winston.transports.File({ filename: 'error.log', level: 'error', maxsize: 500000 }),
    new winston.transports.File({ filename: 'combined.log', level: 'debug', maxsize: 500000 }),
    new winston.transports.Console({
      format: winston.format.combine(
        winston.format.colorize({ message: true }),
        winston.format.simple()
      )
    })
  ]
})

// export shortcuts to npm level log entries
module.exports = {
  error: (...args) => logger.log('error', ...args),
  warn: (...args) => logger.log('warn', ...args),
  warning: (...args) => logger.log('warn', ...args), // legacy support
  info: (...args) => logger.log('info', ...args),
  verbose: (...args) => logger.log('verbose', ...args),
  debug: (...args) => logger.log('debug', ...args),
  silly: (...args) => logger.log('silly', ...args),
  log: logger, // expose for extending formats etc
  winston
}
