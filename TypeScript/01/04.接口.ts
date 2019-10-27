// 对传入对象的约束
function printLabel(labelInfo: { label: string }): void {
  console.log(labelInfo.label);
}
printLabel({ label: "出现错误" })


// 接口
interface User {
  name: string
  age: number
  sex?: string
}
function printUser(user: User) {
  console.log("user name:", user.name);
  console.log("user age:", user.age);
}
printUser({ name: "huahua", age: 18 })


// 函数类型接口：对方法传入的参数以及返回值进行约束
interface encrypt {
  (key: string, value: string): string
}
var md5: encrypt = function (key: string, value: string): string {
  return key + value
}
var sha1: encrypt = function (key: string, value: string): string {
  return key + "---" + value
}
console.log(md5("name", "张三"));


// 可索引接口：数组、对象的约束 （不常用）
interface UserArr {
  [index: number]: string
}
var arr: UserArr = ["123", "456"]
console.log(arr[0]);
interface UserObj {
  [index: string]: string
}
var userobj: UserObj = {
  "name": "花花",
  "age": "18",
}


// 类类型接口：对类的约束，和抽象类有点相似
interface OtherAnimal {
  name: string
  eat(str: string): void
}
class Cat implements OtherAnimal {
  name: string
  constructor(name: string) {
    this.name = name
  }
  eat(food: string) {
    console.log(`${this.name}吃${food}`);
  }
}
var cat = new Cat("大花猫")
cat.eat("鱼罐头")


// 接口的扩展： 接口可以继承接口
interface EarthAnimal {
  eat(): void
}
interface EarthHuman extends EarthAnimal {
  work(): void
}
class Human implements EarthHuman {
  name: string
  constructor(name: string) {
    this.name = name
  }
  eat() {
    console.log("吃饭");
  }
  work() {
    console.log("写代码");
  }
}
var human = new Human("huahua")
human.eat()
human.work()

