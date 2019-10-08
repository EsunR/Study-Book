package main

import (
	"fmt"
	"time"
)

func main() {
	var a [10]int
	for i := 0; i < 1000; i++ {
		go func(i int) {
			for {
				fmt.Printf("hello from goroutine %d\n", i)
			}
		}(i)
	}
	time.Sleep(time.Minute)
	fmt.Println(a)
}
