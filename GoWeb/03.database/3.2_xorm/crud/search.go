package crud

import (
	"fmt"
	"github.com/go-xorm/xorm"
)

func SearchUserById(engine *xorm.Engine, id int) {
	fmt.Println("=====SearchUserById=====")
	user := new(User)
	fmt.Println(user)
	has, err := engine.Id(1).Get(user)
	//user := User{Id: 1}
	//has, err := engine.Get(&user)
	if err != nil {
		fmt.Println("查询出错:", err)
		return
	}
	if has {
		fmt.Println("SearchUserById:", user)
	} else {
		fmt.Println("SearchUserById: 未查找到用户")
	}
}

func SearchUserByWhere(engine *xorm.Engine) {
	fmt.Println("=====SearchUserByWhere=====")
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
