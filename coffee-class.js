'use strict'

const inherits = require('util').inherits

function makeClassCoffeeScriptCompatible (klass) {
  function CoffeeScriptCompatibleClass () {
    const Hack = Function.prototype.bind.apply(klass, [null].concat([].slice.call(arguments)))
    const instance = new Hack()

    // pass methods from child to returned instance
    for (const key in this) {
      instance[key] = this[key]
    }

    // support for constructor methods which call super()
    // in which this.* properties are set
    for (const key in instance) {
      this[key] = instance[key]
    }

    return instance
  }
  inherits(CoffeeScriptCompatibleClass, klass)

  return CoffeeScriptCompatibleClass
}

// parse es2015 class declarations to be compatible with CoffeeScript’s extend
// see https://github.com/hubotio/evolution/pull/4#issuecomment-306437501
module.exports = function (convertClass) {
  return Object.keys(convertClass).reduce((map, current) => {
    if (current !== 'loadBot') {
      map[current] = makeClassCoffeeScriptCompatible(convertClass[current])
    } else {
      map[current] = convertClass[current]
    }
    return map
  }, {})
}
