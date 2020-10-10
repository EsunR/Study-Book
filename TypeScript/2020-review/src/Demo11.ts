class Person {
  protected name: string;
  sayName() {
    console.log(this.name);
  }
}

const person = new Person();
console.log(person.sayName());

class Teacher extends Person {
  sayBye() {
    console.log(this.name);
  }
}

const teacher = new Teacher();
