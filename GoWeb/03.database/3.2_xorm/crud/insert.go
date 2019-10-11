package crud

import (
	"fmt"
	"github.com/go-xorm/xorm"
)

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

