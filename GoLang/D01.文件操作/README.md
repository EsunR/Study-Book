# 1. 文件目录

## 1.1 获取目录中所有文件

> ioutil.ReadDir(dirname)

```go
// 设置文件的打开目录并打开
folder := `c:\` 
files, _ := ioutil.ReadDir(folder)

// 遍历文件并输出
for _, file := range files {
    if file.IsDir() {
        continue
    } else {
        fmt.Println(file.Name())
    }
}
```

## 1.2 获取相对路径

> filepath.Abs(path)

`filepath.Abs(path)`  是用来将相对路径转换为绝对路径的，如：

```go
dir, _ := filepath.Abs("./")
fmt.Println(dir) // D:\Study\Study-Book\GoLang
```

这里要注意 go 对与跟相对路径的理解，`./` 这个相对路径是我们运行 go 文件的路径。比如，在 Goland 中即为我们当前项目的根目录。又比如，我们在 `D:/Go_WorkSpace` 目录下运行 `go ./test/main.go`，那么在 `main.go` 中去读取的相对路径 `./` 所代表的目录就是 `D:/Go_WorkSpace`。

## 1.3 获取某一文件所在的目录

> filepath.Dir()

```go
exeFilePath := os.Args[0] // 获取的是当前编译后的执行文件所在的目录，这个目录是由编译器生成的
fmt.Println(filepath.Dir(exeFilePath))
```

实际上 `filePath.Dir()`  只是将传入的路径按照路径分隔符，将末尾的文件名去掉而已，如果遇到一个错误格式的文件路径，它会返回 `.`，示例如下：

```
"C:/dir/file.txt" =>  "C:/dir"
"abcd"            =>  "."
```

## 1.4 执行目录与工作目录

**执行目录：**

Go 语言属于编译型语言，在每次编译完成后会生成一个 `.exe` 的可执行文件（Windows）提供给系统执行，我们可以用两种方式去获取这个执行文件的目录：

```go
// 方式1
path := filepath.Dir(os.Args[0])
// 方式2
path, err := filepath.Dir(os.Executable())
```

在 GoLand 中，执行目录为 `C:\Users\username\AppData\Local\Temp` 

使用 fresh 启动 go 文件时，执行目录会生成在运行 fresh 指令的位置

**工作目录：**

工作目录即为当前执行 go 指令的目录，等同于 `filePath.Abs("./")`

```go
path, err := os.Getwd()
```

## 1.5 显示所有文件夹、子文件夹、文件、子文件

```go
func walkPath() {
	root := "D:/Study/Study-Book"
	err := filepath.Walk(root, func(path string, info os.FileInfo, err error) error {
		fmt.Printf("Visited: %s\n", path)
		return nil
	})
	fmt.Printf("filepath.Walk() returned %v\n", err)
}
```

[更多操作](https://blog.csdn.net/wangshubo1989/article/details/77933654)

对于 go 的路径解析问题，可以 [参考这篇文章](https://studygolang.com/articles/12563)

