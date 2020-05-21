interface Person {
  readonly id: number;
  name: string;
  sex: string;
  age?: number;
}

let xiaoming: Person = {
  id: 1,
  name: "EsunR",
  sex: "man",
};

xiaoming.age = 19;