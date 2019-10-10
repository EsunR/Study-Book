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

