package main

import (
	"fmt"
	"math"
	"reflect"
	"runtime"
)

func div(a int, b int) (q int, r int) {
	q = a / b
	r = a % b
	return
}

func caculator(a, b int, op string) (int, error) {
	switch op {
	case "+":
		return a + b, nil
	case "-":
		return a - b, nil
	case "*":
		return a * b, nil
	case "/":
		q, _ := div(a, b)
		return q, nil
	default:
		return 0, fmt.Errorf(
			"unsupported operation: %s", op)
	}
}

func apply(op func(int, int) int, a, b int) int {
	p := reflect.ValueOf(op).Pointer()    // 获取函数的指针
	opName := runtime.FuncForPC(p).Name() // 获取函数的名字
	fmt.Printf("Calling function %s with args(%d, %d)\n", opName, a, b)
	return op(a, b)
}

func pow(a, b int) int {
	return int(math.Pow(float64(a), float64(b)))
}

func sum(numbers ...int) int {
	s := 0
	for i := range numbers {
		s += numbers[i]
	}
	return s
}

func swap(a, b *int) {
	fmt.Println(a)
	fmt.Println(*a)
	*b, *a = *a, *b
}

func main() {
	q, r := div(13, 3)
	fmt.Printf("结果：%d, 余数：%d \n", q, r)
	if result, err := caculator(1, 2, "+"); err != nil {
		fmt.Println("Error:", err)
	} else {
		fmt.Printf("运算结果是：%d \n", result)
	}

	// 函数式编程
	result2 := apply(func(a int, b int) int {
		return int(math.Pow(
			float64(a), float64(b)))
	}, 3, 4)
	fmt.Println(result2)

	// 可变参数列表
	fmt.Println("可变参数列表的累加结果：", sum(1, 2, 3, 4))

	// 交换值
	a, b := 2, 3
	swap(&a, &b)
	fmt.Printf("a=%d, b=%d", a, b)
}
