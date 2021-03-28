class Animal {
  public name: string;
  protected age: number;
  static includes = ["dog", "cat", "bird"];
  constructor(name: string, age: number) {
    this.name = name;
    this.age = age;
  }
  walk() {
    console.log("walk");
  }
  static isAnimal(a) {
    return a instanceof Animal;
  }
}

let huahua = new Animal("花花", 2);
console.log(huahua.name);
// console.log(huahua.age); // error: 属性“age”为私有属性，只能在类“People”中访问。

class Dog extends Animal {
  constructor(name: string, age: number) {
    super(name, age);
    this.name = name;
    this.age = age; // error: 属性“age”为私有属性，只能在类“People”中访问。
  }
}

