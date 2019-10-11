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
			table, _ := engine.DBMetas()
			fmt.Println("info:", table)
		}
	}
}
