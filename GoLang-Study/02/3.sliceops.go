package main

import "fmt"

func main() {
	var s []int // 空的slice nil
	for i := 0; i < 100; i++ {
		s = append(s, 2*i+1)
	}
	fmt.Println(s)

	s1 := []int{1, 2}
	s2 := []int{0, 0, 0, 0}
	copy(s2, s1)
	fmt.Println(s2)

	s3 := []int{1, 2, 3, 4, 5}
	s3 = append(s3[:2], s3[3:]...)
	fmt.Println(s3)

	s2 = s2[1:]
	s2 = s2[:len(s2)-1]
	fmt.Println(s2)

}
