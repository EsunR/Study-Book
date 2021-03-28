function echo<T>(arg: T): T {
  return arg;
}
let str = echo("wulalala");
// let num: number = echo("123"); // error: 不能将类型"123"分配给类型“number”。

function swap<T, U>(tuple: [T, U]): [U, T] {
  return [tuple[1], tuple[0]];
}
const result = swap(["string", 123]);
console.log(result); // 123, "string"

interface IinputWithLength {
  length: number;
}

function printLength<T extends IinputWithLength>(input: T): T {
  console.log(input.length);
  return input;
}

printLength([1, 2, 3]);
printLength("123");
printLength({ length: 10 });
// printLength(123); // error: 类型“123”的参数不能赋给类型“IinputWithLength”的参数

class Queue<T> {
  private data = [];
  push(item: T) {
    this.data.push(item);
  }
  pop() {
    this.data.pop();
  }
}

// interface 使用泛型
interface KeyPair<T, U> {
  key: T;
  value: U;
}

let kp1: KeyPair<number, string> = {
  key: 1,
  value: "123",
};

// 使用泛型的方式定义数组

let arr1: number[] = [1, 2, 3];
let arr2: Array<number | string> = [1, 2, 3, "2"];

interface IAdd<T> {
  (a: T, b: T): T;
}

function add(a: number, b: number): number {
  return a + b;
}

const a: IAdd<number> = add;
