package main

import (
	"GoWeb/03.database/3.2_xorm/crud"
	"fmt"
	_ "github.com/go-sql-driver/mysql"
	"github.com/go-xorm/xorm"
)

func main() {
	var engine *xorm.Engine
	var err error
	engine, err = xorm.NewEngine("mysql", "root:root@/xorm?charset=utf8")
	if err != nil {
		fmt.Println("error:", err)
		return
	}
	crud.CreateUserTable(engine)
	crud.InsertUser(engine)
	crud.SearchUserById(engine, 10)
	crud.SearchUserByWhere(engine)
}
