package fib

import "fmt"

// 1, 1, 2, 3, 5, 8, 13, ...
func Fibonacci() func() int {
	a, b := 0, 1
	return func() int {
		a, b = b, a+b
		fmt.Printf("writing: %d\n", a)
		return a
	}
}
