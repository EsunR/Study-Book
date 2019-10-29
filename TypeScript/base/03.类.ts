// 1. 定义类
class Person {
  name: string // 属性 前面省略了 public 关键词
  constructor(n: string) { // 构造函数，实例化类时触发的方法
    this.name = n
  }
  run(): void {
    console.log(this.name);
  }
  getName(): string {
    return this.name
  }
  setName(name: string): void {
    this.name = name
  }
}
let person = new Person("huahua")
person.run()
person.setName("张三")
console.log(person.getName());


// 2. 类继承
class Web extends Person {
  constructor(name: string) {
    super(name)
  }
}
var w = new Web("李四")
w.run()


// 3. 类里面的修饰符
/**
 * public：公有           类里面、子类、类外面都可以访问
 * protected：保护类型     类里面、子类里面可以访问，在类外部没法访问
 * private：私有          类里面可以访问，子类、类外部都没法访问
 * 
 * 变量前没有加修饰符默认就是公有
 */


// 4. 静态属性与静态方法
class Person2 {
  static age: number = 18
  public name: string
  constructor(name: string) {
    this.name = name
  }
  // 实例方法
  run(): void {
    console.log(this.name);
  }
  static print(): void {
    // 静态方法中不可以调用属性，只可用静态属性
    console.log("静态方法取静态属性：", this.age);
  }
}
Person2.print()
console.log(Person2.age);


// 5. 多态 （抽象类）
abstract class Animal {
  name: string
  abstract eat(): void
  constructor(name: string) {
    this.name = name
  }
}
class Dog extends Animal {
  constructor(name: string) {
    super(name)
  }
  eat(): void {
    console.log(this.name + "吃肉肉");
  }
}
let dog = new Dog("汪汪")
dog.eat()