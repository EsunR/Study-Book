// 1. 泛型：可以支持不特定的数据类型
// 要求传入的阐述和返回的参数一致
function getData<T>(value: T): T {
  return value
}
console.log(getData<number>(123));

// 2. 泛型类
// 有个最小堆算法，需要同时支持返回数字和字符串两种类型
class MinClass<T> {
  public list: T[] = []
  add(num: T): void {
    this.list.push(num)
  }
  min(): T {
    return this.list.reduce((pre, cur) => {
      return pre < cur ? pre : cur
    })
  }
}
var m = new MinClass<number>()
m.add(2)
m.add(3)
m.add(1)
m.add(6)
console.log(m.min())