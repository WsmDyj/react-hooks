import React, { Component } from 'react'

class Math {
  @log
  add(a, b) {
    return a + b
  }
}

function log(target, name, descriptor) {
  var oldValue = descriptor.value
  descriptor.value = function () {
    console.log(`Calling ${name} width`, arguments)
    return oldValue.apply(null, arguments)
  }
  return descriptor
}

const math = new Math()
console.log(math.add(2, 4))

class Decorator extends Component {
  render() {
    return (
      <>
      </>
    )
  }
}
export default Decorator
