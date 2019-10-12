# 1. 数组

## 1.1 定义数组

定义一个长度为5的空数组（空数组的默认值为0）：

```go
var arr [5]int // [0,0,0,0,0]
```

定义一个长度为3的数组：

```go
arr2 := [3]int{1, 3, 5} // [1,3,5]
```

定义一个自设置长度的数组：

```go
arr3 := [...]int{2, 4, 6, 8, 10} // [2,4,6,8,10]
```

定义一个二维数组：

```go
var grid [4][5]int // [[0 0 0 0 0] [0 0 0 0 0] [0 0 0 0 0] [0 0 0 0 0]]
```

## 1.2 遍历数组

常规的遍历方式：

```go
for i := 0; i < len(arr3); i++ {
    fmt.Println(arr3[i])
}
```

使用 `range` 获取索引值以及元素值：

```go
for i,v := range arr3 {
    fmt.Println(i, v) // i: 索引  v: 值
}
```

## 1.3 数组是值类型

```go
func printArray(arr [5]int) { // [5]int 是一种规定的类型，如果传入 [6]int 的数组就会报错
	arr[0] = 100
	for i, v := range arr {
		fmt.Println(i, v)
	}
}

func main(){
    fmt.Println("调用函数输出：")
	printArray(arr)
	fmt.Println("调用原值：")
	fmt.Println(arr)
}
```

输出结果：

```
调用函数输出：
0 100
1 0
2 0
3 0
4 0
调用原值：
[0 0 0 0 0]
```

可以看出，在 `printArray` 函数中，对传入的数组的第一个数值进行了修改，如果是Javascript等数组类型为引用类型的编程语言的话，实际上修改的是传入的数组。而Go语言中，由于数组是值类型的，在函数调用时对原数组进行了一层拷贝，所以在函数中更改的数组并不会影响到传入的原数组。

如果要想实现引用类型的用法，则使用指针可以实现：

```go
func printArrayByPointer(arr *[5]int) {
	arr[0] = 100
	for i, v := range arr {
		fmt.Println(i, v)
	}
}

func main(){
    // 使用指针传递数组
	fmt.Println("调用函数输出：")
	printArrayByPointer(&arr)
	fmt.Println("调用原值：")
	fmt.Println(arr)
}
```

# 2. 切片

## 2.1 定义切片

数组切片符合左开右闭原则

```go
arr := [...]int{0, 1, 2, 3, 4, 5}
fmt.Println("arr[2:6] =", arr[2:6])
fmt.Println("arr[:6] =", arr[:6])
fmt.Println("arr[:] =", arr[:])
```

```
arr[2:6] = [2 3 4 5]
arr[:6] = [0 1 2 3 4 5]
arr[:] = [0 1 2 3 4 5]
```

## 2.2 切片是引用类型

切片是一个引用类型，可将切片直接传入函数：

```go
func updateSlice(s []int) {
	s[0] = 100
}

func main(){
    arr := [...]int{0, 1, 2, 3, 4, 5}
    s1 := arr[2:]
	fmt.Println("before update: ", s1) // [2 3 4 5]
	updateSlice(s1)
	fmt.Println("after update: ", s1) // [100 3 4 5]
}
```

Slice 本身没有数据，是对底层 array 的一个 view 

再看一个示例来突出 Slice 这一特性：

```go
arr4 := [...]int{1, 2, 3, 4, 5, 6, 7}
fmt.Println("extending slice")
s1 := arr4[2:6]
fmt.Println("s1:", s1) // s1: [3 4 5 6]
s2 := s1[3:5]
fmt.Println("s2:", s2) // s2: [6 7]
```

