## React项目中配置装饰器
> npm install @babel/plugin-proposal-decorators

 package.json文件，然后再bable中添加 
 `"plugins": [ [ "@babel/plugin-proposal-decorators", { "legacy": true } ] ]`

 ## 装饰器的原理
 装饰器是一个函数，用来修改类的行为。该过程在代码的编译时发生，而不是运行时。装饰器本事就是编译时执行的函数。
```
 @decorator
 class A {}

 // 等同于class A {}
 A = decorator(A) || A
```

## 装饰器的介绍
`装饰器的第一个参数就是所要修饰的目标类`。如果觉得一个参数不够用，可以在装饰器外面在封装一层函数
```
function testDecorator(isTestDecorator) {
  return function(target) {
    target.isTestDecorator = isTestDecorator
  }
}
```

## 方法的修饰
装饰器不仅可以修饰类，还可以修饰类的属性。

`修饰器只能用于修饰类和类的方法，不能用于函数，存在函数提升`

```
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

```
此时装饰器函数一共可以接受三个参数，第一个所要修饰的目标对象、第二个所要修饰的属性名、第三个该属性的描述对象