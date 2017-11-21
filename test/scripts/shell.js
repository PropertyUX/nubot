'use strict'

/**
 * Description:
 * Used for manual tests in shell.
 * Says pong when you say ping.
 *
 * Commands:
 * <ping> - replies pong
 *
 * Notes:
 * Only loads listeners if using shell adapter.
 */
module.exports = function (robot) {
  if (robot.adapter.constructor.name.toLowerCase() !== 'shell') return

  robot.hear(/ping/i, (res) => res.reply('pong'))
  robot.hear(/brain/i, (res) => res.reply(JSON.stringify(robot.brain.data)))
}
