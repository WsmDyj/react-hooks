import React, { Component } from 'react'

@testDecorator
class Decorator extends Component {
  render() {
    return (
      <>
        
      </>
    )
  }
}
console.log(Decorator.isTestDecorator)  // true

function testDecorator(target) {
  target.isTestDecorator = true
}

export default Decorator
