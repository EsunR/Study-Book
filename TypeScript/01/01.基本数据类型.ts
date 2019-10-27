// 布尔
let isDone: boolean = false
console.log('isDone: ', isDone);

// 数字
let decLiteral: number = 6;
let hexLiteral: number = 0xf00d;
let binaryLiteral: number = 0b1010;
let octalLiteral: number = 0o744;
console.log('octalLiteral: ', octalLiteral);

// 字符
let username: string = "bob"
console.log('username: ', username);

// 数组
// let arrList: number[] = [1, 2, 3]
let arrList: Array<number> = [1, 2, 3]
console.log('arrList: ', arrList);

// 元组
let x: [string, number] = ['hello', 123]
console.log('x: ', x);

// 枚举
enum Color { Red, Green = 4, Blue }
let c: Color
c = Color.Red // 0
c = Color.Green // 4
c = Color.Blue // 5
let colorName: string = Color[4]; // Green

// 任意值
let notSure: any = 4
notSure = "may be a string"
console.log('notSure: ', notSure);
let anyArr: any[] = ["str", 1, true]

// 空值
function warnUser(): void {
  console.log("this is a function");
}
warnUser()

// null 和 undefined
let u: undefined = undefined
let n: null = null
let num: number | undefined
console.log(num); // undefined

//  Never
function error(message: string): never {
  throw new Error(message)
}
// error("错误")

// Object
let obj: object = {
  name: "huahua",
  age: 18
}
console.log(obj);

// 断言
let someValue: any = "this is a string"
let stringLength = (<string>someValue).length

