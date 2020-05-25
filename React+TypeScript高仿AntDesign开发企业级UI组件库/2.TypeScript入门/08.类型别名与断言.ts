// 类型别名 type aliases
type PluseType = (x: number, y: number) => number;
function sum(a: number, b: number): number {
  return a + b;
}
const fn: PluseType = sum;

// 联合应用类型
type NameResolver = () => string;
type NameOrResolver = string | NameResolver;
function getName(arg: NameOrResolver): string {
  if (typeof arg === "string") {
    return arg;
  } else {
    return arg();
  }
}

console.log(getName("huahua")); // huahua
console.log(
  getName(function () {
    return "huahua2";
  })
); // huahua2

// 类型断言
function getLength(input: string | number | Function): number {
  // const str = input as string;
  // if (str.length) {
  //   return str.length;
  // } else {
  //   const number = input as number;
  //   return number.toString().length;
  // }
  if ((<string>input).length) {
    return (<string>input).length;
  } else {
    return (<number>input).toString().length;
  }
}

getLength(function () {
  console.log("ok");
});
