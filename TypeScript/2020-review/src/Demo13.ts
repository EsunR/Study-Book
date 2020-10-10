class Lady {
  constructor(private _age: number) {}

  get age() {
    return this._age - 10;
  }

  set age(age: number) {
    this._age = age + 3;
  }
}

const June = new Lady(28);
console.log(June.age); // 18
June.age = 15;
console.log(June.age); // 8
