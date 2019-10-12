# 1. defer

## 1.1 defer 调用

> defer：延缓

defer 调用有以下特性：

- 确保调用在结束发生生
- 参数在defer语句时计算
- defer列表为后进先出

创建一个简单的defer函数，让打印语句在函数执行完时再执行：

```go
func tryDefer() {
	defer fmt.Println(3)
	defer fmt.Println(2)
	fmt.Println(1)
}

func main() {
	tryDefer()
	fmt.Println(4)
}
// 1 2 3 4
```

在这里要注意，defer 调用的顺序是按照栈的顺序来调用语句的（先进后出）。

同时，`defer` 的好处是不受 `painc（报错）` 与 `return` 的影响，也就是说如果一个函数被错误或中途返回强制终止执行，延缓的 `defer` 语句照样可以在函数运行结尾执行：

```go
func tryDefer() {
	defer fmt.Println(3)
	defer fmt.Println(2)
	fmt.Println(1)
	panic("error test")
    fmt.Println("after error")
}

func main() {
	tryDefer()
	fmt.Println(4)
}
```

输出：

```sh
1 
2 
3 
panic: error test 程序终止
```

## 1.2 使用defer进行资源管理

使用 buffer io 操作写入文件的时候，通常要在最后进行 `file.Close()` 与 `defer writer.Flush()` 操作，使用defer 可以将这些操作写在开头，但是在具体操作执行结束后在执行相关的 close 与 flush 操作：

```go
func writeFile(filename string) { // 传入文件路径
	file, err := os.Create(filename) // 创建一个文件
	if err != nil {
		panic(err)
	}
	writer := bufio.NewWriter(file)
	defer file.Close()
	defer writer.Flush()
	for i := 0; i < 20; i++ {
		_, _ = fmt.Fprintln(writer, i) // 想文件中写入 0~10 
	}
}
```

## 1.3 参数在defer语句时计算

当使用 `defer` 时，defer 语句调用的参数是代码定义时就运算了，如下，当代码执行到 defer 语句时，会保留当前 i 的状态，将 defer 语句对入栈中，之后再按照栈的顺序执行：

```go
func tryDefer2() {
	for i := 0; i < 10; i++ {
		defer fmt.Println(i)
	}
}
```

```go
9
8
7
6
5
4
3
2
1
0
```

# 2. 错误处理

## 2.1 分类处理错误

错误处理可以对错误进行分类，以应对不同情况

```go
file, err := os.Open("abc.txt")
if err != nil {
    if pathError, ok := err.(*os.PathError); !ok {
        panic("unknow error:", err)
    } else {
        fmt.Println(pathError.Op, pathError.Path, pathError.Err)
    }
}
```

## 2.2 统一的错误逻辑处理

应用场景：开启一个服务器去访问文件，访问结果可能是无法找到、权限不足等问题，我们需要对这些错误进行集中处理

处理方案：使用一个 errWrapper 函数，将程序报的错误引入到 errorWapper 中，对错误进行集中处理

首先创建一个方法来开启服务：

```go
func main() {
	// url可匹配根目录
	http.HandleFunc("/", errWrapper(handleFileList))
	err := http.ListenAndServe(":8888", nil)
	if err != nil {
		panic(err)
	}
}
```

我们把重点集中到这一行代码：

```go
http.HandleFunc("/", errWrapper(handleFileList))
```

`http.HandleFunc()` 的第一个参数为匹配的url路径，第二个参数为访问到地址后执行的回调函数。其中这个回调函数有两个参数分别是 ResponseWriter 对象实体，以及 Request 对象实体，其标准的调用方法为：

```go
http.HandleFunc("/", func(writer http.ResponseWriter, request *http.Request) {
    // do something here
})
```

然而在这里我们使用了 `errWrapper()` 代理了这个函数，由此我们可以得出了两个必要条件：

1. **`errWapper()` 的返回值必须也是一个函数**
2. **`errWrapper()` 返回的函数中携带了两个参数，分别为 `writer http.ResponseWriter` 以及 `request *http.Request`。**

同时 `errWrapper` 也必须传入一个参数，这个参数就是我们对用户访问的主要处理函数，这是 `errorWrapper` 的第三个必要条件：

