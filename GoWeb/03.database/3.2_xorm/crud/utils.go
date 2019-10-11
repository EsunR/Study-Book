package crud

import "fmt"

func ErrorWrapper(err error, msg string) {
	if err != nil {
		fmt.Println(msg + ":")
		panic(err)
	}
}
