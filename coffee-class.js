'use strict'

const util = require('util')

/**
 * Convert Javascript class prototype to be CoffeeScript compatible
 *
 * Pass methods from child to returned instance.
 * Support for constructor methods which call super() in which this.* properties are set.
 *
 * @param       {Object} JavascriptClass An exported JS class
 */
function makeClassCoffeeScriptCompatible (JavascriptClass) {
  function CoffeeScriptCompatibleClass () {
    const ConvertedPrototype = Function.prototype.bind.apply(JavascriptClass, [null].concat([].slice.call(arguments)))
    const instance = new ConvertedPrototype()
    for (let key in this) instance[key] = this[key]
    for (let key in instance) this[key] = instance[key]
    return instance
  }
  util.inherits(CoffeeScriptCompatibleClass, JavascriptClass)
  return CoffeeScriptCompatibleClass
}

// parse es2015 class declarations to be compatible with CoffeeScript’s extend
// see https://github.com/hubotio/evolution/pull/4#issuecomment-306437501
module.exports = function (convertClass) {
  return Object.keys(convertClass).reduce((map, current) => {
    if (current !== 'loadBot') map[current] = makeClassCoffeeScriptCompatible(convertClass[current])
    else map[current] = convertClass[current]
    return map
  }, {})
}
