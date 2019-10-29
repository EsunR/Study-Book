namespace A {
  export class Dog {
    name: string
    constructor(name: string) {
      this.name = name
    }
    run(): void {
      console.log("dadadadadada");
    }
  }
}

namespace B {
  export class Dog {
    name: string
    constructor(name: string) {
      this.name = name
    }
    bark(): void {
      console.log("wang!");
    }
  }
}

var dog_1 = new A.Dog("huahua")
dog_1.run()

var dog_2 = new B.Dog("langlang")
dog_2.bark()