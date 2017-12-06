'use strict'

// TODO logger conflicts with coffeeClass, re-instate when CS depreciated

// const logger = require('./logger')
const User = require('./user')
const Brain = require('./brain')
const Robot = require('./robot')
const Adapter = require('./adapter')
const Response = require('./response')
const Listener = require('./listener')
const Message = require('./message')

module.exports = {
  // logger,
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

  loadBot (adapterName, storageAdapter, enableHttpd, botName, botAlias, logLevel) {
    return new module.exports.Robot(adapterName, storageAdapter, enableHttpd, botName, botAlias, logLevel)
  }
}
