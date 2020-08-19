import React, { Component } from 'react'

@testDecorator(false)
class Decorator extends Component {
  render() {
    return (
      <>

      </>
    )
  }
}
console.log(Decorator.isTestDecorator)  // true

// 一个参数
// function testDecorator(target) {
//   target.isTestDecorator = true
// }

// 多个参数
function testDecorator(isTestDecorator) {
  return function (target) {
    target.isTestDecorator = isTestDecorator
  }
}

export default Decorator
