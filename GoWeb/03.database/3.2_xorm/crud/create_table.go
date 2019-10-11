package crud

import (
	"fmt"
	"github.com/go-xorm/xorm"
)

func CreateUserTable(engine *xorm.Engine) {
	fmt.Println("=====CreateUserTable=====")
	var user User
	err := engine.CreateTables(&user)
	if err != nil {
		fmt.Println("创建失败:", err)
		return
	}
}
