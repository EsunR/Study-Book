package main

import "fmt"

func main() {
	m := map[string]string{
		"name":    "xiaoming",
		"course":  "golang",
		"site":    "imooc",
		"quality": "notbad",
	}
	fmt.Println(m)

	m2 := make(map[string]int)
	var m3 map[string]int
	fmt.Println(m2)
	fmt.Println(m3)

	for k, v := range m {
		fmt.Println(k, v)
	}

	testVal, ok := m["sex"]
	fmt.Println(testVal, ok)
}
