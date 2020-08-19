import React, { Component } from 'react'

function mixins(...list) {
  return function (target) {
    Object.assign(target.prototype, ...list)
  }
}

const Foo = {
  foo() {
    console.log('hello foo')
  }
}

@mixins(Foo)
class myClass { }
let obj = new myClass()
obj.foo()



class Decorator extends Component {
  render() {
    return (
      <>
      </>
    )
  }
}
export default Decorator
