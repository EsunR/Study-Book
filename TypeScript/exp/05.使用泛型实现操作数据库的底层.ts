interface DBI<T> {
  add(info: T): boolean
  update(info: T, id: number): boolean
  delete(id: number): boolean
  get(id: number): any[]
}

// 定义一个操作mysql数据库的类
// 定义一个泛型接口，这个类应该也是一个泛型类
class MysqlDb<T> implements DBI<T>{
  add(info: T): boolean {
    console.log(info);
    return true
  }

  update(info: T, id: number): boolean {
    throw new Error("Method not implemented.");
  }

  delete(id: number): boolean {
    throw new Error("Method not implemented.");
  }

  get(id: number): any[] {
    throw new Error("Method not implemented.");
  }


}

class MssqlDb<T> implements DBI<T>{
  add(info: T): boolean {
    throw new Error("Method not implemented.");
  }
  update(info: T, id: number): boolean {
    throw new Error("Method not implemented.");
  }
  delete(id: number): boolean {
    throw new Error("Method not implemented.");
  }
  get(id: number): any[] {
    throw new Error("Method not implemented.");
  }
}

class User {
  username: string | undefined
  password: string | undefined
}
var u = new User()
u.username = "张三"
u.password = "123456"

var oMysql = new MysqlDb<User>()
oMysql.add(u)