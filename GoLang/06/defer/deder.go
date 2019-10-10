package main

import (
	"bufio"
	"fmt"
	"os"
)

func tryDefer() {
	defer fmt.Println(3)
	defer fmt.Println(2)
	fmt.Println(1)
	//panic("error test")
	//fmt.Println("after error")
}

func writeFile(filename string) {
	file, err := os.OpenFile(
		filename, os.O_EXCL|os.O_CREATE, 0666,
	)
	if err != nil {
		//fmt.Println("Error:", err.Error())
		if pathError, ok := err.(*os.PathError); !ok {
			panic(err)
		} else {
			fmt.Println(pathError.Op, pathError.Path, pathError.Err)
		}
		return
	}
	writer := bufio.NewWriter(file)
	defer file.Close()
	defer writer.Flush()
	for i := 0; i < 20; i++ {
		_, _ = fmt.Fprintln(writer, i)
	}
}

func tryDefer2() {
	for i := 0; i < 10; i++ {
		defer fmt.Println(i)
		if i == 30 {
			panic("printed too many")
		}
	}
}

func main() {
	//tryDefer()
	//fmt.Println(4)
	writeFile("07/defer/fib.txt")
	//tryDefer2()
}
