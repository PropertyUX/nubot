'use strict'

const User = require('./user')
const Brain = require('./brain')
const Robot = require('./robot')
const Adapter = require('./adapter')
const Response = require('./response')
const Listener = require('./listener')
const Message = require('./message')

module.exports = {
  User,
  Brain,
  Robot,
  Adapter,
  Response,
  Listener: Listener.Listener,
  TextListener: Listener.TextListener,
  Message: Message.Message,
  TextMessage: Message.TextMessage,
  EnterMessage: Message.EnterMessage,
  LeaveMessage: Message.LeaveMessage,
  TopicMessage: Message.TopicMessage,
  CatchAllMessage: Message.CatchAllMessage,

  loadBot (adapterName, enableHttpd, botName, botAlias) {
    return new module.exports.Robot(adapterName, enableHttpd, botName, botAlias)
  }
}
