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

// 泛型类
// 泛型类
class DbUser {
  username: string | undefined
  password: string | undefined
}

class Article {
  title: string | undefined
  desc: string | undefined
  status: number | undefined
}

class MysqlDb<T> {
  add(data: T): boolean {
    console.log(data);
    return true
  }
}

var us = new DbUser()
us.username = "张三"
us.password = "123456"

var a = new Article()
a.title = "国内"
a.desc = "国内新闻"
a.status = 1

var udb = new MysqlDb<DbUser>()
udb.add(us)

var adb = new MysqlDb<Article>()
adb.add(a)


class ArticleCate {
  title: string | undefined
  desc: string | undefined
  status: number | undefined
  constructor(params: {
    title: string | undefined
    desc: string | undefined
    status?: number | undefined
  }) {
    this.title = params.title
    this.desc = params.desc
    this.status = params.status
  }
}
var a = new ArticleCate({
  title: "分类",
  desc: "111"
})
var adb2 = new MysqlDb<ArticleCate>()
adb2.add(a)
