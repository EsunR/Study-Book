// 为函数定义类型
function add(a: number, b: number): number {
  return a + b
}
console.log(add(1, 2));

// 可选参数（可选参数最好写在后面）
function getInfo(name: string, age?: number): void {
  if (age) {
    console.log(`姓名：${name}，年龄：${age}`);
  } else {
    console.log(`姓名：${name}，年龄：保密`);
  }
}
getInfo("huahua")

// 默认参数
function getInfoDefault(name: string, age: number = 18): void {
  console.log(`姓名：${name}，年龄：${age}`);
}

// 剩余参数
function sum(base: number, ...result: number[]): number {
  return base + result.reduce((acc, cur) => acc + cur)
}
console.log(sum(100, 1, 2)); // 103

// 函数重载 
// 通过微同一个函数提供多个函数类型定义下多重功能的目的
function reload(name: string): string
function reload(age: number): string
function reload(str: any): any {
  if (typeof str === "string") {
    return "我叫" + str
  } else {
    return "我的年龄是" + str
  }
}
console.log(reload("张三"));
console.log(reload(18));
// reload(true) 报错
