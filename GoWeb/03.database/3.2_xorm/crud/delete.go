package crud

import (
	"fmt"
	"github.com/go-xorm/xorm"
)

func DeleteUserById(engine *xorm.Engine, id int64) {
	fmt.Println("=====DeleteUserById=====")
	var user User
	user.Id = 10
	affected, err := engine.Id(id).Delete(&user)
	ErrorWrapper(err, "删除失败")
	fmt.Println("影响行数:", affected)
}
