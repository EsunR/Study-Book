package main

import "fmt"

func updateSlice(s []int) {
	s[0] = 100
}

func main() {
	arr := [...]int{0, 1, 2, 3, 4, 5}
	fmt.Println("arr[2:6] =", arr[2:6])
	fmt.Println("arr[:6] =", arr[:6])
	fmt.Println("arr[:] =", arr[:])

	s1 := arr[2:]
	fmt.Println("before update: ", s1)
	updateSlice(s1)
	fmt.Println("after update: ", s1)
}
