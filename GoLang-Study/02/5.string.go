package main

import (
	"fmt"
)

func lengthOfNonRepeatingSubStr(s string) int {
	lastOccurred := make(map[rune]int)
	start := 0
	maxLength := 0

	for i, ch := range []rune(s) {
		if lastI, ok := lastOccurred[ch]; ok && lastI >= start {
			start = lastI + 1
		}
		if i-start+1 > maxLength {
			maxLength = i - start + 1
		}
		lastOccurred[ch] = i
	}
	return maxLength
}

func main() {
	fmt.Println(lengthOfNonRepeatingSubStr("yo~我爱你你"))

	//str := "yo~我爱你"
	//fmt.Println([]byte(str))        // 十进制的ASCII码切片
	//fmt.Printf("%X\n", []byte(str)) // 16进制的ASCII码串
	//fmt.Printf("%s\n", []byte(str)) // 原字符串
	//for _, v := range []byte(str) {
	//	fmt.Printf("%X ", v)
	//}
	//fmt.Println()
	//
	//// 直接遍历字符串时，输出的v是Unicode编码
	//for i, v := range str {
	//	fmt.Printf("(%d, %d) ", i, v)
	//}
	//fmt.Println()
	//
	//fmt.Println("Rune Count", utf8.RuneCountInString(str))
	//
	//bytes := []byte(str)
	//for len(bytes) > 0 {
	//	ch, size := utf8.DecodeRune(bytes) // ch为字符的unicode code point，size为字符的字节数
	//	bytes = bytes[size:]
	//	fmt.Printf("%c ", ch) // %c为相应Unicode码点所表示的字符
	//}
	//fmt.Println()
	//
	//for i, ch := range []rune(str) {
	//	fmt.Printf("(%d, %c)", i, ch)
	//}
	//fmt.Println()
	//fmt.Println([]rune(str))

}
