'use strict'

/* eslint-disable no-unused-expressions */

const chai = require('chai')
// const sinon = require('sinon')
chai.use(require('sinon-chai'))

const coffeeClass = require('../coffee-class')

class MockClass {
  constructor () {
    this.truth = true
  }
  func () {
  }
}

describe('Coffee Class', () => {
  it('allows access to protoype methods', () => {
    let moduleExports = { MockClass }
    coffeeClass(moduleExports)
    console.log(moduleExports)
    let Mock = new moduleExports.MockClass()
    console.log(Object.keys(Mock.protoype))
    Mock.prototype.func.should.be.a('function')
  })
})
