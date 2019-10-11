package crud

import (
	"fmt"
	"github.com/go-xorm/xorm"
)

func SearchUserById(engine *xorm.Engine, id int) {
	var user User
	b, err := engine.Id(id).Get(&user)
	if err != nil {
		fmt.Println("查询出错:", err)
		return
	}
	if b {
		fmt.Println("SearchUserById:", user)
	} else {
		fmt.Println("SearchUserById: 未查找到用户")
	}
}

func SearchUserByWhere(engine *xorm.Engine) {
	var user User
	b, err := engine.Where(`id=10`).Get(&user)
	if err != nil {
		fmt.Println("查询出错:", err)
		return
	}
	if b {
		fmt.Println("searchUserByWhere:", user)
	} else {
		fmt.Println("searchUserByWhere: 未查找到用户")
	}
}