![image.png](https://i.loli.net/2019/09/09/SZQam4Gg6hvejzo.png)

## 2.3 切片的cap

Slice可以向后扩展，但是**不可以向前扩展**，其底层可取的数组范围可以使用 `cap()` 来调用：

```go
arr4 := [...]int{0, 1, 2, 3, 4, 5, 6, 7}
s1 := arr4[2:6]
s2 := s1[3:5]
fmt.Printf("s1=%v, len(s1)=%d, cap(s1)=%d\n", s1, len(s1), cap(s1)) 
// s1=[2 3 4 5], len(s1)=4, cap(s1)=6
fmt.Printf("s2=%v, len(s2)=%d, cap(s2)=%d\n", s2, len(s2), cap(s2))
// s2=[5 6], len(s2)=2, cap(s2)=3
```

![image.png](https://i.loli.net/2019/09/09/DfEbQrINnzSm2Fv.png)

## 2.4 向Slice添加元素

添加元素时如果超过cap，系统会重新分配更大的底层数组。

```go
arr4 := [...]int{0, 1, 2, 3, 4, 5, 6, 7}
s1 := arr4[2:6]
s2 := s1[3:5]

s3 := append(s2, 10) // arr4: [0 1 2 3 4 5 6 10]
s4 := append(s3, 11) // 超出底层array的view，内部新创建一个array
s5 := append(s4, 12) // 超出底层array的view，内部新创建一个array
fmt.Println("s3, s4, s5 =", s3, s4, s5) // [5 6 10] [5 6 10 11] [5 6 10 11 12]
fmt.Println("arr =", arr4) // arr4 = [0 1 2 3 4 5 6 10]
```

## 2.5 Slice的创建

创建一个空的Slice：

```go
var s []int
```

> array 与 slice 是两种不同的数据

我们使用 `append()` 可以向 slice 中添加数据，每个 slice 底层都有一个 cap ，为存放更多的数据，当我们向一个 slice 中不断填充数据时，slice 的 cap 会扩充为原切片长度的两倍，如：

- 当前 slice 长度为2，新增1位数据，cap 变为 4，以备存放更多数据
- 当前 slice 长度为3，新增1位数据，cap 变为 6，以备存放更多数据
- 当前 slice 长度为4，新增1位数据，cap 变为 8，以备存放更多数据
- ... ...

同时，我们也可以使用 `make` 来定义 slice 的 len 和 cap：

```go
s2 := make([]int , 2, 10)
// s2 = [0 0], len = 2, cap = 10
```

## 2.6 其他内建函数

### 2.6.1 拷贝

将 s1 内容拷贝到 s2 中，实际上是进行了 s2[0] = s1[0]，s2[1] = s1[1] 的操作：

```go
s1 := []int{1, 2}
s2 := []int{0, 0, 0, 0}
copy(s2, s1)
fmt.Println(s2) // [1 2 0 0]
```

 ### 2.6.2 删除

slice 没有直接删除的内建函数，需要将原 slice 拼接前后两截，以达到删除元素的效果：

```go
s3 := []int{1, 2, 3, 4, 5}
s3 = append(s3[:2], s3[3:]...)
fmt.Println(s3) // [1 2 4 5]
```

通常我们会进行slice的pop与unshift操作：

```go
s2 = s2 [1:] // unshift
s2 = s2[:len(s2)-1] // pop
```

# 3. Map

## 3.1 map 类型的定义

```go
m := map[string]string {
    "name": "xiaoming",
    "course": "golang",
    "site": "imooc",
    "quality": "notbad",
}
```

- 普通Map：map[K]V

- 复合Map：map[K1]map[K2]V

创建空map：

```go
m2 := make(map[string]int)
var m3 map[string]int
fmt.Println(m2)
fmt.Println(m3)
```

## 3.2 Map的遍历

```go
m := map[string]string{
    "name":    "xiaoming",
    "course":  "golang",
    "site":    "imooc",
    "quality": "notbad",
}
for k, v := range m {
    fmt.Println(k, v)
}
```

> map 是无序的，遍历的数据可能不按顺序输出

## 3.3 输出不存在的Key

当我们调用一个不存在的key，那么输出的值为一个 zero value，如：

```go
fmt.Println(m[sex])
```

我们可以用第二个变量接收获取map数据的返回值，来判断取得的值是否不存在：

```go
testVal, ok := m["sex"]
fmt.Println(testVal, ok) // false
```

## 3.4 Map的删除操作

使用内建函数 `delete(map, key)`来删除一条数据：

```go
delete(m, "name")
```

## 3.5 map的key

- map使用哈希表，必须可以比较值相等

- 除了 slice map function 的内建类型都可以作为 key
- Struct类型不包含上述字段，也可以作为key

## 3.6 例题：寻找最长不含有重复字符的子串

abcdddae => 最长子串 abcd 长度为4

bbbbbbbb => 最长子串 b 长度为1

算法实现：

对于每一个字母x，start为开始计算子串的位置，lastOccured[x]为当前字母相同的上一个字母的位置

- lastOccured[x]不存在，或者 < start -》无需操作
- lastOccurred[x] >= start -》更新start
- 更新lastOccurred[x]，更新maxLength

```go
func lengthOfNonRepeatingSubStr(s string) int {
	lastOccurred := make(map[byte]int) 
	start := 0
	maxLength := 0
    
	// 这里将字符串转化为byte类型的slice，ch的值为十进制的ASCII编码
    // 如果不转化，ch的值为Unicode编码
	for i, ch := range []byte(s) { 
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
	fmt.Println(lengthOfNonRepeatingSubStr("abcdddae")) // 4
}
```

但是算法有一个缺陷，不支持中文字符串的判断。

# 4. 字符和字符串的处理

## 4.1 分析原因

在上一节的最后一道示例题中，我们发现如果传入中文是无法准确的得出结果的，这个原因是因为在Go语言中，一个字符的字节数是变长的，英文、字符、数字都只占用1字节，而中文却占用了3字节。所以将其转化为byte类型的数据的话，`yo~我爱你` 这个字符串在byte空间上的占位实际为：

![image.png](https://i.loli.net/2019/09/10/2CTHkZAuqGVelhm.png)

当我们直接使用 `range` 遍历字符串时，遍历的i为字节的索引，遍历的v为该字符的Unicode码位，当遇到中文字符这种占3个字节的字符时，索引会自动跳到当前字符的头一个字节的位置，如：

```go
str := "Yo~我爱你"
for i, v := range str {
    fmt.Printf("(%d, %c) ", i, v) // %c为相应Unicode码点所表示的字符
}
```

输出结果为：

```
(0, Y) (1, o) (2, ~) (3, 我) (6, 爱) (9, 你) 
```

如果我们将string转化为一个byte类型的slice，那就能看清楚每一个字节的占位结果：

```go
str := "Yo~我爱你"
for i, v := range []byte(str) {
    fmt.Printf("(%d, %X) ", i, v) // %X为16进制输出，这里为16进制输出当前字符的ASCII编码
}
```

输出结果为：

```
(0, 59) (1, 6F) (2, 7E) (3, E6) (4, 88) (5, 91) (6, E7) (7, 88) (8, B1) (9, E4) (10, BD) (11, A0)
```

所以每个字节的实际编码为：

![image.png](https://i.loli.net/2019/09/10/5MFnhWOcPS1ytRE.png)

## 4.2 UTF-8

utf8提供了很库可以使用，如：

### 4.4.1 获取utf8字符串长度

```go
str := "yo~我爱你"
fmt.Println("Rune Count", utf8.RuneCountInString(str)) // Rune Count 6
```

### 4.4.2 将byte类型的字符串转化为rune

将bytes转化为rune(unicode code point)：

```go
str := "yo~我爱你"
bytes := []byte(str)
for len(bytes) > 0 {
    ch, size := utf8.DecodeRune(bytes) // ch为字符的unicode code point，size为字符的字节数
    bytes = bytes[size:]
    fmt.Printf("%c ", ch) // 修剪byte
}
// 输出：y o ~ 我 爱 你 
```

修剪slice的过程：

![image.png](https://i.loli.net/2019/09/10/SENJ7gtH8kla4pQ.png)

## 4.5 rune

前面我们已经介绍了rune，rune实际上为int32类型，其值为当前字符的Unicode code point（码位）。

那么除此之外，当我们遍历rune类型的slice时，其索引值是当前字符自身的索引值，而并非其字节的索引值，如下：

![image.png](https://i.loli.net/2019/09/10/MtWdGYozH2N9R1g.png)

```go
str := "yo~我爱你"

for i, ch := range []rune(str) {
    fmt.Printf("(%d, %c)", i, ch) 
} // (0, y)(1, o)(2, ~)(3, 我)(4, 爱)(5, 你)

fmt.Println([]rune(str)) // [121 111 126 25105 29233 20320]
```

> rune另外开辟了一个新的数组来存放字符

## 4.6 使用rune解决国际化字符问题

- 使用range遍历pos、rune对
- 使用utf8.RuneCountInString获取字符数量
- 使用len获得字节长度
- 使用[]byte获得字节

以“寻找最长不含有重复字符的子串”这道题为例，如果想要同时检测中文子串，则需要将byte转为rune：

```go
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
```

## 4.7 其他字符串操作

在 go 语言的 `strings` 对象下挂载着多个字符串的处理方法，常见的有以下几种：

- Fields，Split，Join
- Contains，Index
- ToLower, ToUpper
- Trim, TrimRight, TrimLeft



