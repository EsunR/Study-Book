# 1. 表格驱动测试

## 1.1 表格驱动测试的优势

- 分离的测试数据
- 明确的出错信息
- 可以部分失败
- go语言的语法更容易实现表格驱动测试

## 1.2 Go语言中使用表格驱动测试的方案

1. 创建一个 `xx_test.go` 文件，它是一个 Empty file，IDE其会自动执行文件中写入的测试函数

2. 创建一个测试函数，传入的参数为 `t *testing.T`

3. 编写测试表格，其为一个slice，单条数据的结构为 `struct{variable1 [DataType], variable2 [DataType], ... }` ，创建过程如下：

   ```go
    test := []struct{key1 [DataType], key2 [DataType], ... }{
       {value1, value2, ...},
       {value1, value2, ...},
       // ... ... more data
   }
   ```

5. 使用 `range test` 去遍历测试表格，在其中分别传入每条测试数据并对比测试结果，如果出错则使用 `t.Error()` 函数输出错误。

## 1.3 示例

示例：测试计算直角三角形的第三条边计算函数

```go
import (
	"testing"
)

func TestTriangle(t *testing.T) {
	tests := []struct{ a, b, c int }{
		{3, 4, 5},
		{5, 12, 13},
		{8, 15, 17},
		{12, 35, 37},
		{30000, 40000, 5000},// 测试用例故意出错
	}

	for _, tt := range tests {
		if actual := calcTriangle(tt.a, tt.b); actual != tt.c {
			t.Errorf("calcTriangele(%d, %d); " + 
                     "got %d; expected %d", tt.a, tt.b, actual, tt.c)
		}
	}
}
```

输出：

```sh
=== RUN   TestTriangle
--- FAIL: TestTriangle (0.00s)
    triangle_test.go:21: calcTriangele(30000, 40000); got 50000; expected 5000
FAIL
```

使用命令行运行测试：

```sh
$ ls
> triangle.go   trangle_test.go
$ go test ./
> ok      GoLang-Study/07 1.772s
```

# 2. 性能测试

性能测试可以选取单个最负责的测试数据，来进行循环遍历测试， 测试示例如下：

```go
func BenchmarkSubstr(bb *testing.B) {
	a := 30000
	b := 40000
	c := 50000
	for i := 0; i < bb.N; i++ {
		if actual := calcTriangle(a, b); actual != c {
			bb.Errorf("calcTriangele(%d, %d); got %d; expected %d", a, b, actual, c)
		}
	}
}
```

测试结果：

```sh
goos: windows
goarch: amd64
pkg: GoLang-Study/07
BenchmarkSubstr-8   	2000000000 	         0.27 ns/op 
## 测试执行了 2000000000 次，平均 0.27nm 执行一次测试
PASS
```

使用命令行：

```go
go test -bench ./
```

获取一个 cpuprofile 文件：

```sh
$ go test -bench ./ -cpuprofile cpu.out
$ go tool pprof cpu.out
(pprof) web ## 需要下载 Graphviz
```

# 3. 生成文档

查看某个 package 的文档：

```sh
$ go doc PackageName
```

在 Web 中浏览所有的 doc：

```sh
godoc -http :6060
```

![image.png](https://i.loli.net/2019/09/17/RhNVYitc4JLEHkS.png)