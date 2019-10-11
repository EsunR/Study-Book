package crud

import (
	"fmt"
	"github.com/go-xorm/xorm"
)

func UpdateUserById(engine *xorm.Engine, id int64) {
	fmt.Println("======UpdateUserById=======")
	//user := User{Name: "jess"}
	//affected, err := engine.Id(id).Update(&user)
	affected, err := engine.Table(new(User)).Id(id).Update(map[string]interface{}{
		"name": "ahhh",
	})
	ErrorWrapper(err, "更新错误")
	fmt.Println("影响行数:", affected)
	//fmt.Println("user:", user) // 并不会对 user 进行赋值操作
}