3. **`errorWrapper()` 的参数为一个函数，执行这个函数时向其传递 ResponseWriter 对象以及 Request 对象**

我们先来定义这个函数：

```go
func handleFileList(writer http.ResponseWriter, request *http.Request) error {
	path := request.URL.Path[len("/"):] // 去掉匹配的 "/"
	fmt.Println("open file path:", path)
	file, err := os.Open(path) // 打开文件路径
	if err != nil {
		return err // 返回错误
	}
	defer file.Close()
	all, err := ioutil.ReadAll(file)
	if err != nil {
		return err // 返回错误
	}
	_, _ = writer.Write(all) // 返回响应
	return nil
}
```

如上，主要的处理函数接收了两个参数，分别为一个 ResponseWriter  以及 Request 对象，我们可以看出其类似于 HandleFunc 标准写法中的回调函数写法，但是不同的是这个函数返回了一个 error 对象，这个 error 对象将被 `errWrapper()` 接收，然后进行处理。

至此，我们已经获得了两个重要结构：

- `http.HandleFunc("/", errWrapper(handleFileList))` 调用入口

- `handleFileList` 具体的处理函数

所以 `errWrapper` 的主要职责就是返回一个函数，这个函数主要负责执行 `handleFileList` ，将 ResponseWriter 对象、Request 对象传入其中，同时接收其返回的错误结果，之后在针对错误结果的不同情况对错误结果进行处理：

```go
func errWrapper(handler func(writer http.ResponseWriter, request *http.Request) error) func(http.ResponseWriter, *http.Request) {
	return func(writer http.ResponseWriter, request *http.Request) {
		err := handler(writer, request) // 执行传入的函数，并接受返回的err对象
		if err != nil {
			log.Warn("warning: %s", err)
			code := http.StatusOK
			switch {
			case os.IsNotExist(err):
				code = http.StatusNotFound
			case os.IsPermission(err):
				code = http.StatusForbidden
			default:
				code = http.StatusInternalServerError
			}
			http.Error(writer, http.StatusText(code), code)
		}
	}
}
```

![image.png](https://i.loli.net/2019/09/16/kxBCvRf84I2GDV7.png)

至此函数就可以正常工作了，我们可以看出 `errWrapper()` 是一个标准的函数式编程，其接收一个函数，对其进行包装，再返回一个函数，我么可以得出总体的流程图：

![image.png](https://i.loli.net/2019/09/16/GSMZQkDlYjXoxAu.png)

同时，传入的函数我们可以将其设置为一个 `type` ，这个 `type` 是一个函数，接收参数为 ResponseWrite 对象与 Request 对象，返回参数为一个 error 对象，从而简化代码：

```diff
+   type appHandler func(writer http.ResponseWriter, request *http.Request) error

+   func errWrapper(handler appHandler) func(http.ResponseWriter, *http.Request) {
-	func errWrapper(handler func(writer http.ResponseWriter, request *http.Request) error) func(http.ResponseWriter, *http.Request) {
        return func(writer http.ResponseWriter, request *http.Request) {
            // ... ...
        }
    }
```

# 3. panic recover

> panic: 恐慌、惊恐、慌张

- panic 会停止当前函数执行
- 一直向上返回，执行每一层的 defer
- 如果没有遇见 revcover，程序退出

> recover：恢复

- 仅在 defer 函数中调用
- 获取 panic 的值
- 如果无法处理，可以重新 panic

示例：

```go
func tryRecover() {
	defer func() {
		r := recover() // recover()返回任何类型的值
		// 使用Type Assertion（断言）判断 r 的类型
		if err, ok := r.(error); ok {
			// 返回值 r 的类型如果是 error
			fmt.Println("Error occured", err)
		} else {
			// 返回值 r 的类型如果不是 error
			fmt.Println(r)
		}
	}()
	//panic(errors.New("this is an error"))
	a := 0
	b := 5 / a
	fmt.Println(b)
}

func main() {
	tryRecover()
}
```

结果：

```shell
发生了一个错误： runtime error: integer divide by zero
```

# 4. error vs panic

- 意料之中的用 error，如文件打不开
- 意料之外的，如数组越界

