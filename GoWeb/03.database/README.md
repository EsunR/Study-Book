# 1. MySql 数据库的使用

## 1.1 数据库驱动

Go 与 PHP 不同的地方是 Go 官方没有提供数据库驱动，而是为开发数据库驱动定义了一些标准接口，开发者可以根据定义的接口来开发相应的数据库驱动，这样做有一个好处，只要是按照标准接口开发的代码， 以后需要迁移数据库时，不需要任何修改。

[扩展阅读](https://learnku.com/index.php/docs/build-web-application-with-golang/051-databasesql-interface/3181)

Go 中支持 MySQL 的驱动目前比较多，有如下几种，有些是支持 database/sql 标准，而有些是采用了自己的实现接口，常用的有如下几种:

- https://github.com/go-sql-driver/mysql 支持 database/sql，全部采用 go 写。
- https://github.com/ziutek/mymysql 支持 database/sql，也支持自定义的接口，全部采用 go 写。
- https://github.com/Philio/GoMySQL 不支持 database/sql，自定义接口，全部采用 go 写。

推荐使用 https://github.com/go-sql-driver/mysql 驱动，主要理由：

- 这个驱动比较新，维护的比较好
- 完全支持 database/sql 接口
- 支持 keepalive，保持长连接，虽然 [星星](http://www.mikespook.com/) fork 的 mymysql 也支持 keepalive，但不是线程安全的，这个从底层就支持了 keepalive。

## 1.2 使用驱动操作 MySql 数据库

sql.Open () 函数用来打开一个注册过的数据库驱动，go-sql-driver 中注册了 mysql 这个数据库驱动，第二个参数是 DSN (Data Source Name)，它是 go-sql-driver 定义的一些数据库链接和配置信息。它支持如下格式：

```php
user@unix(/path/to/socket)/dbname?charset=utf8
user:password@tcp(localhost:5555)/dbname?charset=utf8
user:password@/dbname
user:password@tcp([de:ad:be:ef::ca:fe]:80)/dbname
```

db.Prepare () 函数用来返回准备要执行的 sql 操作，然后返回准备完毕的执行状态。

db.Query () 函数用来直接执行 Sql 返回 Rows 结果。

stmt.Exec () 函数用来执行 stmt 准备好的 SQL 语句

```go
package main

import (
	"database/sql"
	"fmt"
	// "time"

	_ "github.com/go-sql-driver/mysql"
)

func main() {
	db, err := sql.Open("mysql", "root:root@tcp(localhost:3306)/goweb?charset=utf8")
	checkErr(err)

	// 插入数据
	stmt, err := db.Prepare("INSERT userinfo SET username=?,department=?,created=?")
	checkErr(err)

	res, err := stmt.Exec("astaxie", "研发部门", "2012-12-09")
	checkErr(err)

	id, err := res.LastInsertId()
	checkErr(err)

	fmt.Println(id)

	// 更新数据
	stmt, err = db.Prepare("update userinfo set username=? where uid=?")
	checkErr(err)

	res, err = stmt.Exec("astaxieupdate", id)
	checkErr(err)

	affect, err := res.RowsAffected()
	checkErr(err)

	fmt.Println(affect)

	// 查询数据
	rows, err := db.Query("SELECT * FROM userinfo")
	checkErr(err)

	for rows.Next() {
		var uid int
		var username string
		var department string
		var created string
		err = rows.Scan(&uid, &username, &department, &created)
		checkErr(err)
		fmt.Println(uid)
		fmt.Println(username)
		fmt.Println(department)
		fmt.Println(created)
	}

	// 删除数据
	stmt, err = db.Prepare("delete from userinfo where uid=?")
	checkErr(err)

	res, err = stmt.Exec(id)
	checkErr(err)

	affect, err = res.RowsAffected()
	checkErr(err)

	fmt.Println(affect)

	_ = db.Close()

}

func checkErr(err error) {
	if err != nil {
		panic(err)
	}
}
```

> 我们可以看到我们传入的参数都是 =? 对应的数据，这样做的方式可以一定程度上防止 SQL 注入。

输出：

```sh
# 插入数据的 id
6  

# 在更新操作中影响的行数
1  

# 查询数据的字段信息
6  
astaxieupdate
研发部门
2012-12-09

# 删除操作影响的行数
1
```

# 2. XORM 的使用

[中文文档](https://www.kancloud.cn/kancloud/xorm-manual-zh-cn/56013)

## 2.1 快速开始

安装 xorm 引擎：

```sh
$ go get github.com/go-xorm/xorm
```

创建一个数据库连接并检测连接有效性：

```go
package main

import (
	"fmt"
	_ "github.com/go-sql-driver/mysql"
	"github.com/go-xorm/xorm"
)

var engine *xorm.Engine

func main() {
	var err error
	engine, err = xorm.NewEngine("mysql", "root:root@/xorm?charset=utf8")
	if err != nil {
		fmt.Println("error:", err)
	} else {
		err = engine.Ping()
		if err != nil {
			fmt.Println("error:", err)
		} else {
			fmt.Println("success")
		}
	}
}
```

## 2.2 CRUD 操作

User 结构体：

```go
type User struct {
	Id        int64
	Name      string
	CreatedAt time.Time `xorm:"created"`
}
```

### 2.2.1 创建表

> func (engine *Engine) CreateTables(beans ...interface{}) error

```go
package crud

import (
	"fmt"
	"github.com/go-xorm/xorm"
)

func CreateUserTable(engine *xorm.Engine) {
	var user User
	err := engine.CreateTables(&user)
	if err != nil {
		fmt.Println("创建失败:", err)
		return
	}
}
```

### 2.2.2 插入

> func (engine *Engine) Insert(beans ...interface{}) (int64, error) 

```go
func InsertUser(engine *xorm.Engine) {
	var user User
	user.Name = "huahua"
	id, err := engine.Insert(&user)
	if err != nil {
		fmt.Println("插入数据错误:", err)
		return
	}
	fmt.Println("影响行数:", id)
	fmt.Println("插入用户:", user)
}
```

### 2.2.3 查询

查询条件主要有以下几种：

- Id(interface{})

  传入一个主键字段的值，作为查询条件，如

  ```
  var user User
  engine.Id(1).Get(&user)
  // SELECT * FROM user Where id = 1
  ```

  如果是复合主键，则可以

  ```
  engine.Id(core.PK{1, "name"}).Get(&user)
  // SELECT * FROM user Where id =1 AND name= 'name'
  ```

  传入的两个参数按照struct中pk标记字段出现的顺序赋值。

- Where(string, …interface{})

  和SQL中Where语句中的条件基本相同，作为条件

  ```go
  var user User
  b, err := engine.Where(`id=10`).Get(&user)
  ```

- And(string, …interface{})

  和Where函数中的条件基本相同，作为条件

- Or(string, …interface{})

  和Where函数中的条件基本相同，作为条件

- Sql(string, …interface{})

  执行指定的Sql语句，并把结果映射到结构体

- Asc(…string)

  指定字段名正序排序

- Desc(…string)

  指定字段名逆序排序

- OrderBy(string)

  按照指定的顺序进行排序

- In(string, …interface{})

  某字段在一些值中，这里需要注意必须是[]interface{}才可以展开，由于Go语言的限制，[]int64等不可以直接展开，而是通过传递一个slice。示例代码如下：

  ```go
  engine.In("cloumn", 1, 2, 3).Find()
  engine.In("column", []int{1, 2, 3}).Find()
  ```

  Cols(…string)只查询或更新某些指定的字段，默认是查询所有映射的字段或者根据Update的第一个参数来判断更新的字段。例如：

  ```go
  engine.Cols("age", "name").Find(&users)
  // SELECT age, name FROM user
  engine.Cols("age", "name").Update(&user)
  // UPDATE user SET age=? AND name=?
  ```

- AllCols()

  查询或更新所有字段，一般与Update配合使用，因为默认Update只更新非0，非""，非bool的字段。

  ```go
  engine.AllCols().Id(1).Update(&user)
  // UPDATE user SET name = ?, age =?, gender =? WHERE id = 1
  ```

- MustCols(…string)

  某些字段必须更新，一般与Update配合使用。

- Omit(...string)

  和cols相反，此函数指定排除某些指定的字段。注意：此方法和Cols方法不可同时使用。

  ```
  // 例1：
  engine.Omit("age", "gender").Update(&user)
  // UPDATE user SET name = ? AND department = ?
  // 例2：
  engine.Omit("age, gender").Insert(&user)
  // INSERT INTO user (name) values (?) // 这样的话age和gender会给默认值
  // 例3：
  engine.Omit("age", "gender").Find(&users)
  // SELECT name FROM user //只select除age和gender字段的其它字段
  ```

- Distinct(…string)按照参数中指定的字段归类结果。

  ```
  engine.Distinct("age", "department").Find(&users)
  // SELECT DISTINCT age, department FROM user
  ```

  注意：当开启了缓存时，此方法的调用将在当前查询中禁用缓存。因为缓存系统当前依赖Id，而此时无法获得Id

- Table(nmeOrStructPtr interface{})

  传入表名称或者结构体指针，如果传入的是结构体指针，则按照IMapper的规则提取出表名

- Limit(int, …int)

  限制获取的数目，第一个参数为条数，第二个参数表示开始位置，如果不传则为0

- Top(int)

  相当于Limit(int, 0)

- Join(string,string,string)

  第一个参数为连接类型，当前支持INNER, LEFT OUTER, CROSS中的一个值，第二个参数为表名，第三个参数为连接条件

  详细用法参见 [Join的使用](https://www.kancloud.cn/kancloud/xorm-manual-zh-cn/55991#)

- GroupBy(string)

  Groupby的参数字符串

- Having(string)

  Having的参数字符串

查询方法主要有以下几种：

- [Get 方法](https://www.kancloud.cn/kancloud/xorm-manual-zh-cn/56001)

  查询单条数据使用`Get`方法，在调用Get方法时需要传入一个对应结构体的指针，同时结构体中的非空field自动成为查询的条件和前面的方法条件组合在一起查询。

- [Find 方法](https://www.kancloud.cn/kancloud/xorm-manual-zh-cn/56005)

  查询多条数据使用`Find`方法，Find方法的第一个参数为`slice`的指针或`Map`指针，即为查询后返回的结果，第二个参数可选，为查询的条件struct的指针。

- [Join 方法](https://www.kancloud.cn/kancloud/xorm-manual-zh-cn/56008)
- [Count 方法](https://www.kancloud.cn/kancloud/xorm-manual-zh-cn/56011)
- [Row 方法](https://www.kancloud.cn/kancloud/xorm-manual-zh-cn/56012)