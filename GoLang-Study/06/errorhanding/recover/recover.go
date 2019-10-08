package main

import (
	"fmt"
)

func tryRecover() {
	defer func() {
		r := recover() // recover()返回任何类型的值
		// 使用Type Assertion（断言）判断 r 的类型
		if err, ok := r.(error); ok {
			// 返回值 r 的类型如果是 error
			fmt.Println("发生了一个错误：", err)
		} else {
			// 返回值 r 的类型如果不是 error
			fmt.Println(r)
		}
	}()
	//panic(errors.New("this is an error"))
	a := 0
	b := 5 / a
	fmt.Println(b)
}

func main() {
	tryRecover()
}
