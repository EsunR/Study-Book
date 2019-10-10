package main

import "fmt"

func printArray(arr [5]int) {
	arr[0] = 100
	for i, v := range arr {
		fmt.Println(i, v)
	}
}

func printArrayByPointer(arr *[5]int) {
	fmt.Println(arr)
	arr[0] = 100
	for i, v := range arr {
		fmt.Println(i, v)
	}
}

func main() {
	var arr [5]int
	arr2 := [3]int{1, 3, 5}
	arr3 := [...]int{2, 4, 6, 8, 10}
	fmt.Println(arr, arr2, arr3)

	var grid [4][5]int
	fmt.Println(grid)

	//遍历数组
	for i := 0; i < len(arr3); i++ {
		fmt.Println(arr3[i])
	}

	// 使用 range 遍历数组
	for i := range arr3 {
		fmt.Println(arr3[i])
	}

	// 数组值类型
	fmt.Println("调用函数输出：")
	printArray(arr)
	fmt.Println("调用原值：")
	fmt.Println(arr)

	// 使用指针传递数组
	fmt.Println("调用函数输出：")
	printArrayByPointer(&arr)
	fmt.Println("调用原值：")
	fmt.Println(arr)

	arr4 := [...]int{0, 1, 2, 3, 4, 5, 6, 7}
	fmt.Println("extending slice")
	s1 := arr4[2:6]
	fmt.Println("s1:", s1)
	s2 := s1[3:5]
	fmt.Println("s2:", s2)
	fmt.Printf("s1=%v, len(s1)=%d, cap(s1)=%d\n", s1, len(s1), cap(s1))
	fmt.Printf("s2=%v, len(s2)=%d, cap(s2)=%d\n", s2, len(s2), cap(s2))

	s3 := append(s2, 10)
	s4 := append(s3, 11)
	s5 := append(s4, 12)
	fmt.Println("s3, s4, s5 =", s3, s4, s5)
	fmt.Println("arr4 =", arr4)
}
