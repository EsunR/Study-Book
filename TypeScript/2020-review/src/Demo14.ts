class Person {
  public readonly _name: string;
  constructor(public name: string) {
    this._name = name;
  }
}

const person = new Person("EsunR");
console.log(person._name);
// person._name = 111; // Error

abstract class Girl {
  abstract skill(): void;
}

class Waiter extends Girl {
  skill() {
    console.log("请喝水");
  }
}
