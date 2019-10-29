// 0. 装饰器
function f() {
  console.log("f() defined");
  return function () {
    console.log("f() called");
  }
}
function g() {
  console.log("g() defined");
  return function () {
    console.log("g() called");
  }
}
// class C {
//   @f()
//   @g()
//   method() { }
// }

// 1. 类装饰器
function logClass(params: string) {
  // params是传入装饰器的参数
  return function (target: any) {
    // target 是类本身
    console.log("params:", params);
    console.log("target", target);
    target.prototype.apiUrl = "https://www.esunr.xyz"
  }
}
@logClass("abc")
class HttpClient {
  [x: string]: any;
  constructor() { }
  getData() { }
}
var http = new HttpClient()
console.log(http.apiUrl);


// 使用类装饰器重载类的构造函数或方法
function classDecorator<T extends { new(...args: any[]): {} }>(constructor: T) {
  return class extends constructor {
    newProperty = "new property"
    hello: string = "override"
  }
}
@classDecorator
class Greeter {
  [x: string]: any; // 防止报错
  property = "property"
  hello: string
  constructor(m: string) {
    this.hello = m
  }
}
var greeter = new Greeter("message")
console.log(greeter.hello); // override
console.log(greeter.newProperty); // new property

// 2. 属性装饰器
function propertyDecorator(params: any) {
  return function (target: any, attr: any) {
    target[attr] = params
  }
}
class Loger {
  @propertyDecorator("test")
  public msg: string | undefined
  constructor() { }
  getLog() {
    console.log(this.msg);
  }
}
var loger = new Loger()
loger.getLog() // test


// 方法装饰器
function get(params: any) {
  return function (target: any, methodName: any, desc: any) {
    // target 在实例成员上是原型对象
    // 修改装饰器的方法，吧装饰器方法里面传入的所有参数改为 string 类型
    // 1. 保存当前的方法
    var oMethod: Function = desc.value
    // 2. 改造方法
    desc.value = function (...args: any[]) {
      args = args.map((value) => {
        return String(value)
      })
      console.log(args);
      // 3. 继续执行原方法
      oMethod.apply(this, args)
    }
  }
}
class HttpClient2 {
  public url: any | undefined
  constructor(url: string) {
    this.url = url
  }
  @get("new data")
  getData() {
    console.log("我是 get data 的方法");
  }
}
let httpclient = new HttpClient2("old data")
httpclient.getData("111", 132) // ["111", "123"] 我是get data 的方法



// 方法参数装饰器
function logParams(params: any) {
  console.log(params);
  return function (target: any, methodName: any, paramsIndex: any) {
    target.newUrl = "new url"
    console.log(methodName);
    console.log(paramsIndex);
  }
}
class HttpClient3 {
  public url: any | undefined
  constructor(url: string) {
    this.url = url
  }
  getData(@logParams('url') url: any) {
    console.log(`我是 get data 的方法 ${url}`);
  }
}

var httpclient3 = new HttpClient3("new data")
httpclient3.getData("get data")

// 执行顺序：参数装饰器、方法执行装饰器、访问符装饰器、属性装饰器